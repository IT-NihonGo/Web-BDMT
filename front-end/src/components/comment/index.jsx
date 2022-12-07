import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import useAuth from "../../hooks/useAuth";
import likeApi from "../../api/likeApi";
import { getDateTime } from "../../helpers/formatDate";
import RepliedComment from "./replied";
import ReplyingComment from "./replying";
import "./comment.scss";

function Comment({ listComments, comment, handleCreateComment, likesOfComments}) {
    const { user } = useAuth();
    const [showReplying, setShowReplying] = useState(false);
    const [showRepliedComment, setShowRepliedComment] = useState(false);
    const [childComment, setChildComment] = useState()
    const [likeState, setLikeState] = useState(false);
    const [listToolTips, setListToolTips] = useState([]);
    const [numberOfLike, setNumberOfLike] = useState();
    useEffect(() => {
        setChildComment(listComments?.filter((item) => item.parent_id === comment.id))
        const likeUsers = likesOfComments.filter((like) => like.comment_id === comment.id);
        setLikeState(
            likesOfComments.find(
                (like) => like.User.id === user.id && like.comment_id === comment.id
            )
        );
        setListToolTips(
            likeUsers.map((like) => {
                return like.User.name;
            })
        );
        setNumberOfLike(likeUsers.length)
    }, [listComments]);
    const handleCreateLike = async () => {
        const like = {
            comment_id: comment.id,
        };
        await likeApi.createLikeComment(like);

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
    return (
        comment && (
            <div className="comment-container">
                <img
                    className="img-circle"
                    alt=""
                    src={process.env.REACT_APP_API_URL + comment.User?.UserInfo?.avatar}
                />
                <div className="ms-2 col-11">
                    <div className="comment-container__text">
                        <a className="user-name" style={{fontSize: "14px"}} href="/">
                            { comment.User.name}
                        </a>
                        <p>{comment.content}</p>
                        {
                            numberOfLike > 0 &&
                            <Tooltip 
                                title={() => listToolTips.map(item=> 
                                    <>{item}<br/></>
                                )}
                                className="icon-like"
                            >
                                <img
                                    className="img-circle"
                                    style={{ width: "18px", height: "18px" }}
                                    src={require("../../assets/images/like.png")}
                                    alt=""
                                />
                                <span>{numberOfLike}</span>
                            </Tooltip>
                        }
                    </div>
                    <div className="comment-container__reply-action ms-3">
                        <p
                            className={
                                !likeState
                                    ? "position-relative"
                                    : "position-relative txt-blue"
                            }
                            onClick={() =>
                                handleCreateLike()
                            }
                        >
                            Thích
                        </p>
                        <p
                            onClick={() => {
                                setShowReplying(true);
                                setShowRepliedComment(true);
                            }}
                        >
                            Phản hồi
                        </p>
                        <label>{getDateTime(comment.createdAt)}</label>
                    </div>
                    <div className="ms-3">
                        {childComment?.length > 0 && (
                            <>
                                <div className="comment-container__reply">
                                    <div className="me-3 line"> </div>
                                    {showRepliedComment ? (
                                        <span
                                            style={{ fontWeight: "600" }}
                                            onClick={() => {
                                                setShowRepliedComment(
                                                    !showRepliedComment
                                                );
                                            }}
                                        >
                                            Ẩn phản hồi
                                        </span>
                                    ) : (
                                        <span
                                            style={{ fontWeight: "600" }}
                                            onClick={() => {
                                                setShowRepliedComment(
                                                    !showRepliedComment
                                                );
                                            }}
                                        >
                                            {childComment?.length} Phản hồi
                                        </span>
                                    )}
                                </div>
                                {showRepliedComment &&
                                    childComment.map((comment) => (
                                        <RepliedComment
                                            repliedComment={comment}
                                            likesOfComments={likesOfComments}
                                        />
                                    ))}
                            </>
                        )}
                        {showReplying && (
                            <ReplyingComment listComments={listComments} parentComment={comment} handleCreateComment={handleCreateComment}/>
                        )}
                    </div>
                </div>
            </div>
        )
    );
}

export default Comment;
