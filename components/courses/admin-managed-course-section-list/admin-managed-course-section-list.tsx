import { Button, Form, message } from "antd";
import AdminManagedCourseSectionForm from "../admin-managed-course-section-form/admin-managed-course-section-form";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import Course from "../../../utilities/types/courses/course.type";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CourseSection from "../../../utilities/types/courses/course-section.type";
import {
  createCourseSection,
  deleteCourseSection,
  getCourseSections,
  updateCourseSection,
} from "../../../services/courses/course-sections.service";
import AdminGenericList from "../../utilities/admin-generic-list/admin-generic-list";
import { deleteCourse } from "../../../services/courses/courses.service";

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
  const [createSectionFormOpen, setCreateSectionFormOpen] = useState(false);
  const [updateSectionFormOpen, setUpdateSectionFormOpen] = useState(false);
  const [createCourseSectionForm] = Form.useForm();
  const [updateCourseSectionForm] = Form.useForm();
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

  async function onCreateCourseSectionHandler() {
    const data = await createCourseSectionForm.validateFields();
    try {
      const section = await createCourseSection(
        session.data as any,
        course.id,
        data
      );
      setSections([section, ...sections]);
      createCourseSectionForm.resetFields();
      setCreateSectionFormOpen(false);
      message.success("The course section is created successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to create the course section, please try again"
      );
    }
  }

  async function onCancelCreateCourseSectionHandler() {
    createCourseSectionForm.resetFields();
    setCreateSectionFormOpen(false);
  }

  async function onSectionSelectedForUpdatingHandler(section: CourseSection) {
    updateCourseSectionForm.setFieldsValue({
      ...section,
    });
    setUpdateSectionFormOpen(true);
  }

  async function onUpdateCourseSectionHandler() {
    const data = await updateCourseSectionForm.validateFields();
    try {
      const section = await updateCourseSection(
        session.data as any,
        course.id,
        data
      );
      setSections(
        sections.map((item) => {
          if (item.id === section.id) {
            return {
              ...section,
            };
          }
          return item;
        })
      );
      updateCourseSectionForm.resetFields();
      setUpdateSectionFormOpen(false);
      message.success("The course section is updated successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to update the course section, please try again"
      );
    }
  }

  async function onCancelUpdateCourseSectionHandler() {
    updateCourseSectionForm.resetFields();
    setUpdateSectionFormOpen(false);
  }

  async function onCourseSectionSelectedForDeletingHandler(
    section: CourseSection
  ) {
    try {
      await deleteCourseSection(session.data as any, course.id, section.id);
      setSections(sections.filter((item) => item.id !== section.id));
      message.success("The course section is deleted successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to delete the course section, please try again"
      );
    }
  }

  return (
    <GenericDrawer
      title={course?.title || ""}
      placement="right"
      width="90%"
      open={open}
      onCloseHandler={() => setOpen(false)}
      extra={
        <Button onClick={() => setCreateSectionFormOpen(true)}>
          Create Course Section
        </Button>
      }
    >
      <AdminManagedCourseSectionForm
        form={createCourseSectionForm}
        title="Create Course Section"
        open={createSectionFormOpen}
        onOkHandler={onCreateCourseSectionHandler}
        onCancelHandler={onCancelCreateCourseSectionHandler}
      />
      <AdminManagedCourseSectionForm
        form={updateCourseSectionForm}
        title="Update Course Section"
        open={updateSectionFormOpen}
        onOkHandler={onUpdateCourseSectionHandler}
        onCancelHandler={onCancelUpdateCourseSectionHandler}
      />
      <AdminGenericList
        dataSource={sections}
        onItemSelectedHandler={undefined}
        onItemSelectedForUpdatingHandler={onSectionSelectedForUpdatingHandler}
        onItemSelectedForDeletingHandler={
          onCourseSectionSelectedForDeletingHandler
        }
      />
    </GenericDrawer>
  );
}
