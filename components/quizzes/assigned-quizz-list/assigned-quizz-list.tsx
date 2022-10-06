import {message} from "antd";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {QuizzesContext} from "../../../contexts/quizzes.context";
import {
    getAssignedQuizDetails,
    getAssignedQuizzes,
    submitAssignedQuiz,
} from "../../../services/quizzes/quizzes.service";
import Answer from "../../../utilities/types/quizzes/answer.type";
import AssignedQuiz from "../../../utilities/types/quizzes/assigned-quiz.type";
import Quiz from "../../../utilities/types/quizzes/quiz.type";
import QuizDetails from "../quiz-details/quiz-details";
import QuizList from "../quiz-list/quiz-list";

export default function AssignedQuizzList() {
    const [answers, setAnswers] = useState([] as Answer[]);
    const [open, setOpen] = useState(false);
    const [quiz, setQuiz] = useState(null as null | Quiz);
    const [quizzes, setQuizzes] = useState([] as AssignedQuiz[]);
    const session = useSession();

    useEffect(() => {
        getAssignedQuizzes(session.data as any)
            .then((data) => {
                setQuizzes(data);
            })
            .catch((e) => {
                message.error(
                    "There was an issue while trying to receive your assigned quizzes, please try again"
                );
            });
    }, [session.data]);

    async function onQuizSelectedHandler(data: Quiz) {
        try {
            const {questions} = await getAssignedQuizDetails(
                session.data as any,
                data.id
            );
            setQuiz({...data, questions});
            setOpen(true);
        } catch (e) {
            message.error(
                "There was an issue while trying to retrieve the quiz details, please try again"
            );
        }
    }

    async function onCloseHandler() {
        setOpen(false);
    }

    async function onFinishHandler() {
        let ids = Array.from(
            new Set(
                answers.map((item) => {
                    return item.question;
                })
            )
        );
        if (ids.length === quiz?.questions.length) {
            try {
                const {id} = quizzes.find(
                    (item) => item.quiz.id === quiz.id
                ) as AssignedQuiz;
                await submitAssignedQuiz(session.data as any, quiz.id, id, answers);
                setQuizzes(quizzes.filter((item) => item.quiz.id !== quiz.id));
                setOpen(false);
                message.success("The quiz submission process is successful");
            } catch (e) {
                message.error(
                    "There was an issue during the quiz submission process, please try again"
                );
            }
        } else {
            message.error(
                "Some questions are not answered yet, please provide your answers to these questions and try again"
            );
        }
    }

    return (
        <QuizzesContext.Provider
            value={{answers, setAnswers, quizzes, setQuizzes}}
        >
            <QuizDetails
                title={quiz?.title ?? ""}
                width={"100%"}
                open={open}
                onCloseHandler={onCloseHandler}
                onFinishHandler={onFinishHandler}
                questions={quiz?.questions ?? []}
            />
            <QuizList
                title="Assigned Quizzes"
                quizzes={quizzes}
                onQuizSelectedHandler={onQuizSelectedHandler}
            />
        </QuizzesContext.Provider>
    );
}
