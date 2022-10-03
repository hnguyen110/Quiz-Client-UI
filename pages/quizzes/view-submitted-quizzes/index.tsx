import SubmittedQuizzList from "../../../components/quizzes/submitted-quizz-list/submitted-quizz-list";
import AuthenticationGuard from "../../../components/utilities/authentication-guard/authentication-guard";

export default function Index() {
    return (
        <AuthenticationGuard>
            <SubmittedQuizzList/>
        </AuthenticationGuard>
    );
}
