import React, { useState, useEffect } from "react";
import { Modal, Radio, DatePicker, Form, Input } from "antd";
import { CameraFilled } from "@ant-design/icons";
import moment from "moment";
import { messages } from "../../../assets/lang/messages";
import * as defaultImageUrl from "../../../shared/constants/defaultImageUrl";
import uploadImageApi from "../../../api/uploadImageApi";
import userApi from "../../../api/userApi";
import auth from "../../../api/auth";
import useAuth from "../../../hooks/useAuth";
import * as roles from "../../../shared/constants/role";

import "./add-user.scss";

function AddUser({ isModalOpen, handleOpenModal }) {
    const [selectedImage, setSelectedImage] = useState();
    const [currentUser, setCurrentUser] = useState();
    const onSubmit = async (values) => {
        values.role_id = values.role_id ? values.role_id : 1 
        values.birthday = values.birthday
            ? values.birthday.toDate()
            : null
        updateImage();
        const response = await userApi.createNew( values);
        updateImage(response.data.user.id);
        window.location.reload(false);
    };

    const handleUploadImage = (e) => {
        const userAvatar = document.getElementById("user-avatar");
        userAvatar.src = URL.createObjectURL(e.target.files[0]);
        setSelectedImage(e.target.files[0]);
    };

    const updateImage = async (user_id) => {
        const formData = new FormData();
        if (selectedImage) {
            formData.append("user-avatar", selectedImage);
            await uploadImageApi.uploadUserAvatar(user_id, formData);
        }
    };

    return (
        <Modal
            className="add-user"
            open={isModalOpen}
            footer={null}
            onOk={() => handleOpenModal(false)}
            onCancel={() => {
                setCurrentUser(null);
                handleOpenModal(false);
            }}
        >
            <div className="add-user__avatar">
                <img
                    id="user-avatar"
                    src={defaultImageUrl.USER_AVATAR}
                    alt=""
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImageUrl.USER_AVATAR;
                    }}
                />
                <label for="image-input">
                    <CameraFilled className="add-user__avatar__icon-camera" />
                </label>
                <input
                    id="image-input"
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg"
                    type="file"
                    onChange={handleUploadImage}
                />
            </div>
            <Form className="add-user__content" onFinish={onSubmit}>
                <div className="add-user__content__item">
                    <lable className="col-3">Họ và tên</lable>
                    <Form.Item
                        name="name"
                        className="col-9 mb-0 form-item"
                        rules={[
                            {
                                required: true,
                                message: messages["text_required"],
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div className="add-user__content__item">
                    <lable className="col-3">Email</lable>
                    <Form.Item
                        name="email"
                        className="col-9 mb-0 form-item"
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
                        <Input />
                    </Form.Item>
                </div>
                <div className="add-user__content__item">
                    <lable className="col-3">Role</lable>
                    <Form.Item name="role_id" className="col-9 mb-0">
                        <Radio.Group
                            defaultValue={1}
                        >
                            <Radio value={roles.REVIEWER}>Reviewer</Radio>
                            <Radio value={roles.STORE_OWNER}>Store Owner</Radio>
                            <Radio value={roles.ADMIN}>Admin</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Giới tính</lable>
                    <Form.Item name="gender" className="col-9 mb-0">
                        <Radio.Group defaultValue={true} >
                            <Radio value={false}>Nữ</Radio>
                            <Radio value={true}>Nam</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Ngày sinh</lable>
                    <Form.Item name="birthday" className="col-9 mb-0">
                        <DatePicker className="col-12" format="DD/MM/YYYY" />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Địa chỉ</lable>
                    <Form.Item name="address" className="col-9 mb-0">
                        <Input defaultValue={currentUser?.UserInfo.address} />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Số điện thoại</lable>
                    <Form.Item name="phone_number" className="col-9 mb-0">
                        <Input
                            defaultValue={currentUser?.UserInfo.phone_number}
                        />
                    </Form.Item>
                </div>
                <div className="add-user__content__item">
                    <lable className="col-3">Mật khẩu</lable>
                    <Form.Item
                        name="password"
                        className="col-9 mb-0 form-item"
                        rules={[
                            {
                                required: true,
                                message: messages["text_required"],
                            },
                            {
                                type: "string",
                                min: 6,
                                max: 24,
                                message: messages["invalid_password_length"],
                            },
                        ]}
                    >
                        <Input type="password" />
                    </Form.Item>
                </div>
                <div className="add-user__content__item">
                    <lable className="col-3">Nhập lại</lable>
                    <Form.Item
                        className="col-9 mb-0 form-item"
                        name="comfirm-password"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                                message: messages["text_required"],
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            messages[
                                                "confirm_password_not_match"
                                            ]
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                       <Input type="password" />
                    </Form.Item>
                </div>
                <div className="add-user__content__footer">
                    <button
                        type="button"
                        onClick={() => handleOpenModal(false)}
                    >
                        Thoát
                    </button>
                    <button
                        type="primary"
                        htmlType="submit"
                        className="btn-green"
                    >
                        Lưu
                    </button>
                </div>
            </Form>
        </Modal>
    );
}

export default AddUser;
