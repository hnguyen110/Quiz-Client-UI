import ProfileInformation from "../../../components/account/profile-information/profile-information";
import AuthenticationGuard from "../../../components/utilities/authentication-guard/authentication-guard";

export default function Index() {
    return (
        <AuthenticationGuard>
            <ProfileInformation/>
        </AuthenticationGuard>
    );
}
