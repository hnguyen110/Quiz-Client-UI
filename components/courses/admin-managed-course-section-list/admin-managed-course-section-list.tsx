import { Button, Form } from "antd";
import AdminManagedCourseSectionForm from "../admin-managed-course-section-form/admin-managed-course-section-form";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import Course from "../../../utilities/types/courses/course.type";
import { useState } from "react";

interface Props {
  course: Course;
  open: boolean;
  setOpen: any;
}

export default function AdminManagedCourseSectionList({
  course,
  open,
  setOpen,
}: Props) {
  const [createCourseSectionFormOpen, setCreateCourseSectionFormOpen] =
    useState(false);
  const [createCourseSectionForm] = Form.useForm();

  return (
    <GenericDrawer
      title={course?.title || ""}
      placement="right"
      width="100%"
      open={open}
      onCloseHandler={() => setOpen(false)}
      extra={
        <Button onClick={() => setCreateCourseSectionFormOpen(true)}>
          Create Course Section
        </Button>
      }
    >
      <AdminManagedCourseSectionForm
        form={createCourseSectionForm}
        title="Create Course Section"
        open={createCourseSectionFormOpen}
        onOkHandler={undefined}
        onCancelHandler={undefined}
      />
    </GenericDrawer>
  );
}
