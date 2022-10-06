import {Alert, Space} from "antd";
import Question from "../../../utilities/types/quizzes/question.type";

interface Props {
    question: Question;
}

export default function QuizQuestionResult({question}: Props) {
    const solutions = question.selected_solution?.map((item) => item.id);

    return (
        <Space direction="vertical" className="w-full">
            {question.solutions.map((item) => (
                <Alert
                    showIcon
                    key={item.id}
                    className="w-full"
                    message={item.description}
                    type={
                        item.isCorrect
                            ? "success"
                            : solutions?.includes(item.id)
                                ? solutions?.includes(item.id) && item.isCorrect
                                    ? "success"
                                    : "error"
                                : "info"
                    }
                />
            ))}
        </Space>
    );
}
