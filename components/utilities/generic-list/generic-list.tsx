import { Card, Col, List, Row } from "antd";
import ItemActionsDropdownButton from "./item-actions-dropdown-button";

interface Props {
  title?: string;
  extra?: any;
  dataSource: any[];
  onItemSelectedHandler: any;
}

export default function GenericList({
  title,
  extra,
  dataSource,
  onItemSelectedHandler,
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
            dataSource={dataSource}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <ItemActionsDropdownButton
                    key={item.id}
                    item={item}
                    onItemSelectedHandler={onItemSelectedHandler}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={
                    <a onClick={() => onItemSelectedHandler(item)}>
                      {item.title}
                    </a>
                  }
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
