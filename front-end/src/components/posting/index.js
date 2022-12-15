import React, { useState } from "react";
import { Input, Form } from "antd";
import useAuth from "../../hooks/useAuth";
import postApi from "../../api/postApi";
import uploadImageApi from "../../api/uploadImageApi";
import "./posting.scss";

const { TextArea } = Input;
function Posting() {
    const { user } = useAuth();
    const [images, setImages] = useState([]);
    const [showImages, setShowImages] = useState([]);
    const [text, setText] = useState("");
    const handleUploadImage = (e) => {
        var listsShowImage = showImages.slice();
        listsShowImage.push(URL.createObjectURL(e.target.files[0]));
        var listsImages = images.slice();
        listsImages.push(e.target.files[0]);
        setImages(listsImages);
        setShowImages(listsShowImage);
    };
    const updateImage = (post_id) => {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append("post-img", images[i]);
        }
        uploadImageApi.uploadPostImage(post_id, formData).then(() => {});
    };
    const handleSubmit = async () => {
        const newPost = {
            user_id: user.id,
            content: text,
        };
        if( text !== "" || images.length > 0 ){
            const response = await postApi.createNew(newPost);
            if (response.status === 201) {
                updateImage(response.data.post.id);
                window.location.reload(false)
            }
        }
    };
    return (
        <Form className="posting-container" onFinish={handleSubmit}>
            <div className="posting-container__top">
                <img
                    src={process.env.REACT_APP_API_URL + user.UserInfo.avatar}
                    alt=""
                />
                <Form.Item name="text" style={{ width: "100%" }}>
                    <TextArea
                        placeholder="Bạn đang nghĩ gì ?"
                        name="text"
                        autoSize={{ minRows: 1, maxRows: 15 }}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <label className="icon-image" for="image-input">
                        <img
                            src={require("../../assets/images/icon-image.png")}
                            alt=""
                        />
                    </label>
                </Form.Item>
            </div>
            <div
                className={
                    showImages.length !== 0
                        ? "posting-container__list-image"
                        : ""
                }
            >
                {showImages.map((image) => (
                    <img className="image" src={image} alt="" />
                ))}
            </div>

            <input
                id="image-input"
                style={{ display: "none" }}
                accept="image/png, image/jpeg"
                type="file"
                name="123"
                onChange={handleUploadImage}
            />
            <button type="submit" className="btn-green">
                Đăng bài
            </button>
        </Form>
    );
}
export default Posting;
