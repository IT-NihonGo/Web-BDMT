import React, {useState} from "react";
import useAuth from "../../../hooks/useAuth";
import { Input } from "antd";
import "./replying-comment.scss";

const { TextArea } = Input;
function ReplyingComment({parentComment, handleCreateComment }) {
    const [commentText, setCommentText] = useState("");
    const { user } = useAuth();
    const handleEnter = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            if (commentText !== "") {
                const newComment = {
                    post_id: parentComment.post_id,
                    parent_id: parentComment.id,
                    content: commentText,
                };
                handleCreateComment(newComment);
                setCommentText("");
            }
        }
    };
    return (
        <div className="replying-comment">
            <img className="img-circle" alt=""src={process.env.REACT_APP_API_URL + user.UserInfo.avatar} />
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
    );
}

export default ReplyingComment;
