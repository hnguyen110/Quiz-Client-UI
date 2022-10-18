import { Space, Spin } from "antd";

export default function GenericSpin() {
  return (
    <Space className="flex justify-center p-16" size="middle">
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>
  );
}
