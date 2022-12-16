import React, { useState, useRef, useEffect } from "react";
import { Carousel, Input, Tooltip } from "antd";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { getDateTime } from "../../../helpers/formatDate";
import useAuth from "../../../hooks/useAuth";
import postApi from "../../../api/postApi";
import * as postStatus from "../../../shared/constants/postStatus";
import "./approve-post.scss";
import Layout from "../../../components/layout";
function ApprovePost() {
    const slider = useRef();
    const { user } = useAuth();
    const [listPosts, setListPosts] = useState([]);
    useEffect(() => {
        postApi.getListByStatus(postStatus.PENDING).then((response) => {
            setListPosts(
                response.data.map((post) => ({
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    images: post.images,
                    createdAt: post.createdAt,
                    User: {
                        name: post.User.name,
                        id: post.User.id,
                        UserInfo: {
                            avatar: post.User.UserInfo.avatar,
                        },
                    },
                }))
            );
        });
    }, []);
    const handleApprovePost = async (postId, status) => {
        const post ={
            status: status
        }
        const response = await postApi.approve(postId, post)
        if(response.status === 200){
            alert(response.data.message);
            setListPosts(listPosts.filter(post => post.id !== postId))
        }
    }
    return (
        <Layout>
            <div className="col-6 mx-auto">
                {listPosts.length > 0 &&
                    listPosts.map((post) => (
                        <div className="approve-post-container">
                            <div className="approve-post-content">
                                <div className="mx-3">
                                    <div className="d-flex align-items-center">
                                        <div className="shape-circle">
                                            <img
                                                className="img-circle"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                                alt=""
                                                src={
                                                    process.env
                                                        .REACT_APP_API_URL +
                                                    post.User.UserInfo?.avatar
                                                }
                                            />
                                        </div>
                                        <div className="ms-3">
                                            <a className="user-name" href="/">
                                                {post.User.name}
                                            </a>
                                            <br />
                                            <span>
                                                {getDateTime(post.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="mt-2">{post.content}</p>
                                </div>
                                <div className="position-relative">
                                    {post.images?.length > 0 && (
                                        <Carousel
                                            className="approve-post-container__list-images"
                                            ref={(ref) => {
                                                slider.current = ref;
                                            }}
                                        >
                                            {post.images.map((image) => (
                                                <img
                                                    alt=""
                                                    src={
                                                        process.env
                                                            .REACT_APP_API_URL +
                                                        image
                                                    }
                                                />
                                            ))}
                                        </Carousel>
                                    )}
                                    {post.images.length > 1 && (
                                        <>
                                            <div
                                                className="approve-post-container__list-images__btn-prev"
                                                onClick={() =>
                                                    slider.current.prev()
                                                }
                                            >
                                                <img
                                                    alt=""
                                                    src={require("../../../assets/images/btn-prev.png")}
                                                />
                                            </div>
                                            <div
                                                className="approve-post-container__list-images__btn-next"
                                                onClick={() =>
                                                    slider.current.next()
                                                }
                                            >
                                                <img
                                                    alt=""
                                                    src={require("../../../assets/images/btn-next.png")}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="approve-post-container__bottom">
                                <button className="btn-red" onClick={() => handleApprovePost(post.id, postStatus.REJECTED)}>
                                    <CloseIcon className="icon" />
                                    Xóa
                                </button>

                                <button className="btn-green" onClick={() => handleApprovePost(post.id, postStatus.APPROVED)}>
                                    <DoneIcon className="icon" />
                                    Phê duyệt
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            {
                listPosts.length <= 0 &&
                <h4 className="mt-4" style={{textAlign: "center"}}>No posts need to be approved!</h4>
            } 
        </Layout>
    );
}

export default ApprovePost;
