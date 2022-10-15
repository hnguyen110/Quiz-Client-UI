import AdminManagedQuizList from "../../../components/quizzes/admin-managed-quiz-list/admin-managed-quiz-list";
import AuthenticationGuard from "../../../components/utilities/authentication-guard/authentication-guard";

export default function Index() {
  return (
    <AuthenticationGuard>
      <AdminManagedQuizList />
    </AuthenticationGuard>
  );
}
