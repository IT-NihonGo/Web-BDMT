import React, { useState, useEffect } from "react";
import { Modal, Radio, DatePicker, Form, Input } from "antd";
import { CameraFilled } from "@ant-design/icons";
import moment from "moment";
import * as defaultImageUrl from "../../../shared/constants/defaultImageUrl";
import uploadImageApi from "../../../api/uploadImageApi";
import userApi from "../../../api/userApi";
import auth from "../../../api/auth";
import useAuth from "../../../hooks/useAuth";

import "./edit-profile.scss";

function EditProfile({ editUser, isModalOpen, handleOpenModal }) {
    const { user, setUser } = useAuth();
    const [selectedImage, setSelectedImage] = useState();
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        if(editUser)
            setCurrentUser(editUser);
        else setCurrentUser(user);
    }, [isModalOpen]);


    console.log("@@@@", editUser)

    const onSubmit = async (values) => {
        values.birthday = values.birthday
            ? values.birthday.toDate()
            : currentUser?.UserInfo.birthday;
        updateImage();
        await userApi.updateById(currentUser?.id, values);
        const response = await auth.getAuthenticatedUser();
        window.location.reload(false);
    };

    const handleUploadImage = (e) => {
        const userAvatar = document.getElementById("user-avatar");
        userAvatar.src = URL.createObjectURL(e.target.files[0]);
        setSelectedImage(e.target.files[0]);
    };

    const updateImage = async () => {
        const formData = new FormData();
        if (selectedImage) {
            formData.append("user-avatar", selectedImage);
            await uploadImageApi.uploadUserAvatar(currentUser?.id, formData);
        }
    };

    return (
        <Modal
            className="edit-profile"
            open={isModalOpen}
            footer={null}
            onOk={() => handleOpenModal(false)}
            onCancel={() => {
                setCurrentUser(null);
                handleOpenModal(false);
            }}
        >
            <div className="edit-profile__avatar">
                <img
                    id="user-avatar"
                    src={process.env.REACT_APP_API_URL + currentUser?.UserInfo.avatar}
                    alt=""
                    onError={(e)=>{
                        e.target.onerror = null; 
                        e.target.src=defaultImageUrl.USER_AVATAR
                    }}
                />
                <label for="image-input">
                    <CameraFilled className="edit-profile__avatar__icon-camera" />
                </label>
                <input
                    id="image-input"
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg"
                    type="file"
                    onChange={handleUploadImage}
                />
            </div>
            <Form
                className="edit-profile__content"
                onFinish={onSubmit}
                fields={[
                    {
                        name: "name",
                        value: currentUser?.name,
                    },
                    {
                        name: "gender",
                        value: currentUser?.UserInfo.gender,
                    },
                    {
                        name: "birthday",
                        value: moment(
                            new Date(currentUser?.UserInfo.birthday),
                            "YYYY/MM/DD"
                        ),
                    },
                    {
                        name: "address",
                        value: currentUser?.UserInfo.address,
                    },
                    {
                        name: "phone_number",
                        value: currentUser?.UserInfo.phone_number,
                    },
                ]}
            >
                <div className="edit-profile__content__item">
                    <lable className="col-3">Họ và tên</lable>
                    <div className="col-1"></div>
                    <Form.Item name="name" className="col-8 mb-0">
                        <Input value={currentUser?.name} />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Giới tính</lable>
                    <div className="col-1"></div>
                    <Form.Item name="gender" className="col-8 mb-0">
                        <Radio.Group defaultValue={!currentUser?.UserInfo.gender} >
                            <Radio value={false}>Nữ</Radio>
                            <Radio value={true}>Nam</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Ngày sinh</lable>
                    <div className="col-1"></div>
                    <Form.Item name="birthday" className="col-8 mb-0">
                        <DatePicker className="col-12" format="DD/MM/YYYY" />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Địa chỉ</lable>
                    <div className="col-1"></div>
                    <Form.Item name="address" className="col-8 mb-0">
                        <Input defaultValue={currentUser?.UserInfo.address} />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__item">
                    <lable className="col-3">Số điện thoại</lable>
                    <div className="col-1"></div>
                    <Form.Item name="phone_number" className="col-8 mb-0">
                        <Input
                            defaultValue={currentUser?.UserInfo.phone_number}
                        />
                    </Form.Item>
                </div>
                <div className="edit-profile__content__footer">
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

export default EditProfile;
