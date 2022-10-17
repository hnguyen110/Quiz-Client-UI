import { UploadFile } from "antd";

export default interface ModifyCourseSectionItem {
  id: number;
  order: number;
  title: string;
  data: { file: UploadFile };
}
