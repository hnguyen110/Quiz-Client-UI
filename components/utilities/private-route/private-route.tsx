import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import GenericSkeleton from "../generic-skeleton/generic-skeleton";

interface Props {
  children: any;
}

export default function PrivateRoute({ children }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession()
      .then((session: any) => {
        if (session.token) {
          setLoading(false);
        } else {
          router.replace("/authentication/sign-in");
        }
      })
      .catch((e) => {
        router.replace("/authentication/sign-in");
      });
  }, [router]);

  return loading ? <GenericSkeleton /> : children;
}
