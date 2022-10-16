import { useEffect, useState } from "react";
import { getAdministratorManagedCourses } from "../../../services/courses/courses.service";
import { useSession } from "next-auth/react";
import { Button, message } from "antd";
import Course from "../../../utilities/types/courses/course.type";
import AdminGenericList from "../../utilities/admin-generic-list/admin-generic-list";

export default function AdminManagedCourseList() {
  const [courses, setCourses] = useState([] as Course[]);
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

  return (
    <AdminGenericList
      title={"Manage Courses"}
      extra={<Button onClick={undefined}>Create Course</Button>}
      dataSource={courses}
      onItemSelectedHandler={undefined}
      onItemSelectedForUpdatingHandler={undefined}
      onItemSelectedForDeletingHandler={undefined}
    />
  );
}
