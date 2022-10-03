import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import GenericSkeleton from "../generic-skeleton/generic-skeleton";
import { Space, Spin } from "antd";

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

  return loading ? (
    <Space className="flex justify-center pt-16" size="middle">
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>
  ) : (
    children
  );
}
