import { Button, Form } from "antd";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import CourseSection from "../../../utilities/types/courses/course-section.type";
import AdminManagedCourseSectionItemForm from "../admin-managed-course-section-item-form/admin-managed-course-section-item-form";
import { useState } from "react";

interface Props {
  section: CourseSection;
  open: boolean;
  setOpen: any;
}

export default function AdminManagedCourseSectionItemList({
  section,
  open,
  setOpen,
}: Props) {
  const [createItemFormOpen, setCreateItemFormOpen] = useState(false);
  const [createSectionItemForm] = Form.useForm();

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
        form={createSectionItemForm}
        title="Create Section Item"
        open={createItemFormOpen}
        onOkHandler={undefined}
        onCancelHandler={undefined}
      />
    </GenericDrawer>
  );
}
