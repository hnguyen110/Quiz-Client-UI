import { message, TreeSelect } from "antd";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import Course from "../../../utilities/types/courses/course.type";
import { useEffect, useState } from "react";
import { getAssignedCourseDetails } from "../../../services/courses/assigned-courses.service";
import { useSession } from "next-auth/react";
import AssignedCourseSection from "../../../utilities/types/courses/assigned-course-section.type";
import AssignedCourseSectionItem from "../../../utilities/types/courses/assigned-course-section-item.type";

const { TreeNode } = TreeSelect;

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
  const [sections, setSections] = useState([] as AssignedCourseSection[]);
  const [item, setItem] = useState(null as null | AssignedCourseSectionItem);
  const session = useSession();

  useEffect(() => {
    getAssignedCourseDetails(session.data as any, course?.id)
      .then((data) => {
        setSections(data.sections);
        if (item === null) {
          setItem(data.sections[0].items[0]);
        }
      })
      .catch((e) => {
        message.error(
          "There was an issue while trying to receive the course details, please try again"
        );
      });
  }, [course?.id, item, session.data]);

  async function onCourseSectionItemSelectedHandler(id: string | number) {
    sections.map((section) => {
      section.items.map((sectionItem) => {
        if (sectionItem.id === id) {
          setItem(sectionItem);
        }
      });
    });
  }

  return (
    <GenericDrawer
      title={course?.title || ""}
      placement="right"
      width="100%"
      open={open}
      onCloseHandler={() => setOpen(false)}
      extra={
        <TreeSelect
          showArrow={false}
          showSearch
          style={{ width: 250 }}
          dropdownStyle={{ maxHeight: 500, overflow: "auto" }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          onChange={onCourseSectionItemSelectedHandler}
        >
          {sections.map((section) => (
            <TreeNode
              key={section.id}
              value={section.title}
              title={section.title}
            >
              {section.items.map((item) => (
                <TreeNode key={item.id} value={item.id} title={item.title} />
              ))}
            </TreeNode>
          ))}
        </TreeSelect>
      }
    >
      {/*<VideoPlayer*/}
      {/*  id={item.id}*/}
      {/*  source={item.}*/}
      {/*  type={"video"}*/}
      {/*  paused={true}*/}
      {/*  setPaused={null}*/}
      {/*/>*/}
    </GenericDrawer>
  );
}
