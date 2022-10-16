import { Button, Dropdown, Menu, Popconfirm, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Props {
  item: any;
  onItemSelectedHandler: any;
  onItemSelectedForUpdatingHandler: any;
  onItemSelectedForDeletingHandler: any;
}

export default function ItemActionsDropdownButton({
  item,
  onItemSelectedHandler,
  onItemSelectedForUpdatingHandler,
  onItemSelectedForDeletingHandler,
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
              label: "Update Item",
              key: "1",
              onClick: () => onItemSelectedForUpdatingHandler(item),
            },
            {
              label: (
                <Popconfirm
                  placement="right"
                  title="Please confirm again that you would like to delete the selected item"
                  onConfirm={() => {
                    onItemSelectedForDeletingHandler(item);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  Delete Item
                </Popconfirm>
              ),
              key: "2",
            },
            {
              label: "View Item Details",
              key: "3",
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
