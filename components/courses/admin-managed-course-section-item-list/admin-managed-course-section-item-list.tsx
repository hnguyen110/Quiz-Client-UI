import { Button, Form, message } from "antd";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import CourseSection from "../../../utilities/types/courses/course-section.type";
import AdminManagedCourseSectionItemForm from "../admin-managed-course-section-item-form/admin-managed-course-section-item-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Course from "../../../utilities/types/courses/course.type";
import {
  createCourseSectionItem,
  deleteCourseSectionItem,
  getCourseSectionItems,
  updateCourseSectionItem,
} from "../../../services/courses/course-section-items.service";
import CourseSectionItem from "../../../utilities/types/courses/course-section-item.type";
import AdminGenericList from "../../utilities/admin-generic-list/admin-generic-list";

interface Props {
  course: Course;
  section: CourseSection;
  open: boolean;
  setOpen: any;
}

export default function AdminManagedCourseSectionItemList({
  course,
  section,
  open,
  setOpen,
}: Props) {
  const [item, setItem] = useState(null as null | CourseSectionItem);
  const [items, setItems] = useState([] as CourseSectionItem[]);
  const [loading, setLoading] = useState(false);
  const [createItemFormOpen, setCreateItemFormOpen] = useState(false);
  const [updateItemFormOpen, setUpdateItemFormOpen] = useState(false);
  const [readonlyItemFormOpen, setReadonlyItemFormOpen] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [createSectionItemForm] = Form.useForm();
  const [updateSectionItemForm] = Form.useForm();
  const [readonlyItemForm] = Form.useForm();
  const session = useSession();

  useEffect(() => {
    if (course?.id && section?.id) {
      getCourseSectionItems(session.data as any, course?.id, section?.id)
        .then((data) => {
          setItems(data);
        })
        .catch((e) => {
          message.error(
            "There was an issue while trying to receive your course section items, please try again"
          );
        });
    }
  }, [course?.id, section?.id, session.data]);

  async function onItemSelectedHandler(data: CourseSectionItem) {
    setItem(data);
    readonlyItemForm.setFieldsValue({
      ...data,
    });
    setReadonly(true);
    setReadonlyItemFormOpen(true);
  }

  async function onCreateSectionItemHandler() {
    setLoading(true);
    const data = await createSectionItemForm.validateFields();
    try {
      const item = await createCourseSectionItem(
        session.data as any,
        course.id,
        section.id,
        data
      );
      setItems([...items, item]);
      createSectionItemForm.resetFields();
      setCreateItemFormOpen(false);
      message.success("The item is created successfully");
    } catch (e) {
      console.log(e);
      message.error(
        "There was an issue while trying to create the item, please try again"
      );
    } finally {
      setLoading(false);
    }
  }

  async function onCancelCreateSectionItemHandler() {
    createSectionItemForm.resetFields();
    setCreateItemFormOpen(false);
  }

  async function onItemSelectedForUpdatingHandler(item: CourseSectionItem) {
    updateSectionItemForm.setFieldsValue({
      ...item,
    });
    setUpdateItemFormOpen(true);
  }

  async function onUpdateSectionItemHandler() {
    const data = await updateSectionItemForm.validateFields();
    try {
      const sectionItem = await updateCourseSectionItem(
        session.data as any,
        course.id,
        section.id,
        data
      );
      setItems(
        items.map((item) => {
          if (item.id === sectionItem.id) {
            return {
              ...sectionItem,
            };
          }
          return item;
        })
      );
      updateSectionItemForm.resetFields();
      setUpdateItemFormOpen(false);
      message.success("The course section item is updated successfully");
    } catch (e) {
      console.log(e);
      message.error(
        "There was an issue while trying to update the course section item, please try again"
      );
    }
  }

  async function onCancelUpdateSectionItemHandler() {
    updateSectionItemForm.resetFields();
    setUpdateItemFormOpen(false);
  }

  async function onSectionItemSelectedForDeletingHandler(
    sectionItem: CourseSectionItem
  ) {
    try {
      await deleteCourseSectionItem(
        session.data as any,
        course.id,
        section.id,
        sectionItem.id
      );
      setItems(items.filter((item) => item.id !== sectionItem.id));
      message.success("The course section item is deleted successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to delete the course section item, please try again"
      );
    }
  }

  async function onCancelReadonlySectionItemFormHandler() {
    readonlyItemForm.resetFields();
    setReadonly(false);
    setReadonlyItemFormOpen(false);
  }

  return (
    <GenericDrawer
      title={section?.title || ""}
      placement="right"
      width="90%"
      open={open}
      onCloseHandler={() => setOpen(false)}
      extra={
        <Button onClick={() => setCreateItemFormOpen(true)}>
          Create Course Item
        </Button>
      }
    >
      <AdminManagedCourseSectionItemForm
        loading={loading}
        form={createSectionItemForm}
        title="Create Section Item"
        open={createItemFormOpen}
        onOkHandler={onCreateSectionItemHandler}
        onCancelHandler={onCancelCreateSectionItemHandler}
      />
      <AdminManagedCourseSectionItemForm
        loading={loading}
        form={updateSectionItemForm}
        title="Update Section Item"
        open={updateItemFormOpen}
        onOkHandler={onUpdateSectionItemHandler}
        onCancelHandler={onCancelUpdateSectionItemHandler}
      />
      <AdminManagedCourseSectionItemForm
        form={readonlyItemForm}
        title="View Section Item"
        open={readonlyItemFormOpen}
        onCancelHandler={onCancelReadonlySectionItemFormHandler}
        readonly={readonly}
        item={item}
      />
      <AdminGenericList
        dataSource={items}
        onItemSelectedHandler={onItemSelectedHandler}
        onItemSelectedForUpdatingHandler={onItemSelectedForUpdatingHandler}
        onItemSelectedForDeletingHandler={
          onSectionItemSelectedForDeletingHandler
        }
      />
    </GenericDrawer>
  );
}
