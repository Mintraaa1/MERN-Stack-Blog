import React from "react";

const Post = ({ postDetail}) => {
  const { title, author, summary, cover, createdAt, id} = postDetail;
  return(
    <div className="card card-side bg-base bg-base-100 shadow-sm">
      <figure>
        <img src={cover} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p> {author} | {createdAt}</p>
        <p> {summary} </p>
        <div className="card-actions justify-end">
          <a href={"post/" + id} className="btn btn-primary">More</a>
        </div>
      </div>
    </div>
  );
};

export default Post;