import { Button, Drawer, Space } from "antd";

interface Props {
  title: string;
  placement: "top" | "bottom" | "right" | "left";
  width: string | number;
  open: boolean;
  onCloseHandler: any;
  children: any;
}

export default function GenericDrawer({
  title,
  placement,
  width,
  open,
  onCloseHandler,
  children,
}: Props) {
  return (
    <Drawer
      title={title}
      placement={placement}
      width={width}
      open={open}
      onClose={onCloseHandler}
      mask={false}
      getContainer={false}
      className="absolute"
      extra={
        <Space>
          <Button type="primary" danger onClick={onCloseHandler}>
            Cancel
          </Button>
          <Button type="primary" onClick={onCloseHandler}>
            Save And Submit
          </Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
}
