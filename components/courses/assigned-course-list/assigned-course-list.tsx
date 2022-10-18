import GenericList from "../../utilities/generic-list/generic-list";

export default function AssignedCourseList() {
  return (
    <GenericList
      title="Assigned Courses"
      dataSource={[]}
      onItemSelectedHandler={null}
    />
  );
}
