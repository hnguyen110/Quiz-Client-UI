import { useEffect, useState } from "react";
import {
  assignCourseParticipants,
  createCourse,
  deleteCourse,
  getAdministratorManagedCourses,
  getCourseParticipants,
  updateCourse,
} from "../../../services/courses/courses.service";
import { useSession } from "next-auth/react";
import { Button, Form, message } from "antd";
import Course from "../../../utilities/types/courses/course.type";
import AdminGenericList from "../../utilities/admin-generic-list/admin-generic-list";
import { AdminManagedCoursesContext } from "../../../contexts/admin-managed-courses.context";
import AdminManagedCourseForm from "../admin-managed-course-form/admin-managed-course-form";
import AdminManagedCourseSectionList from "../admin-managed-course-section-list/admin-managed-course-section-list";
import AdminManagedCourseParticipantForm from "../admin-managed-course-participant-form/admin-managed-course-participant-form";

export default function AdminManagedCourseList() {
  const [course, setCourse] = useState(null as null | Course);
  const [courses, setCourses] = useState([] as Course[]);
  const [createCourseFormOpen, setCreateCourseFormOpen] = useState(false);
  const [updateCourseFormOpen, setUpdateCourseFormOpen] = useState(false);
  const [courseSectionListDrawerOpen, setCourseSectionListDrawerOpen] =
    useState(false);
  const [participantsFormOpen, setParticipantsFormOpen] = useState(false);
  const [createCourseForm] = Form.useForm();
  const [updateCourseForm] = Form.useForm();
  const [participantsForm] = Form.useForm();
  const session = useSession();

  useEffect(() => {
    getAdministratorManagedCourses(session.data as any)
      .then((data) => {
        setCourses(data);
      })
      .catch((e) => {
        message.error(
          "There was an issue while trying to receive your courses, please try again"
        );
      });
  }, [session.data]);

  async function onItemSelectedHandler(data: Course) {
    setCourse(data);
    setCourseSectionListDrawerOpen(true);
  }

  async function onCreateCourseHandler() {
    const data = await createCourseForm.validateFields();
    try {
      const course = await createCourse(session.data as any, data);
      setCourses([course, ...courses]);
      createCourseForm.resetFields();
      setCreateCourseFormOpen(false);
      message.success("The course is created successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to create the course, please try again"
      );
    }
  }

  async function onCancelCreateCourseHandler() {
    createCourseForm.resetFields();
    setCreateCourseFormOpen(false);
  }

  async function onCourseSelectedForUpdatingHandler(course: Course) {
    updateCourseForm.setFieldsValue({
      ...course,
    });
    setUpdateCourseFormOpen(true);
  }

  async function onUpdateCourseHandler() {
    const data = await updateCourseForm.validateFields();
    try {
      const course = await updateCourse(session.data as any, data);
      setCourses(
        courses.map((item) => {
          if (item.id === course.id) {
            return {
              ...course,
            };
          }
          return item;
        })
      );
      updateCourseForm.resetFields();
      setUpdateCourseFormOpen(false);
      message.success("The course is updated successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to update the course, please try again"
      );
    }
  }

  async function onCancelUpdateCourseHandler() {
    updateCourseForm.resetFields();
    setUpdateCourseFormOpen(false);
  }

  async function onCourseSelectedForDeletingHandler(course: Course) {
    try {
      await deleteCourse(session.data as any, course.id);
      setCourses(courses.filter((item) => item.id !== course.id));
      message.success("The course is deleted successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to delete the course, please try again"
      );
    }
  }

  async function onCourseSelectedForAssigningParticipants(course: Course) {
    try {
      const participants = await getCourseParticipants(
        session.data as any,
        course.id
      );
      participantsForm.setFieldsValue({
        ...course,
        participants: participants.map((item) => item.user),
      });
      setParticipantsFormOpen(true);
    } catch (e) {
      message.error(
        "There was an issue while trying to retrieve the list of course participants, please try again"
      );
    }
  }

  async function onAssignCourseParticipants() {
    const data = await participantsForm.validateFields();
    try {
      await assignCourseParticipants(
        session.data as any,
        data.id,
        data.participants
      );
      participantsForm.resetFields();
      setParticipantsFormOpen(false);
      message.success("The course participants is updated successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to update the course participants, please try again"
      );
    }
  }

  async function onCancelAssignParticipantsToCourseHandler() {
    participantsForm.resetFields();
    setParticipantsFormOpen(false);
  }

  return (
    <AdminManagedCoursesContext.Provider value={{ courses, setCourses }}>
      <AdminManagedCourseForm
        form={createCourseForm}
        title="Create Course"
        open={createCourseFormOpen}
        onOkHandler={onCreateCourseHandler}
        onCancelHandler={onCancelCreateCourseHandler}
      />
      <AdminManagedCourseForm
        form={updateCourseForm}
        title="Update Course"
        open={updateCourseFormOpen}
        onOkHandler={onUpdateCourseHandler}
        onCancelHandler={onCancelUpdateCourseHandler}
      />
      <AdminManagedCourseParticipantForm
        form={participantsForm}
        title="Assign Participants"
        open={participantsFormOpen}
        onOkHandler={onAssignCourseParticipants}
        onCancelHandler={onCancelAssignParticipantsToCourseHandler}
      />
      <AdminGenericList
        title={"Manage Courses"}
        extra={
          <Button onClick={() => setCreateCourseFormOpen(true)}>
            Create Course
          </Button>
        }
        dataSource={courses}
        onItemSelectedHandler={onItemSelectedHandler}
        onItemSelectedForUpdatingHandler={onCourseSelectedForUpdatingHandler}
        onItemSelectedForDeletingHandler={onCourseSelectedForDeletingHandler}
        onItemSelectedForAssigningHandler={
          onCourseSelectedForAssigningParticipants
        }
      />
      <AdminManagedCourseSectionList
        course={course as any}
        open={courseSectionListDrawerOpen}
        setOpen={setCourseSectionListDrawerOpen}
      />
    </AdminManagedCoursesContext.Provider>
  );
}
