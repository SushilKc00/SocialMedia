import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

export const Rightbar = () => {
  const [users, setUsers] = useState([]);
  const getAllUsers = async (userid) => {
    const { data } = await axios.get(
      `/api/user/getallusers/${localStorage.getItem("socialtoken")}`
    );
    setUsers(data.users);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <Wrapper>
        <h2>All Users</h2>
        <div className="usersection">
          {users.map((user, index) => {
            return (
              <div className="user" key={index}>
                <div className="first">
                  <NavLink to={`/profile/${user._id}`} className="setuser">
                    {user.profile === "no pic" ? (
                      <FaUserCircle className="useraccounticon" />
                    ) : (
                      <img src={user.profile} alt="" />
                    )}
                    <h2>{user.name}</h2>
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: #d5caca;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #0c1c21;
    border-radius: 10px;
  }
  flex: 1.5;
  height: 91vh;
  overflow-y: auto;
  border: none;
  padding: 2rem 0;
  h2 {
    text-align: center;
  }
  .usersection {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    scrollbar-color: red;
  }
  .user {
    display: flex;
    justify-content: center;
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }
  .setuser {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    align-items: center;
    color: black;
    gap: 1rem;
  }
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: gray;
  }
  button {
    padding: 0.4rem 1rem;
    background-color: #44bf78;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
  }
  .useraccounticon {
    font-size: 8rem;
  }
  @media screen and (max-width: 768px) {
    flex: 0;
  }
`;
