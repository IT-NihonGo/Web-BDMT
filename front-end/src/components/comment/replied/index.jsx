import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import { getDateTime } from "../../../helpers/formatDate";
import likeApi from "../../../api/likeApi";
import useAuth from "../../../hooks/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./replied-comment.scss";

function RepliedComment({ listComments, repliedComment, likesOfComments }) {
    const { user } = useAuth();
    const [likeState, setLikeState] = useState(false);
    const [listToolTips, setListToolTips] = useState([]);
    const [numberOfLike, setNumberOfLike] = useState();
    useEffect(() => {
        const likeUsers = likesOfComments.filter(
            (like) => like.comment_id === repliedComment.id
        );
        setLikeState(
            likesOfComments.find(
                (like) =>
                    like.User.id === user.id && like.comment_id === repliedComment.id
            )
        );
        setListToolTips(
            likeUsers.map((like) => {
                return like.User.name;
            })
        );
        setNumberOfLike(likeUsers.length);
    }, [listComments]);
    const handleCreateLike = async () => {
        const like = {
            comment_id: repliedComment.id,
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
        <div className="reply-comment-container">
            <img
                className="img-circle"
                alt=""
                style={{ width: "30px", height: "30px" }}
                src={
                    process.env.REACT_APP_API_URL +
                    repliedComment.User?.UserInfo?.avatar
                }
            />
            <div className="ms-2">
                <div className="reply-comment-container__text">
                    <a className="user-name" href="/">
                        {repliedComment.User.name}
                    </a>
                    <p>{repliedComment.content}</p>
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
                            className="icon-like"
                        >
                            <img
                                className="img-circle"
                                style={{ width: "18px", height: "18px" }}
                                src={require("../../../assets/images/like.png")}
                                alt=""
                            />
                            <span>{numberOfLike}</span>
                        </Tooltip>
                    )}
                </div>
                <div className="reply-comment-container__reply-action ms-3">
                    <p
                        className={
                            !likeState
                                ? "position-relative"
                                : "position-relative txt-blue"
                        }
                        onClick={() => handleCreateLike()}
                    >
                        Thích
                    </p>
                    <label>{getDateTime(repliedComment.createdAt)}</label>
                </div>
            </div>
        </div>
    );
}

export default RepliedComment;
