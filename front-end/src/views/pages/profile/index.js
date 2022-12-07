import React, { useState } from "react";
import Layout from "../../../components/layout";
import Info from "../../../components/info"
import ChangePassword from "../../../components/change-password";
import EditProfile from "../../../components/modal/edit-profile";
import useAuth from "../../../hooks/useAuth";
import * as defaultImageUrl from "../../../shared/constants/defaultImageUrl"
import "./profile.scss";
const INFO_TAB = 1;
const POST_TAB = 2;
const CHANGE_PASSWORD_TAB = 3;
function Profile() {
    const {user} = useAuth()
    const [tab, setTab] = useState(INFO_TAB);
    const [isModalOpen, setisModalOpen] = useState(false);
    const handleOpenModal = (state) => {
        setisModalOpen(state);
    };
    return (
        <Layout>
            <div className="profile-container col-9">
                <div className="profile-container__top">
                    <img 
                        src={process.env.REACT_APP_API_URL+user?.UserInfo?.avatar} 
                        alt=""
                        onError={(e)=>{
                            e.target.onerror = null; 
                            e.target.src=defaultImageUrl.USER_AVATAR
                        }}  
                    />
                    <div className="mt-auto ms-4">
                        <h2>{user.name}</h2>
                        <div className="button">
                            <button className="btn-green" onClick={() => handleOpenModal(true)}>Chỉnh sửa</button> 
                        </div>
                        <EditProfile
                            isModalOpen={isModalOpen}
                            handleOpenModal={handleOpenModal}
                        />
                    </div>
                </div>
                <div className="line"></div> 
                <div className="profile-container__content">
                    <div className="profile-container__content__tab col-3">
                        <button
                            className={tab === INFO_TAB && "active"}
                            onClick={() => setTab(INFO_TAB)}
                        >
                            Thông tin
                        </button>
                        <button
                            className={tab === POST_TAB && "active"}
                            onClick={() => setTab(POST_TAB)}
                        >
                            Bài viết
                        </button>
                        <button
                            className={tab === CHANGE_PASSWORD_TAB && "active"}
                            onClick={() => setTab(CHANGE_PASSWORD_TAB)}
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                    <div className="col-9 mb-5">
                        {/* {tab === POST_TAB &&
                            listPosts.length>0 &&
                            listPosts.filter((post) => post.user._id === userId)
                                .map((post) => <Post post={post} />)} */}
                        {tab === INFO_TAB && <Info/>}
                        {tab === CHANGE_PASSWORD_TAB && <ChangePassword/>}
                            
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default Profile
