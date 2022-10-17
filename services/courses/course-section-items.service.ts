import Session from "../../utilities/types/utilities/session.type";
import axios from "axios";
import FormData from "form-data";
import CourseSectionItem from "../../utilities/types/courses/course-section-item.type";
import ModifyCourseSectionItem from "../../utilities/types/courses/modify-course-section-item.type";

export async function getCourseSectionItems(
  session: Session,
  courseId: number | string,
  sectionId: number | string
): Promise<CourseSectionItem[]> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/sections/${sectionId}/items/`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}

export async function createCourseSectionItem(
  session: Session,
  courseId: number | string,
  sectionId: number | string,
  item: ModifyCourseSectionItem
): Promise<CourseSectionItem> {
  const body = new FormData();
  body.append("title", item.title);
  body.append("order", item.order);
  body.append("data", item.data.file.originFileObj);
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/sections/${sectionId}/items/`,
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}

export async function deleteCourseSectionItem(
  session: Session,
  courseId: string | number,
  sectionId: string | number,
  itemId: string | number
): Promise<CourseSectionItem> {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/sections/${sectionId}/items/${itemId}/`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}
