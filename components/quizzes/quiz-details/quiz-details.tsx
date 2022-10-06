import {List} from "antd";
import Question from "../../../utilities/types/quizzes/question.type";
import QuizResultAnswer from "../../../utilities/types/quizzes/quiz-result-answer.type";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import QuizQuestion from "../quiz-question/quiz-question";

interface Props {
    title: string;
    width: string | number;
    open: boolean;
    resultOnly?: boolean;
    answers?: QuizResultAnswer[];
    questions?: Question[];
    onCloseHandler: any;
    onFinishHandler?: any;
}

export default function QuizDetails({
                                        title,
                                        width,
                                        open,
                                        resultOnly = false,
                                        answers,
                                        questions,
                                        onCloseHandler,
                                        onFinishHandler,
                                    }: Props) {
    return (
        <GenericDrawer
            title={title}
            placement={"right"}
            width={width}
            open={open}
            onCloseHandler={onCloseHandler}
            onFinishHandler={onFinishHandler}
        >
            <List
                itemLayout="horizontal"
                dataSource={
                    resultOnly ? answers?.map((item) => item.question) : questions
                }
                renderItem={(item) => (
                    <List.Item>
                        <QuizQuestion
                            question={item}
                            resultOnly={resultOnly}
                            selectedSolutions={answers
                                ?.filter((answer) => item.id === answer.question.id)
                                .map((answer) => answer.selected_solution)}
                        />
                    </List.Item>
                )}
            />
        </GenericDrawer>
    );
}
