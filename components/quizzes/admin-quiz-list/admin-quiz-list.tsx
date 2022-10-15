import { Button, Card, Col, Dropdown, List, Menu, Row, Space } from "antd";
import Quiz from "../../../utilities/types/quizzes/quiz.type";
import { DownOutlined } from "@ant-design/icons";

interface Props {
  title: string;
  extra?: any;
  quizzes: Quiz[];
  onQuizSelectedHandler: any;
  onQuizSelectedForUpdatingHandler: any;
}

export default function AdminQuizList({
  title,
  extra,
  quizzes,
  onQuizSelectedHandler,
  onQuizSelectedForUpdatingHandler,
}: Props) {
  return (
    <Card
      title={title}
      bordered={false}
      className="w-full h-screen overflow-y-auto"
      extra={extra}
    >
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
          <List
            itemLayout="horizontal"
            dataSource={quizzes}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Dropdown
                    key={"actions"}
                    overlay={
                      <Menu
                        items={[
                          {
                            label: "Update Quiz",
                            key: "1",
                            onClick: () =>
                              onQuizSelectedForUpdatingHandler(item),
                          },
                          {
                            label: "Delete Quiz",
                            key: "2",
                          },
                          {
                            label: "View Quiz Questions",
                            key: "3",
                            onClick: () => onQuizSelectedHandler(item),
                          },
                        ]}
                      />
                    }
                    trigger={["click"]}
                  >
                    <Button type="default">
                      <Space>
                        Manage Quiz
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>,
                ]}
              >
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
