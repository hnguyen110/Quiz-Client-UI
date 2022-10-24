import AuthenticationGuard from "../../../components/utilities/authentication-guard/authentication-guard";
import NewCourseList from "../../../components/courses/new-course-list/new-course-list";

export default function Index() {
  return (
    <AuthenticationGuard>
      <NewCourseList />
    </AuthenticationGuard>
  );
}
