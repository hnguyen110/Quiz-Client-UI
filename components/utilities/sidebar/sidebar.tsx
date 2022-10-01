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
              Manage Profile Information
            </Link>
          ),
        },
      ],
    },
    {
      key: 3,
      icon: <FileProtectOutlined />,
      label: "Survey",
      children: [
        {
          key: 4,
          label: <Link href="/survey/manage-survey">Manage Surveys</Link>,
        },
        {
          key: 5,
          label: (
            <Link href="/survey/view-assigned-surveys">
              View Assigned Surveys
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
      defaultOpenKeys={["1", "3"]}
      defaultSelectedKeys={["2"]}
      items={items}
    />
  );
}
