import {
  FileProtectOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps, Typography } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const session = useSession();

  const items: MenuProps["items"] = session.data
    ? [
        {
          key: 1,
          // icon: <CodeSandboxCircleFilled />,
          label: (
            <Typography.Text strong>
              <Link href="/">Red Panda</Link>
            </Typography.Text>
          ),
        },
        {
          key: 2,
          icon: <UserOutlined />,
          label: "Account",
          children: [
            {
              key: 3,
              label: (
                <Link href="/account/profile-information">
                  View Profile Information
                </Link>
              ),
            },
            {
              key: 4,
              label: (
                <Link href="/account/change-password">Change Password</Link>
              ),
            },
          ],
          style: { marginLeft: "auto" },
        },
        {
          key: 5,
          icon: <FileProtectOutlined />,
          label: "Quizzes",
          children: [
            {
              key: 6,
              label: (
                <Link href="/quizzes/view-assigned-quizzes">
                  View Assigned Quizzes
                </Link>
              ),
            },
            {
              key: 7,
              label: (
                <Link href="/quizzes/view-submitted-quizzes">
                  View Submitted Quizzes
                </Link>
              ),
            },
          ],
        },
        {
          label: <a onClick={() => signOut()}>Sign Out</a>,
          key: "8",
          icon: <LogoutOutlined />,
        },
      ]
    : [
        {
          key: 1,
          label: (
            <Typography.Text strong>
              <Link href="/">Red Panda</Link>
            </Typography.Text>
          ),
        },
        {
          key: 9,
          label: <Link href="/auth/sign-in">Sign In</Link>,
          icon: <UserOutlined />,
          style: { marginLeft: "auto" },
        },
        {
          key: 10,
          label: <Link href="/auth/sign-up">Sign Up</Link>,
          icon: <UserOutlined />,
        },
      ];

  return <Menu className="h-12" mode="horizontal" items={items} />;
}
