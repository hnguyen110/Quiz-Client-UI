import AssignedQuizzList from "../../../components/quizzes/assigned-quizz-list/assigned-quizz-list";
import AuthenticationGuard from "../../../components/utilities/authentication-guard/authentication-guard";

export default function Index() {
    return (
        <AuthenticationGuard>
            <AssignedQuizzList/>
        </AuthenticationGuard>
    );
}
