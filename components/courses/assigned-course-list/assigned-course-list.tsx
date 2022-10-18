import GenericList from "../../utilities/generic-list/generic-list";
import { useEffect, useState } from "react";
import { getAssignedCourses } from "../../../services/courses/assigned-courses.service";
import { useSession } from "next-auth/react";
import AssignedCourse from "../../../utilities/types/courses/assigned-course.type";
import { message } from "antd";
import AssignedCourseDetails from "../assigned-course-details/assigned-course-details";
import Course from "../../../utilities/types/courses/course.type";

export default function AssignedCourseList() {
  const [course, setCourse] = useState(null as null | Course);
  const [courses, setCourses] = useState([] as AssignedCourse[]);
  const [courseDrawerOpen, setCourseDrawerOpen] = useState(false);
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

  async function onAssignedCourseSelectedHandler(data: Course) {
    setCourse(data);
    setCourseDrawerOpen(true);
  }

  return (
    <>
      <AssignedCourseDetails
        course={course as any}
        open={courseDrawerOpen}
        setOpen={setCourseDrawerOpen}
      />
      <GenericList
        title="Assigned Courses"
        dataSource={courses.map((item) => item.course)}
        onItemSelectedHandler={onAssignedCourseSelectedHandler}
      />
    </>
  );
}
