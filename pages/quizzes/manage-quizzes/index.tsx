import AdministratorManagedQuizList from "../../../components/quizzes/administrator-managed-quiz-list/administrator-managed-quiz-list";
import AuthenticationGuard from "../../../components/utilities/authentication-guard/authentication-guard";

export default function Index() {
  return (
    <AuthenticationGuard>
      <AdministratorManagedQuizList />
    </AuthenticationGuard>
  );
}
