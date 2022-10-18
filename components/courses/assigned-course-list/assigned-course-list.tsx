import GenericList from "../../utilities/generic-list/generic-list";
import { useEffect, useState } from "react";
import { getAssignedCourses } from "../../../services/courses/assigned-courses.service";
import { useSession } from "next-auth/react";
import AssignedCourse from "../../../utilities/types/courses/assigned-course.type";
import { message } from "antd";

export default function AssignedCourseList() {
  const [courses, setCourses] = useState([] as AssignedCourse[]);
  const session = useSession();

  useEffect(() => {
    getAssignedCourses(session.data as any)
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
    <GenericList
      title="Assigned Courses"
      dataSource={courses.map((item) => item.course)}
      onItemSelectedHandler={null}
    />
  );
}
