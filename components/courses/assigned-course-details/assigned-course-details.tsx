import { message, TreeSelect } from "antd";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import Course from "../../../utilities/types/courses/course.type";
import { useEffect, useState } from "react";
import { getAssignedCourseDetails } from "../../../services/courses/assigned-courses.service";
import { useSession } from "next-auth/react";
import AssignedCourseSection from "../../../utilities/types/courses/assigned-course-section.type";
import AssignedCourseSectionItem from "../../../utilities/types/courses/assigned-course-section-item.type";
import { getCourseSectionItem } from "../../../services/courses/course-section-items.service";
import CourseSectionItem from "../../../utilities/types/courses/course-section-item.type";
import GenericSpin from "../../utilities/generic-spin/generic-spin";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(
  () => import("../../utilities/video-player/video-player"),
  {
    ssr: false,
  }
);

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
  const [section, setSection] = useState(null as null | AssignedCourseSection);
  const [item, setItem] = useState(null as null | AssignedCourseSectionItem);
  const [mediaContent, setMediaContent] = useState(
    null as null | CourseSectionItem
  );
  const [paused, setPaused] = useState(true);
  const session = useSession();

  useEffect(() => {
    if (course) {
      getAssignedCourseDetails(session.data as any, course?.id)
        .then((data) => {
          setSections(data.sections);
          if (item === null) {
            setSection(data.sections[0]);
            setItem(data.sections[0].items[0]);
          }
        })
        .catch((e) => {
          message.error(
            "There was an issue while trying to receive the course details, please try again"
          );
        });
    }
  }, [course, item]);

  useEffect(() => {
    if (section && item) {
      getCourseSectionItem(session.data as any, course.id, section.id, item.id)
        .then((data) => {
          setMediaContent(data);
        })
        .catch();
    }
  }, [course?.id, item, section]);

  async function onCourseSectionItemSelectedHandler(id: string | number) {
    sections.map((courseSection) => {
      courseSection.items.map((sectionItem) => {
        if (sectionItem.id === id) {
          setSection(courseSection);
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
      onCloseHandler={() => {
        setPaused(true);
        setTimeout(() => {
          setOpen(false);
        }, 1);
      }}
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
      {mediaContent ? (
        <VideoPlayer
          id={mediaContent.id}
          source={mediaContent.data}
          type={mediaContent.content_type}
          paused={paused}
          setPaused={setPaused}
        />
      ) : (
        <GenericSpin />
      )}
    </GenericDrawer>
  );
}
