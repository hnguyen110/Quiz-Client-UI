import {Alert, Space} from "antd";
import Question from "../../../utilities/types/quizzes/question.type";
import Solution from "../../../utilities/types/quizzes/solution.type";

interface Props {
    question: Question;
    selectedSolutions?: Solution[];
}

export default function QuizQuestionResult({
                                               question,
                                               selectedSolutions = [],
                                           }: Props) {
    const solutions = selectedSolutions?.map((item) => item.id);

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
