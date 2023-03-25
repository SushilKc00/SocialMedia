import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Post } from "./Post";
import { FaPhotoVideo, FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export const Feed = () => {
  const [user, setUser] = useState([]);
  const Navigate = useNavigate();
  const inputRef = useRef("");
  const [spin, setSpin] = useState(false);
  const [newPost, setNewPOst] = useState(false);
  const [profile, setProfile] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const getAllPost = async () => {
    try {
      const { data } = await axios.get(
        `/api/post/getpost/${localStorage.getItem("socialtoken")}`
      );
      if (!data.success) {
        Navigate("/");
      }
      const adminPost = data.adminPost;
      const userPost = data.userPost;
      setUser([...user, ...adminPost, ...userPost]);
    } catch (error) {
      throw new error();
    }
  };

  const getProfile = async () => {
    const res = await axios.get(
      `/api/user/myprofile/${localStorage.getItem("socialtoken")}`
    );
    if (res.data.userDetails.profile !== "no pic") {
      setProfile(true);
    }
    setUserImage(res.data.userDetails.profile);
  };

  useEffect(() => {
    getProfile();
    getAllPost();
  }, []);

  const like = async (postid) => {
    const { data } = await axios.put(
      `/api/post/like/${localStorage.getItem("socialtoken")}`,
      { postid }
    );
    const newdata = user.map((post) => {
      if (post._id == data.result._id) {
        return data.result;
      } else {
        return post;
      }
    });
    setUser([...newdata]);
  };

  const unlike = async (postid) => {
    const { data } = await axios.put(
      `/api/post/unlike/${localStorage.getItem("socialtoken")}`,
      { postid }
    );
    const newdata = user.map((post) => {
      if (post._id == data.result._id) {
        return data.result;
      } else {
        return post;
      }
    });
    setUser([...newdata]);
  };

  const handleComment = async (postid, e, comment, setComment) => {
    setComment("");
    e.preventDefault();
    const { data } = await axios.put(
      `/api/post/comment/${localStorage.getItem("socialtoken")}`,
      { postid, comment }
    );
    const newdata = user.map((post) => {
      if (post._id == data.result._id) {
        return data.result;
      } else {
        return post;
      }
    });
    setUser([...newdata]);
  };

  const handleClick = async (e) => {
    setSpin(true);
    const datas = new FormData();
    datas.append("file", image);
    datas.append("upload_preset", "sushil");
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dwm6lgmsc/image/upload",
      datas
    );
    const res = await axios.post("http://localhost:5000/api/post/createpost", {
      desc,
      image: data.secure_url,
      postby: localStorage.getItem("socialtoken"),
    });
    if (res.data.success) {
      setSpin(false);
      setNewPOst(true);
    }
  };
  if (newPost) {
    return <Feed />;
  }
  return (
    <>
      <Wrapper>
        <div className="postsection">
          <div className="status">
            <NavLink to="/profile">
              {profile ? (
                <img src={userImage} alt="user" className="userimage" />
              ) : (
                <FaUserCircle className="profileicon" />
              )}
            </NavLink>
            <input
              type="text"
              placeholder="what's on you mind"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
          <hr />
          <input
            type="file"
            name="file"
            ref={inputRef}
            hidden
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <div className="createpost">
            <h4
              onClick={() => {
                inputRef.current.click();
              }}
            >
              <FaPhotoVideo className="icon" />
              Photo video
            </h4>
            <button onClick={handleClick}>
              Share {spin && <LoadingOutlined />}
            </button>
          </div>
        </div>
        {user
          .sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          .map((post, index) => {
            return (
              <Post
                like={like}
                unlike={unlike}
                handleComment={handleComment}
                desc={post.desc}
                postby={post.postby}
                postid={post._id}
                image={post.image}
                likes={post.likes}
                postcomment={post.comments}
                key={index}
                index={index}
              />
            );
          })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  flex: 3;
  height: 90vh;
  overflow-y: auto;
  margin-top: 1.4rem;
  ::-webkit-scrollbar {
    width: 4px;
  }
  .postsection {
    display: flex;
    flex-direction: column;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    border-radius: 6px;
    min-height: 15rem;
    border: 1px solid rgba(24, 21, 51, 0.238);
    padding: 0 1rem;
    width: 95%;
    margin: auto;
  }
  hr {
    width: 90%;
    margin: 1rem auto;
  }
  .status {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  input {
    outline: none;
    border: none;
    width: 100%;
    padding: 2rem 1.8rem;
    background-color: inherit;
  }
  .createpost {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  h4 {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    cursor: pointer;
  }
  .icon {
    color: red;
    font-size: 2rem;
  }
  button {
    padding: 0.4rem 1rem;
    background-color: #44bf78;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 1.5rem;
  }
  .userimage {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .profileicon {
    font-size: 2rem;
  }
  @media screen and (max-width: 576px) {
    .postsection {
      width: 98%;
    }
  }
`;
