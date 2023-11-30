import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PostType } from "../../post-card/type";
interface PostDetailProps {}

const PostDetail: React.FC<PostDetailProps> = () => {
  const [param] = useSearchParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostType>();

  const getPost = async (id: number) => {
    const response = await fetch("assets/data/postData.json");
    const posts = await response.json();
    const post = posts.find((post: PostType) => post.id === id);
    return post;
  };

  useEffect(() => {
    const postId = param.get("postId");

    if (postId)
      getPost(Number(postId)).then((postData) => {
        setPost(postData);
      });
  }, []);

  return (
    <div className="posts-detail">
      <div className="posts-detail-content">
        <div className="posts-detail-content-breadcrumb">
          <span
            className="posts-detail-content-breadcrumb-pre"
            onClick={() => {
              navigate("/posts");
            }}
          >
            新聞
          </span>
          <span> - </span>
          <span className="posts-detail-content-breadcrumb-current">
            {post?.title}
          </span>
        </div>
        <div className="posts-detail-content-body">
          <h1 className="posts-detail-content-body-title">{post?.title}</h1>
          <div className="posts-detail-content-body-content">
            {post?.content}
          </div>
          <div className="posts-detail-content-body-linklist">
            {post &&
              post?.link?.map((link) => (
                <a key={link.url} href={link.url} target="_blank">
                  {link.title}
                </a>
              ))}
          </div>
          <div className="posts-detail-content-body-imglist">
            {post?.imgSrc.map((img, index) => (
              <div className="posts-detail-content-body-imglist-item">
                <img key={index} src={img} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostDetail;
