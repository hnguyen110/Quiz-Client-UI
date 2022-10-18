import AuthenticationGuard from "../../../components/utilities/authentication-guard/authentication-guard";
import AssignedCourseList from "../../../components/courses/assigned-course-list/assigned-course-list";

export default function Index() {
  return (
    <AuthenticationGuard>
      <AssignedCourseList />
    </AuthenticationGuard>
  );
}
