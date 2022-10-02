import { FileProtectOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import Link from "next/link";

export default function Sidebar() {
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
      icon: <UserOutlined />,
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
      ],
    },
  ];

  return (
    <Menu
      className="w-full h-screen"
      mode="inline"
      theme="light"
      defaultOpenKeys={["1", "4"]}
      defaultSelectedKeys={["2"]}
      items={items}
    />
  );
}
