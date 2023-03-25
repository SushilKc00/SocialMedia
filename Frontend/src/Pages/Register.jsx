import React, { useState } from "react";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [input, setInput] = useState({
    name: "",
    gmail: "",
    password: "",
    confirmpassword: "",
  });
  const [spin, setSpin] = useState(false);
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpin(true);
    const { name, gmail, password, confirmpassword } = input;
    const { data } = await axios.post("/api/user/register", {
      name,
      gmail,
      password,
      confirmpassword,
    });
    if (data.success) {
      setSpin(false);
      message.success(data.message);
      Navigate("/");
    } else {
      setSpin(false);
      message.error(data.message);
    }
  };
  return (
    <Wrapper>
      <div className="formsection">
        <div className="contentarea">
          <h2 className="mylogo setlogo">FN</h2>
          <p>lets connect with around the world</p>
        </div>
        <div>
          <form action="">
            <Input
              placeholder="enter your name"
              className="inputfield"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
            <Input
              placeholder="enter your gmail"
              className="inputfield"
              name="gmail"
              value={input.gmail}
              onChange={handleChange}
            />
            <Input.Password
              placeholder="password"
              className="inputfield"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
            <Input.Password
              placeholder="confirmpassword"
              className="inputfield"
              name="confirmpassword"
              value={input.consfirmpassword}
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>
              Register {spin && <LoadingOutlined />}
            </button>
            <button className="btn">
              <NavLink to="/" className={"link"}>
                Already have Account login
              </NavLink>
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  z-index: 600;
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
    padding: 4rem 0;
  }

  form {
    background-color: #ffffff;
    display: flex;
    width: 35rem;
    min-height: 30rem;
    padding: 2rem 1.2rem;
    flex-direction: column;
    gap: 2rem;
    border-radius: 4px;
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
    border-radius: 5px;
    font-size: 1.8rem;
    color: white;
    cursor: pointer;
  }
  .btn {
    width: 60%;
    font-size: 1.4rem;
    margin: auto;
  }
  .link {
    text-decoration: none;
    color: #fffffe;
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
