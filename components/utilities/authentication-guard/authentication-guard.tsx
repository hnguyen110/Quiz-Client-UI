import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import GenericSpin from "../generic-spin/generic-spin";

interface Props {
  children: any;
}

export default function AuthenticationGuard({ children }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession()
      .then((session: any) => {
        if (session) {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        } else {
          setTimeout(() => {
            router.replace("/auth/sign-in");
          }, 500);
        }
      })
      .catch((e) => {
        setTimeout(() => {
          router.replace("/auth/sign-in");
        }, 500);
      });
  }, [router]);

  return loading ? <GenericSpin /> : children;
}
