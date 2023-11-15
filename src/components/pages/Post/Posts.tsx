import React, { useEffect, useState } from "react";
import { PostCard } from "../../post-card";
import { PostType } from "../../post-card/type";
interface PostsProps {}

const Posts: React.FC<PostsProps> = () => {
  const [posts, setPosts] = useState<PostType[]>();

  const getPost = async () => {
    const response = await fetch("assets/data/postData.json");
    const posts = await response.json();
    return posts;
  };

  useEffect(() => {
    getPost().then((postData) => {
      setPosts(postData);
    });
  }, []);

  return (
    <div className="posts">
      <div className="posts-content">
        <h1>新聞</h1>
        <div className="posts-content-card-wrapper">
          {posts?.map((post) => {
            return <PostCard key={post.id} data={post} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Posts;
