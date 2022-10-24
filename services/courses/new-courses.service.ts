import Session from "../../utilities/types/utilities/session.type";
import axios from "axios";
import Course from "../../utilities/types/courses/course.type";

export async function getNewCourses(session: Session): Promise<Course[]> {
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
