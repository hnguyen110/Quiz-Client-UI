import validator from "validator";
import {Button, Col, Form, Input, message, Row, Typography} from "antd";
import {signUp} from "../../../services/authentication/authentication.service";
import SignUpParameters from "../../../utilities/types/authentication/sign-up.type";
import Link from "next/link";
import {useRouter} from "next/router";

export default function SignUp() {
    const router = useRouter();

    async function onFinishHandler(data: SignUpParameters) {
        try {
            await signUp(data);
            message.success("The sign-up process is successful");
            router.replace("/auth/sign-in");
        } catch (e) {
            message.error(
                "There was a an issue during the sign-up process, please try again"
            );
        }
    }

    return (
        <Row className="pt-12 px-4">
            <Col className="m-auto" xs={24} sm={24} md={15} lg={9} xl={9}>
                <Typography.Title level={3}>Sign Up</Typography.Title>
                <Form onFinish={onFinishHandler} layout="vertical">
                    <Form.Item
                        hasFeedback
                        label="Email Address"
                        name="email"
                        rules={[
                            {required: true, message: "This field can not be empty"},
                            {
                                message: "The email address format is invalid",
                                validator(rule, value, callback) {
                                    return validator.isEmail(value)
                                        ? Promise.resolve()
                                        : Promise.reject();
                                },
                            },
                        ]}
                    >
                        <Input placeholder="Please enter your email address"/>
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Username"
                        name="username"
                        rules={[{required: true, message: "This field can not be empty"}]}
                    >
                        <Input placeholder="Please enter your username"/>
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Password"
                        name="password"
                        rules={[
                            {required: true, message: "This field can not be empty"},
                            {
                                message: "The password is not strong enough",
                                validator(rule, value, callback) {
                                    return validator.isStrongPassword(value)
                                        ? Promise.resolve()
                                        : Promise.reject();
                                },
                            },
                        ]}
                    >
                        <Input.Password placeholder="Please enter your password"/>
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Confirmed Password"
                        name="confirmedPassword"
                        rules={[
                            {required: true, message: "This field can not be empty"},
                            ({getFieldValue}) => ({
                                message: "The passwords do not match",
                                validator(_, value) {
                                    return !value || getFieldValue("password") === value
                                        ? Promise.resolve()
                                        : Promise.reject();
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Please confirm your password again"/>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>

                    <Link href="/auth/sign-in">
                        Already have an account? Sign in here.
                    </Link>
                </Form>
            </Col>
        </Row>
    );
}
