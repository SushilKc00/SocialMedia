import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

export const Login = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [spin, setSpin] = useState(false);
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpin(true);
    const { data } = await axios.post("/api/user/login", {
      gmail,
      password,
    });
    console.log(data);
    if (data.success) {
      localStorage.setItem("socialtoken", data.token);
      localStorage.setItem("User", JSON.stringify(data.user._id));
      setSpin(false);
      message.success(data.message);
      Navigate("/home");
    } else {
      setSpin(false);
      message.error(data.message);
    }
  };
  const isLogin = async () => {
    const { data } = await axios.get(
      `/api/user/islogin/${localStorage.getItem("socialtoken")}`
    );
    if (data.success) {
      Navigate("/home");
    }
  };
  useEffect(() => {
    isLogin();
  }, []);
  return (
    <Wrapper>
      <div className="formsection">
        <div className="contentarea">
          <h2 className="mylogo setlogo">FN</h2>
          <p>lets connect with around the world</p>
        </div>
        <div className="formarea">
          <form action="">
            <Input
              placeholder="enter your gmail"
              className="inputfield"
              value={gmail}
              onChange={(e) => {
                setGmail(e.target.value);
              }}
            />
            <Input.Password
              placeholder="password"
              className="inputfield"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button onClick={handleSubmit}>
              Loin in {spin && <LoadingOutlined className="spin" />}
            </button>
            <NavLink to="/" style={{ textAlign: "center", fontSize: 12 }}>
              forgot password
            </NavLink>
            <button className="btn">
              <NavLink to={"/register"} className="link">
                Create a new account
              </NavLink>
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  p {
    font-size: 1.8rem;
    padding: 0 3rem;
    margin-top: 2rem;
    color: #1e8b4c;
    font-weight: 500;
    letter-spacing: 0.5rem;
    text-align: center;
  }
  .formsection {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  .setlogo {
    font-size: 8rem;
    height: 15rem;
    width: 15rem;
  }
  .contentarea {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border: 2px solid red; */
    padding: 4rem 0;
  }
  form {
    background-color: #ffffff;
    display: flex;
    width: 40rem;
    min-height: 30rem;
    padding: 4rem 1.2rem;
    flex-direction: column;
    gap: 2rem;
    border-radius: 10px;
  }
  .inputfield {
    padding: 1rem 0.8rem;
    border: 1px solid black;
  }
  button {
    background-color: #44bf78;
    outline: none;
    border: none;
    padding: 1rem 1rem;
    font-size: 1.8rem;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  .link {
    text-decoration: none;
    color: white;
  }
  .btn {
    width: 60%;
    margin: auto;
  }
  @media screen and (max-width: 768px) {
    align-items: flex-start;
    .formsection {
      flex-direction: column;
    }
    p {
      font-size: 1.5rem;
    }
  }
`;
