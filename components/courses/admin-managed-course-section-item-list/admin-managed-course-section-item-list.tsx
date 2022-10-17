import { Button, Form, message } from "antd";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import CourseSection from "../../../utilities/types/courses/course-section.type";
import AdminManagedCourseSectionItemForm from "../admin-managed-course-section-item-form/admin-managed-course-section-item-form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Course from "../../../utilities/types/courses/course.type";
import { createCourseSectionItem } from "../../../services/courses/course-section-items.service";
import CourseSectionItem from "../../../utilities/types/courses/course-section-item.type";

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
    </GenericDrawer>
  );
}
