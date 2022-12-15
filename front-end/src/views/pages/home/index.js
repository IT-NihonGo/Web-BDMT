import { useState, useEffect } from "react";
import Layout from "../../../components/layout";
import Post from "../../../components/post";
import Posting from "../../../components/posting";
import postApi from "../../../api/postApi";
import likeApi from "../../../api/likeApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "antd/dist/antd.css";
import commentApi from "../../../api/commentApi";

export const Home = () => {
    const [listPosts, setListPost] = useState([]);
    const [likesOfPosts, setLikesOfPosts] = useState();
    const [likesOfComments, setLikesOfComments] = useState();
    const [listComments, setListComments] = useState();
    useEffect(() => {
        postApi.getAll().then((response) => {
            setListPost(
                response.data.rows.map((post) => ({
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
        likeApi.getLikesOfPosts().then((response) => {
            setLikesOfPosts(
                response.data.map((like) => ({
                    id: like.id,
                    post_id: like.post_id,
                    comment_id: like.comment_id,
                    User: {
                        name: like.User.name,
                        id: like.User.id,
                    },
                }))
            );
        });
        likeApi.getLikesOfComments().then((response) => {
            setLikesOfComments(
                response.data.map((like) => ({
                    id: like.id,
                    post_id: like.post_id,
                    comment_id: like.comment_id,
                    User: {
                        name: like.User.name,
                        id: like.User.id,
                    },
                }))
            );
        });
        handleGetAllComment();
    }, []);
    const handleGetAllComment = () => {
        commentApi.getAllComments().then((response) => {
            setListComments(
                response.data.map((comment) => ({
                    id: comment.id,
                    post_id: comment.post_id,
                    parent_id: comment.parent_id,
                    content: comment.content,
                    createdAt: comment.createdAt,
                    User: {
                        name: comment.User.name,
                        id: comment.User.id,
                        UserInfo: {
                            avatar: comment.User.UserInfo.avatar,
                        },
                    },
                }))
            );
        });
    };
    console.log(listPosts);
    return (
        <Layout>
            <div className="home-container__posts col-6 mx-auto">
                <Posting />
                {listPosts.map(
                    (post) =>
                        likesOfPosts &&
                        listComments &&
                        listComments && (
                            <Post
                                post={post}
                                likesOfPosts={likesOfPosts}
                                likesOfComments={likesOfComments}
                                listComments={listComments}
                                handleGetAllComment={handleGetAllComment}
                            />
                        )
                )}
            </div>
        </Layout>
    );
};
