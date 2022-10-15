import { getSession } from "next-auth/react";

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/account/profile-information",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    };
  }
}

export default function Index() {
  return <></>;
}
