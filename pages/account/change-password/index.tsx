import ChangePassword from "../../../components/account/change-password/change-password";
import AuthenticationGuard from "../../../components/utilities/authentication-guard/authentication-guard";

export default function Index() {
    return (
        <AuthenticationGuard>
            <ChangePassword/>
        </AuthenticationGuard>
    );
}
