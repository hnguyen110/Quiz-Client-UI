import GenericList from "../../utilities/generic-list/generic-list";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Course from "../../../utilities/types/courses/course.type";
import { getNewCourses } from "../../../services/courses/new-courses.service";
import { Form, message } from "antd";
import NewCourseDetails from "../new-course-details/new-course-details";
import PaymentForm from "../../utilities/payment-form/payment-form";
import { checkoutCourse } from "../../../services/courses/courses.service";

export default function NewCourseList() {
  const [course, setCourse] = useState(null as null | Course);
  const [courses, setCourses] = useState([] as Course[]);
  const [courseFormOpen, setCourseFormOpen] = useState(false);
  const [paymentFormOpen, setPaymentFormOpen] = useState(false);
  const [courseForm] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const session = useSession();

  useEffect(() => {
    getNewCourses(session.data as any)
      .then((data) => {
        setCourses(data);
      })
      .catch((e) => {
        message.error(
          "There was an issue while trying to receive new courses, please try again"
        );
      });
  }, [session.data]);

  function onItemSelectedHandler(item: Course) {
    setCourse(item);
    courseForm.setFieldsValue({
      ...item,
    });
    setCourseFormOpen(true);
  }

  async function onCancelHandler() {
    courseForm.resetFields();
    setCourseFormOpen(false);
  }

  async function onSelectForCheckingOutHandler() {
    courseForm.resetFields();
    setCourseFormOpen(false);
    setPaymentFormOpen(true);
  }

  async function onCheckoutHandler() {
    const data = await paymentForm.validateFields();
    try {
      await checkoutCourse(session.data as any, course?.id ?? 0, data);
      paymentForm.resetFields();
      setPaymentFormOpen(false);
      setCourses(courses.filter((item) => item.id !== course?.id));
      message.success("The payment is completed successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to complete your payment, please try again"
      );
    }
  }

  async function onCancelPaymentHandler() {
    paymentForm.resetFields();
    setPaymentFormOpen(false);
  }

  return (
    <>
      <NewCourseDetails
        form={courseForm}
        title={course?.title ?? ""}
        open={courseFormOpen}
        onOkHandler={onSelectForCheckingOutHandler}
        onCancelHandler={onCancelHandler}
      />
      <PaymentForm
        form={paymentForm}
        title={course?.title ?? ""}
        open={paymentFormOpen}
        onOkHandler={onCheckoutHandler}
        onCancelHandler={onCancelPaymentHandler}
      />
      <GenericList
        title="New Courses"
        dataSource={courses}
        onItemSelectedHandler={onItemSelectedHandler}
      />
    </>
  );
}
