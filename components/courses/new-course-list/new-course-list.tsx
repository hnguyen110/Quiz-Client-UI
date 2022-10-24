import GenericList from "../../utilities/generic-list/generic-list";

export default function NewCourseList() {
  return (
    <GenericList
      title="New Courses"
      dataSource={[]}
      onItemSelectedHandler={null}
    />
  );
}
