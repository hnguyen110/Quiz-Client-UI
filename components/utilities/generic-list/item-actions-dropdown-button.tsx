import { Button, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Props {
  item: any;
  onItemSelectedHandler: any;
}

export default function ItemActionsDropdownButton({
  item,
  onItemSelectedHandler,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      open={open}
      onOpenChange={(value) => setOpen(value)}
      key={"actions"}
      overlay={
        <Menu
          onClick={(item) => {
            if (item.key !== "2") {
              setOpen(false);
            } else {
              setOpen(true);
            }
          }}
          items={[
            {
              label: "View Item Details",
              key: "1",
              onClick: () => onItemSelectedHandler(item),
            },
          ]}
        />
      }
      trigger={["click"]}
    >
      <Button type="default">
        <Space>
          Manage Item
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}
