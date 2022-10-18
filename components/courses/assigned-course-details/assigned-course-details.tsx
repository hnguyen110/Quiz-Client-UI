import { Button } from "antd";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import Course from "../../../utilities/types/courses/course.type";
import VideoPlayer from "../../utilities/video-player/video-player";

interface Props {
  course: Course;
  open: boolean;
  setOpen: any;
}

export default function AssignedCourseDetails({
  course,
  open,
  setOpen,
}: Props) {
  return (
    <GenericDrawer
      title={course?.title || ""}
      placement="right"
      width="100%"
      open={open}
      onCloseHandler={() => setOpen(false)}
      extra={<Button>Select Course Item</Button>}
    >
      <VideoPlayer
        id={1}
        source={""}
        type={"video"}
        paused={true}
        setPaused={null}
      />
    </GenericDrawer>
  );
}
