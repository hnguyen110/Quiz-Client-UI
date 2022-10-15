import axios from "axios";
import SignInParameters from "../../utilities/types/authentication/sign-in.type";
import SignUpParameters from "../../utilities/types/authentication/sign-up.type";

export async function signUp(data: SignUpParameters) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/users/`,
    data
  );
}

export async function signIn(data: SignInParameters) {
  return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`);
}
