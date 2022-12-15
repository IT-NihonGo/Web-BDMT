import React, { useState, useRef, useEffect } from "react";
import { Carousel, Input, Tooltip } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { listPostsImages } from "../../utils";
import { getDateTime } from "../../helpers/formatDate";
import likeApi from "../../api/likeApi";
import useAuth from "../../hooks/useAuth";
import Comment from "../../components/comment";
import "./post.scss";
import commentApi from "../../api/commentApi";
const { TextArea } = Input;
function Post({
    post,
    likesOfPosts,
    likesOfComments,
    listComments,
    handleGetAllComment,
}) {
    const slider = useRef();
    const { user } = useAuth();
    const [showComment, setShowComment] = useState(false);
    const [likeState, setLikeState] = useState(false);
    const [numberOfLike, setNumberOfLike] = useState();
    const [listToolTips, setListToolTips] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [numberOfComment, setNumberOfComment] = useState();
    const [limitComments, setLimitComments] = useState();
    const [comments, setComments] = useState();
    const [limit, setLimit] = useState(5);
    useEffect(() => {
        const likeUsers = likesOfPosts.filter(
            (like) => like.post_id === post.id
        );
        setLikeState(
            likesOfPosts.find(
                (like) => like.User.id === user.id && like.post_id === post.id
            )
        );
        setNumberOfLike(likeUsers.length);
        setListToolTips(
            likeUsers.map((like) => {
                return like.User.name;
            })
        );
        const commentUsers = listComments.filter(
            (comment) => comment.post_id === post.id
        );
        setComments(commentUsers);
        setNumberOfComment(commentUsers.length);
    }, []);

    useEffect(() => {
        const commentUsers = listComments.filter(
            (comment) => comment.post_id === post.id
        );
        setComments(commentUsers);
        setLimitComments(
            commentUsers
                ?.filter((comment) => comment.parent_id === null)
                .slice(0, limit)
        );
    }, [limit, listComments]);

    const handleCreateLike = async () => {
        const like = {
            post_id: post.id,
        };
        await likeApi.createLikePost(like);

        setLikeState(!likeState);
        if (likeState) {
            setNumberOfLike(numberOfLike - 1);
            setListToolTips(
                listToolTips.filter((like) => like.user._id !== user.id)
            );
        } else {
            setNumberOfLike(numberOfLike + 1);
            setListToolTips((listToolTips) => [...listToolTips, user.name]);
        }
    };

    const handleEnter = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            if (commentText !== "") {
                const newComment = {
                    post_id: post.id,
                    content: commentText,
                };
                handleCreateComment(newComment);
                setCommentText("");
            }
        }
    };
    const handleCreateComment = async (data) => {
        const comment = {
            post_id: data.post_id,
            content: data.content,
            parent_id: data.parent_id,
        };
        await commentApi.createComment(comment);
        setShowComment(true);
        handleGetAllComment();
        setNumberOfComment(numberOfComment + 1);
    };
    return (
        <div className="post-container">
            <div className="post-content">
                <div className="mx-3">
                    <div className="d-flex align-items-center">
                        <div className="shape-circle">
                            <img
                                className="img-circle"
                                style={{ width: "50px", height: "50px" }}
                                alt=""
                                src={
                                    process.env.REACT_APP_API_URL +
                                    post.User.UserInfo?.avatar
                                }
                            />
                        </div>
                        <div className="ms-3">
                            <a className="user-name" href="/">
                                {post.User.name}
                            </a>
                            <br />
                            <span>{getDateTime(post.createdAt)}</span>
                        </div>
                    </div>
                    <p className="mt-2">{post.content}</p>
                </div>
                <div className="position-relative">
                    {post.images?.length > 0 && (
                        <Carousel
                            className="post-container__list-images"
                            ref={(ref) => {
                                slider.current = ref;
                            }}
                        >
                            {post.images.map((image) => (
                                <img
                                    alt=""
                                    src={process.env.REACT_APP_API_URL + image}
                                />
                            ))}
                        </Carousel>
                    )}
                    {post.images?.length > 1 && (
                        <>
                            <div
                                className="post-container__list-images__btn-prev"
                                onClick={() => slider.current.prev()}
                            >
                                <img
                                    alt=""
                                    src={require("../../assets/images/btn-prev.png")}
                                />
                            </div>
                            <div
                                className="post-container__list-images__btn-next"
                                onClick={() => slider.current.next()}
                            >
                                <img
                                    alt=""
                                    src={require("../../assets/images/btn-next.png")}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className="post-container__bottom mx-3 mt-2">
                    <div className="d-flex align-item-center">
                        {numberOfLike > 0 && (
                            <Tooltip
                                title={() =>
                                    listToolTips.map((item) => (
                                        <>
                                            {item}
                                            <br />
                                        </>
                                    ))
                                }
                                style={{
                                    cursor: "pointer",
                                    whiteSpace: "pre-wrap",
                                }}
                                className="underline"
                            >
                                <img
                                    className="img-circle"
                                    style={{ width: "20px" }}
                                    src={require("../../assets/images/like.png")}
                                    alt=""
                                />
                                <span className="ms-2">{numberOfLike}</span>
                            </Tooltip>
                        )}
                        {numberOfComment > 0 && (
                            <div className="ms-auto underline">
                                <span
                                    onClick={() => setShowComment(!showComment)}
                                >
                                    {numberOfComment} bình luận
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="post-container__bottom__action">
                        <div
                            className={
                                !likeState
                                    ? "col-4 d-flex justify-content-center"
                                    : "col-4 d-flex justify-content-center txt-blue"
                            }
                            onClick={() => handleCreateLike()}
                        >
                            {likeState ? (
                                <LikeFilled className="icon" />
                            ) : (
                                <LikeOutlined className="icon" />
                            )}

                            <p>Thích</p>
                        </div>
                        <div
                            className="col-4"
                            onClick={() => setShowComment(true)}
                        >
                            <p>Bình luận</p>
                        </div>
                        <div className="col-4">
                            <p>Chia sẻ</p>
                        </div>
                    </div>
                    <div className="post-container__bottom__comment col-12">
                        <img
                            className="img-circle"
                            alt=""
                            src={
                                process.env.REACT_APP_API_URL +
                                post.User.UserInfo.avatar
                            }
                        />
                        <div className="comment">
                            <TextArea
                                className="textarea"
                                name="text"
                                placeholder="Viết bình luận..."
                                autoSize={{ maxRows: 5 }}
                                onChange={(e) => {
                                    setCommentText(e.target.value);
                                }}
                                value={commentText}
                                onKeyDown={(e) => handleEnter(e)}
                            />
                        </div>
                    </div>
                    {showComment &&
                        limitComments?.length > 0 &&
                        limitComments.map((comment, index) => (
                            <Comment
                                listComments={listComments}
                                comment={comment}
                                handleCreateComment={handleCreateComment}
                                likesOfComments={likesOfComments}
                            />
                        ))}
                    {limit < comments?.length && showComment && (
                        <p
                            className="more-comment"
                            onClick={() => setLimit((prev) => prev + 5)}
                        >
                            Xem thêm bình luận
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Post;
