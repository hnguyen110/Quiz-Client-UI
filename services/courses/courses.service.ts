import Session from "../../utilities/types/utilities/session.type";
import Course from "../../utilities/types/courses/course.type";
import axios from "axios";
import CourseParticipant from "../../utilities/types/courses/course-participant.type";
import AssignedCourseParticipant from "../../utilities/types/courses/assigned-course-participant.type";

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

export async function updateCourse(
  session: Session,
  course: Course
): Promise<Course> {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${course.id}/`,
    course,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}

export async function deleteCourse(
  session: Session,
  id: string | number
): Promise<Course> {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}

export async function assignCourseParticipants(
  session: Session,
  id: string | number,
  participants: string[] | number[]
): Promise<CourseParticipant> {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}/assign-participants/`,
    {
      participants: participants.map((item) => {
        return { user: item };
      }),
    },
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}

export async function getCourseParticipants(
  session: Session,
  id: string | number
): Promise<AssignedCourseParticipant[]> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}/participants`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}
