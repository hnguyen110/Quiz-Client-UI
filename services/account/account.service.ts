import axios from "axios";
import Profile from "../../utilities/types/profile-information/profile-information";
import Session from "../../utilities/types/utilities/session.type";

export async function getProfileInformation(
    session: Session
): Promise<Profile> {
    const {data} = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`,
        {
            headers: {
                Authorization: `Bearer ${session.access}`,
            },
        }
    );
    return data;
}
