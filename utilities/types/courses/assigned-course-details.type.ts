import AssignedCourseSection from "./assigned-course-section.type";

export default interface AssignedCourseDetails {
  id: string | number;
  title: string;
  description: string;
  sections: AssignedCourseSection[];
}
