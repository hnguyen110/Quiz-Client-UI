import AssignedQuizList from "../../../components/quizzes/assigned-quiz-list/assigned-quiz-list";
import AuthenticationGuard from "../../../components/utilities/authentication-guard/authentication-guard";

export default function Index() {
  return (
    <AuthenticationGuard>
      <AssignedQuizList />
    </AuthenticationGuard>
  );
}
