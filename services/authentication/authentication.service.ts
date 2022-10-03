import axios from "axios";
import SignInParameters from "../../utilities/parameters/authentication/sign-in.parameters";
import SignUpParameters from "../../utilities/parameters/authentication/sign-up.parameters";

export async function signUp(data: SignUpParameters) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/users/`,
    data
  );
}

export async function signIn(data: SignInParameters) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}`
  )
}