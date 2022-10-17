import { useEffect, useState } from "react";
import {
  createCourse,
  deleteCourse,
  getAdministratorManagedCourses,
  updateCourse,
} from "../../../services/courses/courses.service";
import { useSession } from "next-auth/react";
import { Button, Form, message } from "antd";
import Course from "../../../utilities/types/courses/course.type";
import AdminGenericList from "../../utilities/admin-generic-list/admin-generic-list";
import { AdminManagedCoursesContext } from "../../../contexts/admin-managed-courses.context";
import AdminManagedCourseForm from "../admin-managed-course-form/admin-managed-course-form";
import AdminManagedQuizForm from "../../quizzes/admin-managed-quiz-form/admin-managed-quiz-form";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";

export default function AdminManagedCourseList() {
  const [course, setCourse] = useState(null as null | Course);
  const [courses, setCourses] = useState([] as Course[]);
  const [createCourseFormOpen, setCreateCourseFormOpen] = useState(false);
  const [updateCourseFormOpen, setUpdateCourseFormOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createCourseForm] = Form.useForm();
  const [updateCourseForm] = Form.useForm();
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
    setDrawerOpen(true);
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

  async function onCancelCreateQuizHandler() {
    createCourseForm.resetFields();
    setCreateCourseFormOpen(false);
  }

  async function onCourseSelectedForUpdatingHandler(course: Course) {
    updateCourseForm.setFieldsValue({
      ...course,
    });
    setUpdateCourseFormOpen(true);
  }

  async function onUpdateQuizHandler() {
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

  return (
    <AdminManagedCoursesContext.Provider value={{ courses, setCourses }}>
      <AdminManagedCourseForm
        form={createCourseForm}
        title="Create Course"
        open={createCourseFormOpen}
        onOkHandler={onCreateCourseHandler}
        onCancelHandler={onCancelCreateQuizHandler}
      />
      <AdminManagedQuizForm
        form={updateCourseForm}
        title="Update Course"
        open={updateCourseFormOpen}
        onOkHandler={onUpdateQuizHandler}
        onCancelHandler={onCancelUpdateCourseHandler}
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
      />
      <GenericDrawer
        title={course?.title || ""}
        placement="right"
        width="100%"
        open={drawerOpen}
        onCloseHandler={() => setDrawerOpen(false)}
      >
        <div></div>
      </GenericDrawer>
    </AdminManagedCoursesContext.Provider>
  );
}
