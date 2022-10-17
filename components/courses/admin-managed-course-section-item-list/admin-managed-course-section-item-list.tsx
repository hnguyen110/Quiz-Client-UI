import { Button } from "antd";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import CourseSection from "../../../utilities/types/courses/course-section.type";

interface Props {
  section: CourseSection;
  open: boolean;
  setOpen: any;
}

export default function AdminManagedCourseSectionItemList({
  section,
  open,
  setOpen,
}: Props) {
  return (
    <GenericDrawer
      title={section?.title || ""}
      placement="right"
      width="90%"
      open={open}
      onCloseHandler={() => setOpen(false)}
      extra={<Button>Create Course Item</Button>}
    >
      <div></div>
    </GenericDrawer>
  );
}
