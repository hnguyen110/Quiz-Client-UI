import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AdminQuizList from "../admin-quiz-list/admin-quiz-list";
import AdminManagedQuizForm from "../admin-managed-quiz-form/admin-managed-quiz-form";
import {
  createQuiz,
  getAdministratorManagedQuizzes,
  updateQuiz,
} from "../../../services/quizzes/quizzes.service";
import { Button, Form, message } from "antd";
import { AdminManagedQuizzesContext } from "../../../contexts/admin-managed-quizzes.context";
import Quiz from "../../../utilities/types/quizzes/quiz.type";

export default function AdminManagedQuizList() {
  const [quizzes, setQuizzes] = useState([] as Quiz[]);
  const [quizFormOpen, setQuizFormOpen] = useState(false);
  const [createQuizForm] = Form.useForm();
  const [updateQuizForm] = Form.useForm();
  const session = useSession();

  useEffect(() => {
    getAdministratorManagedQuizzes(session.data as any)
      .then((data) => {
        setQuizzes(data);
      })
      .catch((e) => {
        message.error(
          "There was an issue while trying to receive your quizzes, please try again"
        );
      });
  }, [session.data]);

  async function onCreateQuizHandler() {
    const data = await createQuizForm.validateFields();
    try {
      const quiz = await createQuiz(session.data as any, data);
      setQuizzes([quiz, ...quizzes]);
      createQuizForm.resetFields();
      setQuizFormOpen(false);
      message.success("The quiz is created successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to create the quiz, please try again"
      );
    }
  }

  async function onCancelCreateQuizHandler() {
    createQuizForm.resetFields();
    setQuizFormOpen(false);
  }

  async function onQuizSelectedForUpdatingHandler(quiz: Quiz) {
    updateQuizForm.setFieldsValue({
      ...quiz,
    });
    setQuizFormOpen(true);
  }

  async function onUpdateQuizHandler() {
    const data = await updateQuizForm.validateFields();
    try {
      const quiz = await updateQuiz(session.data as any, data);
      setQuizzes(
        quizzes.map((item) => {
          if (item.id === quiz.id) {
            return {
              ...quiz,
            };
          }
          return item;
        })
      );
      updateQuizForm.resetFields();
      setQuizFormOpen(false);
      message.success("The quiz is updated successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to update the quiz, please try again"
      );
    }
  }

  async function onCancelUpdateQuizHandler() {
    updateQuizForm.resetFields();
    setQuizFormOpen(false);
  }

  return (
    <AdminManagedQuizzesContext.Provider
      value={{
        quizzes,
        setQuizzes,
      }}
    >
      <AdminManagedQuizForm
        form={createQuizForm}
        title="Create Quiz"
        open={quizFormOpen}
        onOkHandler={onCreateQuizHandler}
        onCancelHandler={onCancelCreateQuizHandler}
      />
      <AdminManagedQuizForm
        form={updateQuizForm}
        title="Update Quiz"
        open={quizFormOpen}
        onOkHandler={onUpdateQuizHandler}
        onCancelHandler={onCancelUpdateQuizHandler}
      />
      <AdminQuizList
        title={"Manage Quizzes"}
        extra={
          <Button onClick={() => setQuizFormOpen(true)}>Create Quiz</Button>
        }
        quizzes={quizzes}
        onQuizSelectedHandler={undefined}
        onQuizSelectedForUpdatingHandler={onQuizSelectedForUpdatingHandler}
      />
    </AdminManagedQuizzesContext.Provider>
  );
}
