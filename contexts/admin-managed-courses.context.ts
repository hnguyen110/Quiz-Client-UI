import { createContext, Dispatch, SetStateAction } from "react";
import Course from "../utilities/types/courses/course.type";

export const AdminManagedCoursesContext = createContext({
  courses: [],
  setCourses: () => {},
} as {
  courses: Course[];
  setCourses: Dispatch<SetStateAction<Course[]>>;
});
