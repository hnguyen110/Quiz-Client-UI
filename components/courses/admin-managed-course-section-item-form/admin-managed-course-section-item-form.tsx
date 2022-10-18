import dynamic from "next/dynamic";
import GenericModal from "../../utilities/generic-modal/generic-modal";
import { Button, Form, FormInstance, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import GenericSpin from "../../utilities/generic-spin/generic-spin";
import CourseSectionItem from "../../../utilities/types/courses/course-section-item.type";
import { useState } from "react";

const VideoPlayer = dynamic(
  () => import("../../utilities/video-player/video-player"),
  {
    ssr: false,
  }
);

interface Props {
  form: FormInstance<any>;
  title: string;
  open: boolean;
  loading?: boolean;
  onOkHandler?: any;
  onCancelHandler: any;
  readonly?: boolean;
  item?: CourseSectionItem | null;
}

export default function AdminManagedCourseSectionItemForm({
  form,
  title,
  open,
  loading,
  onOkHandler,
  onCancelHandler,
  readonly = false,
  item,
}: Props) {
  const [paused, setPaused] = useState(true);
  return (
    <GenericModal
      title={title}
      open={open}
      onOkHandler={onOkHandler}
      onCancelHandler={() => {
        setPaused(true);
        setTimeout(() => {
          onCancelHandler();
        }, 1);
      }}
    >
      {loading ? (
        <GenericSpin />
      ) : (
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

          {readonly ? (
            <VideoPlayer
              id={item?.id ?? 0}
              source={item?.data ?? ""}
              type={item?.content_type ?? ""}
              paused={paused}
              setPaused={setPaused}
            />
          ) : (
            <Form.Item
              hasFeedback
              label="Media Content File"
              name="data"
              rules={[
                { required: true, message: "This field can not be empty" },
              ]}
            >
              <Upload>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
          )}
        </Form>
      )}
    </GenericModal>
  );
}
