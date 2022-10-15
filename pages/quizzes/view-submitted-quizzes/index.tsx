import SubmittedQuizList from "../../../components/quizzes/submitted-quiz-list/submitted-quiz-list";
import AuthenticationGuard from "../../../components/utilities/authentication-guard/authentication-guard";

export default function Index() {
  return (
    <AuthenticationGuard>
      <SubmittedQuizList />
    </AuthenticationGuard>
  );
}
