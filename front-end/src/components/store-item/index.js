import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MoodIcon from "@mui/icons-material/Mood";
import { Modal, Rate } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Carousel, Input, Tooltip } from "antd";
import { listPostsImages } from "../../utils";
import "./store-item.scss";
import storeApi from "../../api/storeApi";

const StoreItem = ({ store }) => {
    const slider = useRef();
    const [showModalRating, setShowModalRating] = useState(false);
    const handleRateStore = async (value) => {
        try {
            const rate = {
                amount: value,
                store_id: store.id,
            }
            const response = await storeApi.ratingStore(rate)
            alert(response.data.message)
            window.location.reload(false)
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
        <div className="store-container">
            <div className="store-content">
                <div className="mx-5 mb-3">
                        <h2 className="mb-4">{store.name}</h2>
                        <div className="store-info">
                            <LocationOnIcon className="icon" />
                            {store.address}
                        </div>
                        <div className="store-info icon-name">
                            <PersonIcon className="icon" />
                            {store.User.name}
                        </div>
                        <div className="store-info">
                            <EmailIcon className="icon" />
                            {store.User.email}
                        </div>
                        {
                            store.User.UserInfo.phone_number &&
                            <div className="store-info">
                                <PhoneIcon className="icon" />
                                {store.User.UserInfo.phone_number}
                            </div>
                        }
                        <div className="store-info">
                            <span onClick={() => setShowModalRating(true)}>
                                <Rate allowHalf defaultValue={store.rate_amount} />
                            </span>
                            {"  "}{store.rate_amount}/5.0
                        </div>
                </div>
                <div className="position-relative">
                    <Carousel
                        className="store-container__list-images"
                        ref={(ref) => {
                            slider.current = ref;
                        }}
                    >
                        {listPostsImages.map((image) => (
                            <img alt="" src={image} />
                        ))}
                    </Carousel>
                    <div
                        className="store-container__list-images__btn-prev"
                        onClick={() => slider.current.prev()}
                    >
                        <img
                            alt=""
                            src={require("../../assets/images/btn-prev.png")}
                        />
                    </div>
                    <div
                        className="store-container__list-images__btn-next"
                        onClick={() => slider.current.next()}
                    >
                        <img
                            alt=""
                            src={require("../../assets/images/btn-next.png")}
                        />
                    </div>
                </div>
            </div>
            <Modal
                className="rate-modal"
                visible={showModalRating}
                onCancel={() => setShowModalRating(false)}
                footer={null}
            >
                <MoodIcon style={{ fontSize: "70px", color: "#fadb14" }} />
                <p className="mt-2 mb-4">Vui lòng đánh giá cửa hàng</p>
                <Rate className="icon" onChange={(value) => handleRateStore(value)}></Rate>
            </Modal>
        </div>
    );
};
export default StoreItem;
