import {
  FileProtectOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Sidebar() {
  const session = useSession();

  const items: ItemType[] = [
    {
      key: 1,
      icon: <UserOutlined />,
      label: "Account",
      children: [
        {
          key: 2,
          label: (
            <Link href="/account/profile-information">
              View Profile Information
            </Link>
          ),
        },
        {
          key: 3,
          label: <Link href="/account/change-password">Change Password</Link>,
        },
      ],
    },
    {
      key: 4,
      icon: <FileProtectOutlined />,
      label: "Quizzes",
      children: [
        {
          key: 5,
          label: (
            <Link href="/quizzes/view-assigned-quizzes">
              View Assigned Quizzes
            </Link>
          ),
        },
        {
          key: 6,
          label: (
            <Link href="/quizzes/view-submitted-quizzes">
              View Submitted Quizzes
            </Link>
          ),
        },
        {
          key: 7,
          label: <Link href="/quizzes/manage-quizzes">Manage Quizzes</Link>,
        },
      ],
    },
    {
      key: 8,
      icon: <ReadOutlined />,
      label: "Courses",
      children: [
        {
          key: 9,
          label: (
            <Link href="/courses/view-assigned-courses">
              View Assigned Courses
            </Link>
          ),
        },
        {
          key: 10,
          label: <Link href="/courses/manage-courses">Manage Courses</Link>,
        },
      ],
    },
  ];

  return (
    <Menu
      className="w-full h-screen"
      mode="inline"
      theme="light"
      defaultOpenKeys={["1", "4", "8"]}
      defaultSelectedKeys={["2"]}
      items={items}
    />
  );
}
