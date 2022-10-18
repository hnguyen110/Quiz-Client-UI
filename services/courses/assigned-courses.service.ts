import Session from "../../utilities/types/utilities/session.type";
import axios from "axios";
import AssignedCourse from "../../utilities/types/courses/assigned-course.type";
import AssignedCourseDetails from "../../utilities/types/courses/assigned-course-details.type";

export async function getAssignedCourses(
  session: Session
): Promise<AssignedCourse[]> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/assigned-courses/`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}

export async function getAssignedCourseDetails(
  session: Session,
  courseId: string | number
): Promise<AssignedCourseDetails> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/assigned-course-details/`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}
