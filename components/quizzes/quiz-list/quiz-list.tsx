import {Button, Card, Col, List, Row} from "antd";
import Item from "antd/lib/list/Item";
import AssignedQuiz from "../../../utilities/types/quizzes/assigned-quiz.type";
import Quiz from "../../../utilities/types/quizzes/quiz.type";
import SubmittedQuiz from "../../../utilities/types/quizzes/submitted-quiz.type";

interface Props {
    title: string;
    quizzes: AssignedQuiz[] | SubmittedQuiz[];
    onQuizSelectedHandler: any;
    resultOnly?: boolean;
}

export default function QuizList({
                                     title,
                                     quizzes,
                                     onQuizSelectedHandler,
                                     resultOnly = false,
                                 }: Props) {
    return (
        <Card
            title={title}
            bordered={false}
            className="w-full h-screen overflow-y-auto"
        >
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24}>
                    <List
                        itemLayout="horizontal"
                        dataSource={quizzes.map((item) => item.quiz)}
                        renderItem={(item) => (
                            <List.Item
                                onClick={() => {
                                    onQuizSelectedHandler(item);
                                }}
                                actions={[
                                    resultOnly ? (
                                        <Button type="primary" key="viewResult">
                                            View Quiz Result
                                        </Button>
                                    ) : (
                                        <Button type="primary" key="startQuiz">
                                            Start Quiz
                                        </Button>
                                    ),
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
