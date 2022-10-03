import {Alert, Checkbox, Radio, Space, Typography} from "antd";
import Question from "../../../utilities/types/quizzes/question.type";

interface Props {
    question: Question;
    resultOnly: boolean;
}

export default function QuizQuestion({question, resultOnly}: Props) {
    const solutions = question.selected_solution?.map((item) => item.id);

    return (
        <Space direction="vertical" className="w-full">
            <Typography.Text strong>{question.description}</Typography.Text>
            {resultOnly ? (
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
            ) : null}
            {!resultOnly && question.type === "single_choice" ? (
                <Radio.Group>
                    <Space direction="vertical">
                        {question.solutions.map((item) => (
                            <Radio key={item.id} value={item.id}>
                                {item.description}
                            </Radio>
                        ))}
                    </Space>
                </Radio.Group>
            ) : null}
            {!resultOnly && question.type === "multiple_choice" ? (
                <Checkbox.Group>
                    <Space direction="vertical">
                        {question.solutions.map((item) => (
                            <Checkbox key={item.id} value={item.id}>
                                {item.description}
                            </Checkbox>
                        ))}
                    </Space>
                </Checkbox.Group>
            ) : null}
        </Space>
    );
}
