import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiFillHome, AiFillMessage, AiOutlineSearch } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";

export const Header = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const handleChange = async (e) => {
    setSearch(e.target.value);
  };
  const handleKeyUp = async () => {
    const { data } = await axios.post("/api/user/searchuser", {
      email: search,
    });
    setUser([...data.user]);
  };
  return (
    <>
      <Wrapper>
        <div className="searchsection">
          <NavLink to="/home" className="logolink">
            <h2 className="mylogo">FN</h2>
          </NavLink>

          <div className="search">
            <AiOutlineSearch className="searchicon" />
            <input
              type="text"
              name=""
              placeholder="Search user"
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              value={search}
            />
          </div>
        </div>
        <ul>
          <NavLink to="/home" className="link ">
            <AiFillHome />
          </NavLink>
          <NavLink to="/messanger" className="link">
            <AiFillMessage />
          </NavLink>
          <NavLink to="/profile" className="link" title="Account">
            <MdAccountCircle />
          </NavLink>
          <button
            onClick={() => {
              localStorage.clear();
              Navigate("/");
            }}
            className="logout"
          >
            Logout
          </button>
          <NavLink to="/alluser" className="link logo" title="Users">
            <HiUsers className="usericon" />
          </NavLink>
          <NavLink to="/allnews" className=" logo btn" title="Users">
            News
          </NavLink>
        </ul>
      </Wrapper>
      <div className={user.length > 0 ? "searchlist" : ""}>
        <ul>
          {user.length > 0
            ? user.map((user, index) => {
                return (
                  <NavLink
                    to={
                      user._id === JSON.parse(localStorage.getItem("User"))
                        ? "/profile"
                        : `/profile/${user._id}`
                    }
                    onClick={() => {
                      setUser([]);
                    }}
                    className="link"
                  >
                    <li key={index}>{user.name}</li>
                  </NavLink>
                );
              })
            : ""}
        </ul>
      </div>
    </>
  );
};

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  background: #ecf2ff;
  z-index: 777;
  .searchsection {
    flex: 4;
    padding: 0.5rem 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .search {
    position: relative;
    width: 70%;
  }
  .searchicon {
    position: absolute;
    top: 1rem;
    font-size: 2.4rem;
    right: 0.5rem;
  }
  ul {
    flex: 1;
    display: flex;
    justify-content: end;
    gap: 2.5rem;
    align-items: center;
    list-style: none;
    cursor: pointer;
    padding: 0 2rem;
  }
  ul .link {
    font-size: 3rem;
    color: black;
    display: flex;
    align-items: center;
  }
  ul .logo {
    display: none;
  }
  .usericon {
    margin-top: 0.5rem;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  input {
    padding: 1.3rem 1rem;
    border: 1px solid #44bf78;
    outline: none;
    border-radius: 20px;
    width: 100%;
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #44bf78;
    border: 2px solid black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
  }
  .btn {
    padding: 0.5rem 1rem;
    font-size: 1.4rem;
    background-color: #44bf78;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    .searchsection {
      width: 100%;
    }
    h2 {
      font-size: 1.7rem;
      width: 40px;
      height: 40px;
      font-weight: 900;
    }
    .logout {
      display: none;
    }
    ul {
      gap: 6rem;
    }
    ul .link {
      font-size: 5rem;
    }
    ul .logo {
      display: block;
      text-decoration: none;
    }
  }
  @media screen and (max-width: 576px) {
    ul {
      gap: 4.2rem;
    }
    ul .link {
      font-size: 4.2rem;
    }
    input {
      padding: 1.1rem 1.2em;
    }
  }
`;
