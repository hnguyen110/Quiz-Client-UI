import { Card, Col, List, Row } from "antd";

export default function AssignedQuizzes() {
  const data = [
    {
      title: "AWS Certified Developer Exam",
      description:
        "This credential helps organizations identify and develop talent with critical skills for implementing cloud initiatives. Earning AWS Certified Developer – Associate validates the ability to write and deploy cloud-based applications.",
    },
    {
      title: "AWS Certified Developer Exam",
      description:
        "This credential helps organizations identify and develop talent with critical skills for implementing cloud initiatives. Earning AWS Certified Developer – Associate validates the ability to write and deploy cloud-based applications.",
    },
    {
      title: "AWS Certified Developer Exam",
      description:
        "This credential helps organizations identify and develop talent with critical skills for implementing cloud initiatives. Earning AWS Certified Developer – Associate validates the ability to write and deploy cloud-based applications.",
    },
    {
      title: "AWS Certified Developer Exam",
      description:
        "This credential helps organizations identify and develop talent with critical skills for implementing cloud initiatives. Earning AWS Certified Developer – Associate validates the ability to write and deploy cloud-based applications.",
    },
    {
      title: "AWS Certified Developer Exam",
      description:
        "This credential helps organizations identify and develop talent with critical skills for implementing cloud initiatives. Earning AWS Certified Developer – Associate validates the ability to write and deploy cloud-based applications.",
    },
    {
      title: "AWS Certified Developer Exam",
      description:
        "This credential helps organizations identify and develop talent with critical skills for implementing cloud initiatives. Earning AWS Certified Developer – Associate validates the ability to write and deploy cloud-based applications.",
    },
    {
      title: "AWS Certified Developer Exam",
      description:
        "This credential helps organizations identify and develop talent with critical skills for implementing cloud initiatives. Earning AWS Certified Developer – Associate validates the ability to write and deploy cloud-based applications.",
    },
    {
      title: "AWS Certified Developer Exam",
      description:
        "This credential helps organizations identify and develop talent with critical skills for implementing cloud initiatives. Earning AWS Certified Developer – Associate validates the ability to write and deploy cloud-based applications.",
    },
    {
      title: "AWS Certified Developer Exam",
      description:
        "This credential helps organizations identify and develop talent with critical skills for implementing cloud initiatives. Earning AWS Certified Developer – Associate validates the ability to write and deploy cloud-based applications.",
    },
    {
      title: "AWS Certified Developer Exam",
      description:
        "This credential helps organizations identify and develop talent with critical skills for implementing cloud initiatives. Earning AWS Certified Developer – Associate validates the ability to write and deploy cloud-based applications.",
    },
  ];

  return (
    <Card
      title="Assigned Quizzes"
      bordered={false}
      className="w-full h-screen overflow-y-auto"
    >
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item actions={[<a key="list-loadmore-edit">Start Quiz</a>]}>
                <List.Item.Meta
                  title={<a>{item.title}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Card>
  );
}
