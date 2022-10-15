import { Button, Dropdown, Menu, Popconfirm, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import Quiz from "../../../utilities/types/quizzes/quiz.type";

interface Props {
  quiz: Quiz;
  onQuizSelectedHandler: any;
  onQuizSelectedForUpdatingHandler: any;
  onQuizSelectedForDeletingHandler: any;
}

export default function ItemActionsDropdownButton({
  quiz,
  onQuizSelectedHandler,
  onQuizSelectedForUpdatingHandler,
  onQuizSelectedForDeletingHandler,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      open={open}
      onOpenChange={(value) => setOpen(value)}
      key={"actions"}
      overlay={
        <Menu
          onClick={(item) => {
            if (item.key !== "2") {
              setOpen(false);
            } else {
              setOpen(true);
            }
          }}
          items={[
            {
              label: "Update Quiz",
              key: "1",
              onClick: () => onQuizSelectedForUpdatingHandler(quiz),
            },
            {
              label: (
                <Popconfirm
                  placement="right"
                  title="Please confirm again that you would like to delete the selected quiz"
                  onConfirm={() => {
                    onQuizSelectedForDeletingHandler(quiz);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  Delete Quiz
                </Popconfirm>
              ),
              key: "2",
            },
            {
              label: "View Quiz Questions",
              key: "3",
              onClick: () => onQuizSelectedHandler(quiz),
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
    </Dropdown>
  );
}
