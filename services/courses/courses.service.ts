import Session from "../../utilities/types/utilities/session.type";
import Course from "../../utilities/types/courses/course.type";
import axios from "axios";
import Quiz from "../../utilities/types/quizzes/quiz.type";

export async function getAdministratorManagedCourses(
  session: Session
): Promise<Course[]> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}

export async function createCourse(
  session: Session,
  course: Course
): Promise<Course> {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/`,
    course,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}
