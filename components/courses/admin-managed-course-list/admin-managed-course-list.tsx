import { useEffect, useState } from "react";
import {
  createCourse,
  getAdministratorManagedCourses,
} from "../../../services/courses/courses.service";
import { useSession } from "next-auth/react";
import { Button, Form, message } from "antd";
import Course from "../../../utilities/types/courses/course.type";
import AdminGenericList from "../../utilities/admin-generic-list/admin-generic-list";
import { AdminManagedCoursesContext } from "../../../contexts/admin-managed-courses.context";
import AdminManagedCourseForm from "../admin-managed-course-form/admin-managed-course-form";

export default function AdminManagedCourseList() {
  const [courses, setCourses] = useState([] as Course[]);
  const [createCourseFormOpen, setCreateCourseFormOpen] = useState(false);
  const [createCourseForm] = Form.useForm();
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

  return (
    <AdminManagedCoursesContext.Provider value={{ courses, setCourses }}>
      <AdminManagedCourseForm
        form={createCourseForm}
        title="Create Course"
        open={createCourseFormOpen}
        onOkHandler={onCreateCourseHandler}
        onCancelHandler={onCancelCreateQuizHandler}
      />
      <AdminGenericList
        title={"Manage Courses"}
        extra={
          <Button onClick={() => setCreateCourseFormOpen(true)}>
            Create Course
          </Button>
        }
        dataSource={courses}
        onItemSelectedHandler={undefined}
        onItemSelectedForUpdatingHandler={undefined}
        onItemSelectedForDeletingHandler={undefined}
      />
    </AdminManagedCoursesContext.Provider>
  );
}
