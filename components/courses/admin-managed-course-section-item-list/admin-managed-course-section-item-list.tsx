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
  const [items, setItems] = useState([] as CourseSectionItem[]);
  const [loading, setLoading] = useState(false);
  const [createItemFormOpen, setCreateItemFormOpen] = useState(false);
  const [createSectionItemForm] = Form.useForm();
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
      <AdminGenericList
        dataSource={items}
        onItemSelectedHandler={null}
        onItemSelectedForUpdatingHandler={null}
        onItemSelectedForDeletingHandler={
          onSectionItemSelectedForDeletingHandler
        }
      />
    </GenericDrawer>
  );
}
