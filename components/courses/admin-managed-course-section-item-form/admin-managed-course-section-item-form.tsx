import GenericModal from "../../utilities/generic-modal/generic-modal";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Props {
  form: FormInstance<any>;
  title: string;
  open: boolean;
  onOkHandler: any;
  onCancelHandler: any;
}

export default function AdminManagedCourseSectionItemForm({
  form,
  title,
  open,
  onOkHandler,
  onCancelHandler,
}: Props) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <GenericModal
      title={title}
      open={open}
      onOkHandler={onOkHandler}
      onCancelHandler={onCancelHandler}
    >
      <Form form={form} layout="vertical">
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Title"
          name="title"
          rules={[{ required: true, message: "This field can not be empty" }]}
        >
          <Input placeholder="Please enter the item title" />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Order"
          name="order"
          rules={[{ required: true, message: "This field can not be empty" }]}
        >
          <Input placeholder="Please enter the item order" />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Data"
          name="data"
          rules={[{ required: true, message: "This field can not be empty" }]}
        >
          {/*<Input placeholder="Please select a file to upload" />*/}
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
      </Form>
    </GenericModal>
  );
}
