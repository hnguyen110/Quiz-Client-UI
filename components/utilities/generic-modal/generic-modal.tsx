import { Modal } from "antd";

interface Props {
  title: string;
  open: boolean;
  footer?: any;
  confirmLoading?: boolean;
  onOkHandler: any;
  onCancelHandler: any;
  children: any;
}

export default function GenericModal({
  title,
  open,
  footer,
  confirmLoading,
  onOkHandler,
  onCancelHandler,
  children,
}: Props) {
  return (
    <Modal
      title={title}
      open={open}
      footer={footer}
      confirmLoading={confirmLoading}
      onOk={onOkHandler}
      onCancel={onCancelHandler}
    >
      {children}
    </Modal>
  );
}
