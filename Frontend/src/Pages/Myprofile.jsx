import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Header } from "../componetns/header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Myprofile = () => {
  const inputRef = useRef("");
  const [spin, setSpin] = useState(false);
  const [profile, setProfile] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [userProfile, setUserProfile] = useState(false);
  const [userPost, setPost] = useState([]);
  const [postLength, setPostLength] = useState("");
  const [followerLength, setFollowerLength] = useState("");
  const [followingLength, setFollowingLength] = useState("");
  const Navigate = useNavigate();
  const getProfile = async () => {
    const { data } = await axios.get(
      `/api/user/myprofile/${localStorage.getItem("socialtoken")}`
    );
    if (data.userDetails.profile !== "no pic") {
      setUserProfile(true);
    }
    setUserInfo(data.userDetails);
    setPost(data.userPost);
    setPostLength(data.userPost.length);
    setFollowerLength(data.userDetails.followers.length);
    setFollowingLength(data.userDetails.following.length);
  };
  useEffect(() => {
    getProfile();
  }, []);
  const handleChange = async (e) => {
    setSpin(true);
    const userData = new FormData();
    userData.append("file", e.target.files[0]);
    userData.append("upload_preset", "sushil");
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dwm6lgmsc/image/upload",
      userData
    );
    if (data) {
      setSpin(false);
    }
    const res = await axios.post(
      `/api/user/changeprofile/${localStorage.getItem("socialtoken")}`,
      { image: data.secure_url }
    );
    if (res.data.success) {
      setProfile(true);
    }
  };

  if (profile) {
    return <Myprofile />;
  }
  return (
    <>
      <Header />
      <Wrapper>
        <div className="profilesection">
          <div className="profile">
            <figure>
              {userProfile ? (
                <img src={userInfo.profile} alt="" />
              ) : (
                <FaUserCircle className="profileicon" />
              )}
              <input
                type="file"
                name="file"
                hidden
                ref={inputRef}
                onChange={handleChange}
              />
              <div>
                <button
                  onClick={() => {
                    inputRef.current.click();
                  }}
                >
                  Change Profile {spin && <LoadingOutlined />}
                </button>
              </div>
            </figure>
            <div className="profiledata">
              <h1>{userInfo.name}</h1>
              <div className="details">
                <h4>{postLength} Posts</h4>
                <h4> {followerLength} Followers</h4>
                <h4> {followingLength} Followings</h4>
              </div>
              <button
                onClick={() => {
                  localStorage.clear();
                  Navigate("/");
                }}
              >
                logout
              </button>
            </div>
          </div>
        </div>
        <h3>My All Posts</h3>
        <div className={userPost.length > 0 ? "postsection" : ""}>
          {userPost.length > 0 ? (
            userPost.map((post, index) => {
              return (
                <div className="post" key={index}>
                  <figure>
                    <img src={post.image} alt="userpost" />
                  </figure>
                </div>
              );
            })
          ) : (
            <p>No Post Avilable! You does not uploded any post yet</p>
          )}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  margin-top: 0.6rem;
  h3 {
    text-align: center;
    margin-top: 2rem;
    font-size: 2.8rem;
  }
  p {
    text-align: center;
    margin-top: 2rem;
    font-size: 3rem;
  }
  .profilesection {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    width: 70%;
    margin: auto;
    background: url("https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGdyYWRpZW50JTIwcGljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;
    border-radius: 5px;
    padding: 0.6rem 0rem;
  }
  .profile {
    display: flex;
    align-items: center;
    gap: 2rem;
    color: #212022;
  }
  .profiledata {
    display: flex;
    font-size: 1.4rem;
    flex-direction: column;
    gap: 1rem;
    text-transform: capitalize;
    color: #0f0e0e;
  }
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .postsection {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    width: 70%;
    margin: 1.5rem auto;
  }
  .post img {
    width: 100%;
    border-radius: 0;
  }
  button {
    margin-top: 1rem;
    padding: 0.4rem 1rem;
    background-color: #44bf78;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
  }
  .profileicon {
    font-size: 22rem;
  }
  .details {
    display: flex;
    gap: 1rem;
  }
  @media screen and (max-width: 768px) {
    .profilesection {
      width: 100%;
    }
    .profile {
      align-items: flex-start;
    }
    .postsection {
      width: 100%;
      padding: 0 1rem;
    }
    .profiledata {
      margin-top: 4rem;
      padding: 0 0.5rem;
    }
    img {
      width: 120px;
      height: 120px;
    }
    .profileicon {
      font-size: 15rem;
    }
  }
`;
