import AuthenticationGuard from "../../../components/utilities/authentication-guard/authentication-guard";
import AdminManagedCourseList from "../../../components/courses/admin-managed-course-list/admin-managed-course-list";

export default function Index() {
  return (
    <AuthenticationGuard>
      <AdminManagedCourseList />
    </AuthenticationGuard>
  );
}
