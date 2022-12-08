import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Input } from 'antd'
import {messages} from '../../assets/lang/messages'
import auth from '../../api/auth'
import './change-password.scss'

function ChangePassword() {
    const navigate = useNavigate()
    const handleSubmit = async (values) => {
        try {
            const response = await auth.changePassword(values)
            alert(response.data.message)
            navigate(`/profile`)
            window.location.reload(false)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    return (
        <div className="change-password-content">
            <Form
                name="changePassword"
                className="change-password-content__sub"
                onFinish={handleSubmit}
            >
                <div className="change-password-content__sub__info col-12">
                    <div className="change-password-content__sub__info__item col-8">
                        <span className="col-4 span ">Mật khẩu hiện tại</span>
                        <div className="col-1"></div>
                        <Form.Item
                            name="currentPassword"
                            className="col-7"
                            rules={[
                                {
                                    required: true,
                                    message: messages['password_required'],
                                },
                                {
                                    type: 'string',
                                    min: 6,
                                    max: 24,
                                    message:
                                        messages['invalid_password_length'],
                                },
                            ]}
                        >
                            <Input.Password
                                className="text"
                            />
                        </Form.Item>
                    </div>

                    <div className="change-password-content__sub__info__item col-8">
                        <span className="col-4 span">Mật khẩu mới</span>
                        <div className="col-1"></div>
                        <Form.Item
                            name="newPassword"
                            className="col-7"
                            rules={[
                                {
                                    required: true,
                                    message: messages['password_required'],
                                },
                                {
                                    type: 'string',
                                    min: 6,
                                    max: 24,
                                    message:
                                        messages['invalid_password_length'],
                                },
                            ]}
                        >
                            <Input.Password
                                className="text"
                            />
                        </Form.Item>
                    </div>

                    <div className="change-password-content__sub__info__item col-8">
                        <span className="col-4 span">Nhập lại mật khẩu mới</span>
                        <div className="col-1"></div>
                        <Form.Item
                            name="confirmNewPassword"
                            className="col-7"
                            dependencies={['newPassword']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message:
                                        messages['confirm_password_require'],
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('newPassword') ===
                                                value
                                        ) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error(
                                                messages[
                                                    'confirm_password_not_match'
                                                ],
                                            ),
                                        )
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                className="text"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="change-password-content__sub__button">
                    <button
                        className="btn-green"
                        type="primary"
                        htmlType="submit"
                    >
                        Lưu
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default ChangePassword