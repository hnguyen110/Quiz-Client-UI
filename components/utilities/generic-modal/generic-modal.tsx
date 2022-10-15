import { Modal } from "antd";

interface Props {
  title: string;
  open: boolean;
  onOkHandler: any;
  onCancelHandler: any;
  children: any;
}

export default function GenericModal({
  title,
  open,
  onOkHandler,
  onCancelHandler,
  children,
}: Props) {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onOkHandler}
      onCancel={onCancelHandler}
    >
      {children}
    </Modal>
  );
}
