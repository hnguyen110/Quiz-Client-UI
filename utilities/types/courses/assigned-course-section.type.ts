import AssignedCourseSectionItem from "./assigned-course-section-item.type";

export default interface AssignedCourseSection {
  id: string | number;
  title: string;
  items: AssignedCourseSectionItem[];
}
