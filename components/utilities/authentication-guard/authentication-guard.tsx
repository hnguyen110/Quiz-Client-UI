import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import GenericSkeleton from "../generic-skeleton/generic-skeleton";
import { Spin } from "antd";

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
          setLoading(false);
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

  return loading ? (
    <Spin size="large" className="flex justify-center pt-14" />
  ) : (
    children
  );
}
