import GenericList from "../../utilities/generic-list/generic-list";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Course from "../../../utilities/types/courses/course.type";
import { getNewCourses } from "../../../services/courses/new-courses.service";
import { message } from "antd";

export default function NewCourseList() {
  const [courses, setCourses] = useState([] as Course[]);
  const session = useSession();

  useEffect(() => {
    getNewCourses(session.data as any)
      .then((data) => {
        setCourses(data);
      })
      .catch((e) => {
        message.error(
          "There was an issue while trying to receive new courses, please try again"
        );
      });
  }, [session.data]);

  return (
    <GenericList
      title="New Courses"
      dataSource={courses}
      onItemSelectedHandler={null}
    />
  );
}
