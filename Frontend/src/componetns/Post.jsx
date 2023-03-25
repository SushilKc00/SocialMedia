import React, { useState } from "react";
import { Button, Modal } from "antd";
import { NavLink } from "react-router-dom";
import { FaUserCircle, FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import styled from "styled-components";
const userId = JSON.parse(localStorage.getItem("User"));
export const Post = ({
  desc,
  postby,
  image,
  postid,
  likes,
  like,
  unlike,
  handleComment,
  postcomment,
  index,
}) => {
  const [comment, setComment] = useState("");
  const [showLike, setShowLike] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Wrapper>
      <div className="postarea">
        <NavLink
          className="imageicon"
          to={
            postby._id === JSON.parse(localStorage.getItem("User"))
              ? `/profile`
              : `/profile/${postby._id}`
          }
        >
          {postby.profile === "no pic" ? (
            <FaUserCircle className="profileicon" />
          ) : (
            <img src={postby.profile} alt="user" />
          )}
          <h2>{postby.name}</h2>
        </NavLink>
        <p>{desc}</p>
        <figure>
          <img src={image} alt="post" />
        </figure>
        <div>
          <div className="like">
            {likes.includes(userId) ? (
              <p className="likeicon">
                <FcLike
                  onClick={() => {
                    unlike(postid);
                  }}
                  size={25}
                />
              </p>
            ) : (
              <p className="likeicon">
                <FaRegHeart
                  size={20}
                  onClick={() => {
                    like(postid);
                  }}
                />
              </p>
            )}
            {likes.length > 0 && (
              <p className="likeicon"> {likes.length + "Likes"}</p>
            )}
          </div>
          <form
            onSubmit={(e) => {
              handleComment(postid, e, comment, setComment);
            }}
          >
            <div className="commentsection">
              <input
                type="text"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                value={comment}
                className="commentfield"
                placeholder="Comment"
              />
              <button type="submit">comment</button>
              <div className="commentarea">
                {postcomment.map((comment, index) => {
                  return (
                    <div className="showcomment" key={index}>
                      <h3>{comment.postedby.name}</h3>
                      <span>{comment.comment}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <p
              className="morecomment"
              onClick={showModal}
              style={{ fontSize: "1.2rem" }}
            >
              more comments
            </p>
          </form>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {postcomment.map((comment, index) => {
          return (
            <div className="showcomment" key={index}>
              <h3>{comment.postedby.name}</h3>
              <span>{comment.comment}</span>
            </div>
          );
        })}
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .postarea {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 1rem;
    border-radius: 5px;
    width: 98%;
    margin: auto;
  }
  figure {
    padding: 1rem;
  }
  img {
    width: 100%;
  }
  p {
    font-size: 1.4rem;
    margin-top: 1rem;
  }
  .imageicon {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: #0e0d0dd5;
  }
  .imageicon img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .profileicon {
    font-size: 4rem;
  }
  .like {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .likeicon {
    display: flex;
    align-items: center;
    font-weight: 700;
    margin-left: 0.5rem;
  }
  .commentfield {
    padding: 1rem 2rem;
    border-radius: 15px;
    border: 1px solid #44bf78;
    margin-top: 1rem;
  }
  .commentsection {
    position: relative;
  }
  .commentarea {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem auto;
    width: 95%;
    height: 45px;
    overflow: hidden;
  }
  .showcomment {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .showcomment h3 {
    font-size: 1.4rem;
    text-transform: capitalize;
  }
  span {
    font-size: 1.4rem;
    background-color: #e8ede9;
    border-radius: 4px;
    padding: 0.2rem 1rem;
  }
  button {
    position: absolute;
    right: 1rem;
    top: 1.5rem;
  }
  .morecomment {
    cursor: pointer;
  }
  @media screen and (max-width: 576px) {
    .postarea {
      width: 95%;
    }
  }
`;
