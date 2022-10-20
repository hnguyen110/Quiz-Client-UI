import { Drawer } from "antd";

interface Props {
  title: string;
  placement: "top" | "bottom" | "right" | "left";
  width: string | number;
  open: boolean;
  extra?: any;
  onCloseHandler: any;
  onFinishHandler?: any;
  children: any;
}

export default function GenericDrawer({
  title,
  placement,
  width,
  open,
  extra,
  onCloseHandler,
  onFinishHandler,
  children,
}: Props) {
  return (
    <Drawer
      bodyStyle={{ padding: 0 }}
      title={title}
      placement={placement}
      width={width}
      open={open}
      onClose={onCloseHandler}
      mask={true}
      getContainer={false}
      className="absolute"
      extra={extra}
    >
      {children}
    </Drawer>
  );
}
