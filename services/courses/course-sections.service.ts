import Session from "../../utilities/types/utilities/session.type";
import axios from "axios";
import CourseSection from "../../utilities/types/courses/course-section.type";

export async function getCourseSections(
  session: Session,
  courseId: number | string
): Promise<CourseSection[]> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/sections/`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}

export async function createCourseSection(
  session: Session,
  courseId: number | string,
  section: CourseSection
): Promise<CourseSection> {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/sections/`,
    section,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}

export async function updateCourseSection(
  session: Session,
  courseId: number | string,
  section: CourseSection
): Promise<CourseSection> {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/sections/${section.id}/`,
    section,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}

export async function deleteCourseSection(
  session: Session,
  courseId: string | number,
  sectionId: string | number
): Promise<CourseSection> {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/sections/${sectionId}/`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}
