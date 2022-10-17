import Session from "../../utilities/types/utilities/session.type";
import axios from "axios";
import CourseSection from "../../utilities/types/courses/course-section.type";

export async function getCourseSections(
  session: Session,
  id: number | string
): Promise<CourseSection[]> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}/sections/`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}
