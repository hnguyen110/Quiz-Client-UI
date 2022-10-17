import { Button, Form, message } from "antd";
import AdminManagedCourseSectionForm from "../admin-managed-course-section-form/admin-managed-course-section-form";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import Course from "../../../utilities/types/courses/course.type";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CourseSection from "../../../utilities/types/courses/course-section.type";
import { getCourseSections } from "../../../services/courses/course-sections.service";
import AdminGenericList from "../../utilities/admin-generic-list/admin-generic-list";

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
  const [sections, setSections] = useState([] as CourseSection[]);
  const [createCourseSectionFormOpen, setCreateCourseSectionFormOpen] =
    useState(false);
  const [createCourseSectionForm] = Form.useForm();
  const session = useSession();

  useEffect(() => {
    if (course?.id) {
      getCourseSections(session.data as any, course?.id)
        .then((data) => {
          console.log(data);
          setSections(data);
        })
        .catch((e) => {
          message.error(
            "There was an issue while trying to receive your course sections, please try again"
          );
        });
    }
  }, [course?.id, session.data]);

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
      <AdminGenericList
        dataSource={sections}
        onItemSelectedHandler={undefined}
        onItemSelectedForUpdatingHandler={undefined}
        onItemSelectedForDeletingHandler={undefined}
      />
    </GenericDrawer>
  );
}
