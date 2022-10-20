import axios from "axios";
import Profile from "../../utilities/types/profile-information/profile-information";
import Session from "../../utilities/types/utilities/session.type";
import User from "../../utilities/types/account/user.type";

export async function getProfileInformation(
  session: Session
): Promise<Profile | null> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}

export async function changePassword(session: Session, email: string) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/password_reset/`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
}

export async function confirmPasswordChange(
  session: Session,
  token: string,
  password: string
) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/password_reset/confirm/`,
    {
      token,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
}

export async function getUsers(session: Session): Promise<User[]> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/users/`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}
