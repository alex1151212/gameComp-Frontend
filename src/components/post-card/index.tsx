import React from "react";
import { PostType } from "./type";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  data: PostType;
}
const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="post-card"
      onClick={() => {
        navigate("/posts/detail/" + data.id);
      }}
    >
      <div className="post-card-left-wrapper">
        <h1>{dayjs(data.createdAt).format("DD")}</h1>
        <p>{dayjs(data.createdAt).format("MMM")}</p>
      </div>
      <div className="post-card-right">
        <h2 className="post-card-right-type">
          [<span>{data.type}</span>]
        </h2>
        <h2 className="post-card-right-content">{data.title}</h2>
      </div>
      <div className="post-card-mask"></div>
    </div>
  );
};

export { PostCard };
