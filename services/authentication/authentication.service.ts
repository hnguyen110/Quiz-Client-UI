import axios from "axios";
import SignUpParameters from "../../utilities/parameters/authentication/sign-up.parameters";

export async function signUp(data: SignUpParameters) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/users/`,
    data
  );
}
