import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../componetns/header";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
export const Profile = () => {
  const params = useParams();
  const [userPost, setPost] = useState([]);
  const [render, setRender] = useState(false);
  const [checkuser, setCheckUser] = useState(false);
  const [isFollow, setIsFollow] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [postLength, setPostLength] = useState("");
  const [followerLength, setFollowerLength] = useState("");
  const [followingLength, setFollowingLength] = useState("");
  const getProfile = async () => {
    const { data } = await axios.get(`/api/user/profile/${params.userid}`);
    setUserInfo(data.user);
    setPost(data.userPost);
    setIsFollow([...data.user.followers]);
    setPostLength(data.userPost.length);
    setFollowerLength(data.user.followers.length);
    setFollowingLength(data.user.following.length);
  };
  useEffect(() => {
    getProfile();
  }, []);
  const followUser = async () => {
    const userid = userInfo._id;
    const { data } = await axios.post(
      `/api/user/follow/${localStorage.getItem("socialtoken")}`,
      { userid }
    );
    if (data.success) {
      setRender(true);
    }
  };
  const unfollowUser = async () => {
    const userid = userInfo._id;
    const { data } = await axios.post(
      `/api/user/unfollow/${localStorage.getItem("socialtoken")}`,
      { userid }
    );
    if (data.success) {
      setRender(true);
    }
  };
  if (render) {
    return <Profile />;
  }
  if (params.userid !== userInfo._id) {
    getProfile();
  }
  return (
    <>
      <Header />
      <Wrapper>
        <div className="profilesection">
          <div className="profile">
            {userInfo.profile === "no pic" ? (
              <FaUserCircle className="profileicon" />
            ) : (
              <img src={userInfo.profile} />
            )}

            <div className="profiledata">
              <h2>{userInfo.name}</h2>
              <div className="details">
                <h4>{postLength} Posts</h4>
                <h4> {followerLength} Followers</h4>
                <h4> {followingLength} Followings</h4>
              </div>
              {isFollow.includes(JSON.parse(localStorage.getItem("User"))) ? (
                <button onClick={unfollowUser}>Unfollow</button>
              ) : (
                <button onClick={followUser}>Follow</button>
              )}
            </div>
          </div>
        </div>

        <h3>All Posts</h3>
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
            <p>No Post Uploaded By User Yet</p>
          )}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  h3 {
    text-align: center;
    margin-top: 2rem;
    font-size: 2.8rem;
  }
  p {
    text-align: center;
    margin-top: 2rem;
    font-size: 4rem;
  }
  .profilesection {
    width: 70%;
    margin: auto;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 5px;
    padding: 2rem;
    margin-top: 1rem;
    background: url("https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    color: #ccc5c5;
  }
  .profile {
    display: flex;
    align-items: center;
    gap: 4rem;
  }
  .profiledata {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-transform: capitalize;
    font-size: 1.4rem;
    color: #ffffff;
  }
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .postsection {
    width: 80%;
    margin: 2rem auto;
    padding: 0 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
  .postsection img {
    width: 100%;
    border-radius: 0;
  }
  .profileicon {
    font-size: 25rem;
  }
  .details {
    display: flex;
    gap: 2rem;
  }
  button {
    padding: 0.4rem 1rem;
    background-color: #44bf78;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
  }
  @media screen and (max-width: 768px) {
    .profilesection {
      gap: 0;
      width: 100%;
    }
    .profile {
      align-items: flex-start;
    }
    .profiledata {
      margin-top: 1rem;
    }
    .details {
      gap: 0.8rem;
      font-size: 1.2rem;
    }
    h3 {
      text-align: center;
      margin-top: 2rem;
      font-size: 2rem;
    }
    p {
      text-align: center;
      margin-top: 2rem;
      font-size: 1.7rem;
    }
    .profileicon {
      font-size: 15rem;
    }
    .postsection {
      width: 100%;
      padding: 0 0.4rem;
      gap: 0.5rem;
    }
    button {
      width: 50%;
    }
    img {
      width: 140px;
      height: 140px;
    }
  }
`;
