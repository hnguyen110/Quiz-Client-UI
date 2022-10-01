import { List } from "antd";
import Question from "../../../utilities/types/quizzes/question/question";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import QuizQuestion from "../quiz-question/quiz-question";

interface Props {
  title: string;
  width: string | number;
  open: boolean;
  onCloseHandler: any;
}

const dataSource: Question[] = [
  {
    id: 1,
    description: `A company is migrating a legacy application to Amazon EC2. The application uses a user name and
    password stored in the source code to connect to a MySQL database. The database will be migrated to an
    Amazon RDS for MySQL DB instance. As part of the migration, the company wants to implement a secure
    way to store and automatically rotate the database credentials.`,
    solutions: [
      {
        id: 1,
        description: `Store the database credentials in environment variables in an Amazon Machine Image (AMI). Rotate the
      credentials by replacing the AMI.`,
      },
      {
        id: 2,
        description: `Store the database credentials in AWS Systems Manager Parameter Store. Configure Parameter Store to
        automatically rotate the credentials.`,
      },
      {
        id: 3,
        description: `Store the database credentials in environment variables on the EC2 instances. Rotate the credentials by
        relaunching the EC2 instances.`,
      },
      {
        id: 4,
        description: `Store the database credentials in AWS Secrets Manager. Configure Secrets Manager to automatically
        rotate the credentials`,
      },
    ],
    type: "single_choice",
  },
  {
    id: 1,
    description: `A company is migrating a legacy application to Amazon EC2. The application uses a user name and
    password stored in the source code to connect to a MySQL database. The database will be migrated to an
    Amazon RDS for MySQL DB instance. As part of the migration, the company wants to implement a secure
    way to store and automatically rotate the database credentials.`,
    solutions: [
      {
        id: 1,
        description: `Store the database credentials in environment variables in an Amazon Machine Image (AMI). Rotate the
      credentials by replacing the AMI.`,
      },
      {
        id: 2,
        description: `Store the database credentials in AWS Systems Manager Parameter Store. Configure Parameter Store to
        automatically rotate the credentials.`,
      },
      {
        id: 3,
        description: `Store the database credentials in environment variables on the EC2 instances. Rotate the credentials by
        relaunching the EC2 instances.`,
      },
      {
        id: 4,
        description: `Store the database credentials in AWS Secrets Manager. Configure Secrets Manager to automatically
        rotate the credentials`,
      },
    ],
    type: "multiple_choice",
  },
];

export default function QuizDetails({
  title,
  width,
  open,
  onCloseHandler,
}: Props) {
  return (
    <GenericDrawer
      title={title}
      placement={"right"}
      width={width}
      open={open}
      onCloseHandler={onCloseHandler}
    >
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <QuizQuestion question={item} />
          </List.Item>
        )}
      />
    </GenericDrawer>
  );
}
