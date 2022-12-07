import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined, HomeFilled } from "@ant-design/icons";
import { messages } from "../../../assets/lang/messages";
import 'bootstrap/dist/css/bootstrap.min.css';
import auth from '../../../api/auth'
import useAuth from '../../../hooks/useAuth'
import "./sign-in.scss";

function SignUp() {
    const { setToken, setUser } = useAuth()
    const [inputEmailState, setInputEmailState] = useState(false);
    const [inputPasswordState, setInputPasswordState] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await auth.login(values)
            if (response.request.status === 200) {
                setUser(response.data.user)
                setToken(response.data.token)
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    };
    return (
        <div className="sign-in-container">
            <div className="sign-in-container__home-icon" onClick={() => navigate("/")}>
                <HomeFilled className="icon"/>
            </div>
            <div className="sign-in-container__content">
                <h1>サインイン</h1>
                <Form
                    className="mt-5"
                    onFinish={onFinish}
                >
                    <div
                        className={
                            inputEmailState
                                ? "sign-in-container__content__item active"
                                : "sign-in-container__content__item"
                        }
                    >
                        <MailOutlined className="icon" />
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: messages["text_required"],
                                },
                                {
                                    type: "email",
                                    message: messages["invalid_email"],
                                },
                            ]}
                        >
                            <Input
                                className="input"
                                placeholder="Email"
                                onFocus={() => setInputEmailState(true)}
                                onBlur={() => setInputEmailState(false)}
                            />
                        </Form.Item>
                    </div>
                    <div
                        className={
                            inputPasswordState
                                ? "sign-in-container__content__item active"
                                : "sign-in-container__content__item"
                        }
                    >
                        <LockOutlined className="icon" />
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: messages["text_required"],
                                },
                                {
                                    type: "string",
                                    min: 6,
                                    max: 24,
                                    message:
                                        messages["invalid_password_length"],
                                },
                            ]}
                        >
                            <Input.Password
                                className="input"
                                placeholder="Password"
                                onFocus={() => setInputPasswordState(true)}
                                onBlur={() => setInputPasswordState(false)}
                            />
                        </Form.Item>
                    </div>
                    <label className="mt-3">パスワードをお忘れですか?</label>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="btn-submit my-3"
                        >
                            サインアップ
                        </Button>
                    </Form.Item>
                    <a href="/sign-up" className="text-center ">
                      新しいアカウントを作成する
                    </a>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;
