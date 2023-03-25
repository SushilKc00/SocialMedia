import React, { useEffect, useRef, useState } from "react";
import { Header } from "../componetns/header";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

var socket = io({
  auth: {
    token: JSON.parse(localStorage.getItem("User")),
  },
});
export const Messanger = () => {
  const [users, setUsers] = useState([]);
  const [chatContent, setChatContent] = useState(true);
  const [allMessages, setAllMessages] = useState([]);
  const [chatUser, setChatUser] = useState("");
  const [receiverId, setRecevierId] = useState("");
  const [message, setText] = useState("");
  var Ref = useRef();

  socket.on("loadChats", (data) => {
    setAllMessages([...data.allMessages]);
  });
  socket.on("forreceiver", (data) => {
    if (
      data.sender === receiverId &&
      data.receiver === JSON.parse(localStorage.getItem("User"))
    ) {
      setAllMessages([...data.allMessages]);
      setChatUser(data.senderName.name);
    }
    var scrollToBottom = document.getElementById("scrool");
    scrollToBottom.scrollTop = scrollToBottom.scrollHeight;
  });

  const fetchUser = async () => {
    const { data } = await axios.get(
      `/api/user/getallusers/${localStorage.getItem("socialtoken")}`
    );
    setUsers([...data.users]);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setText("");
    if (receiverId) {
      const { data } = await axios.post(`/api/message/sendmessage`, {
        message,
        receiver: receiverId,
        sender: JSON.parse(localStorage.getItem("User")),
      });
    } else {
      alert("*Select a user ro chat!!");
    }
    socket.emit("recevier", {
      senderId: JSON.parse(localStorage.getItem("User")),
      receiverId,
    });
    socket.emit("existsChat", {
      senderId: JSON.parse(localStorage.getItem("User")),
      receiverId,
    });
    var scrollToBottom = document.getElementById("scrool");
    scrollToBottom.scrollTop = scrollToBottom.scrollHeight;
  };
  return (
    <>
      <Header />
      <Wrapper>
        <div className="chatsection">
          <form onSubmit={handleSubmit}>
            <div className="chatarea">
              <div className="message" id="scrool">
                <h3>{chatUser}</h3>
                <div className="messagefield">
                  {chatContent ? (
                    <p className="para">Select a user to chat!</p>
                  ) : (
                    allMessages.map((m) => {
                      return (
                        <div
                          className={
                            m.sender ===
                            JSON.parse(localStorage.getItem("User"))
                              ? "outgoing"
                              : "incomming"
                          }
                        >
                          <p>{m.message}</p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              <input
                placeholder="Message."
                onChange={(e) => {
                  setText(e.target.value);
                }}
                value={message}
              />
              <button type="submit"> Send</button>
            </div>
          </form>
        </div>

        <div className="usersection">
          <h3>User</h3>
          {users.map((user, index) => {
            return (
              <div className="user" key={index}>
                <div>
                  <NavLink
                    onClick={() => {
                      var senderId = JSON.parse(localStorage.getItem("User"));
                      setRecevierId(user._id);
                      socket.emit("existsChat", {
                        senderId,
                        receiverId: user._id,
                      });
                      setChatUser(user.name);
                      setChatContent(false);
                    }}
                    className="setuser"
                  >
                    {user.profile === "no pic" ? (
                      <FaUserCircle className="useraccounticon" />
                    ) : (
                      <img src={user.profile} alt="" />
                    )}
                    {user.isOnline === "0" ? <p>offline</p> : <p>online</p>}
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
  display: flex;
  /* padding: 0.8rem 0.4rem; */
  h3 {
    text-align: center;
    font-size: 1.7rem;
  }
  .chatsection {
    flex: 4;
    padding: 0.6rem 0.8rem;
  }
  .usersection {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 0.5rem 0.8rem;
  }

  .chatarea {
    position: relative;
    height: 640px;
    width: 65%;
    border-radius: 12px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  }
  .message {
    height: 90%;
    padding: 0.8rem 0;
    overflow-y: auto;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      width: 0.3rem;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #054605;
      border-radius: 12px;
    }
  }
  form {
    display: flex;
    justify-content: center;
  }
  .user {
    display: flex;
    justify-content: center;
    padding: 0.5rem 0rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }
  .setuser {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    align-items: center;
    color: black;
    gap: 0.2rem;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: gray;
  }
  input {
    position: absolute;
    bottom: 0.4rem;
    left: 0;
    width: 100%;
    border-radius: 40px;
    border: 1px solid green;
    outline: none;
    padding: 1rem;
  }
  button {
    padding: 0.4rem 1rem;
    background-color: #44bf78;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    position: absolute;
    bottom: 1.2rem;
    right: 1rem;
  }
  .useraccounticon {
    font-size: 4rem;
  }
  .outgoing {
    display: flex;
    justify-content: end;
    padding: 0.6rem 1.4rem;
  }
  .outgoing p {
    background-color: #44bf78;
    padding: 1.2rem 1rem;
    color: white;
    border-radius: 8px;
    font-size: 1.4rem;
    font-weight: 500;
  }
  .incomming {
    display: flex;
    justify-content: start;
    padding: 0.6rem 1.4rem;
  }
  .incomming p {
    background-color: #d6e7dd;
    padding: 2rem;
    border-radius: 8px;
    font-size: 1.4rem;
    font-weight: 500;
    color: #02170b;
  }
  .para {
    font-size: 5rem;
    color: #d8d4d4;
    text-align: center;
  }
  @media screen and (max-width: 768px) {
    .chatarea {
      width: 100%;
      height: 82vh;
    }
  }
`;
