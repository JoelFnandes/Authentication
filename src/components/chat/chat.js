import React, { useState, useEffect, useRef } from "react";
import { Button } from "../button/button";
import "./chat.css";
import send from "../../icons/paper-plane-solid.svg";
import plus from "../../icons/plus-solid.svg";
import { useContext } from 'react';
import { AuthContext } from '../authContext';
import Axios from "axios";
import { render } from "@testing-library/react";
import close from "../../icons/times-solid.svg";

function Chat() {
  const [message, setMessage] = useState({});
  const [messageBD, setMessageBD] = useState("");
  const [nameRoom, setNameRoom] = useState("");
  const [nameParti, setNameParti] = useState("");
  const { isAuthenticated, user } = useContext(AuthContext);
  const [msgError, setMsgError] = useState();
  const [msgSucc, setMsgSucc] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleParti, setModalVisibleParti] = useState(false);
  const [chats, setChats] = useState([]);
  const [isButtonRotated, setButtonRotated] = useState(false);
  const [isButtonRotatedParti, setButtonRotatedParti] = useState(false);

  const messagesContainerRef = useRef(null);
  const socketRef = useRef(null);

  Axios.defaults.withCredentials = true;

  const createRooms = () => {
    Axios.post("http://localhost:4000/createRooms", {
      nameRoom: nameRoom,
      user_id: user.id,
    })
      .then(response => {
        if (response.data.errors) {
          setMsgError(response.data.errors);
        } else if (response.data.successes) {
          const newChat = {
            id: response.data.successes[0].myUserParti.id,
            name: nameRoom,
            messages: []
          };
          setChats(prevChats => [...prevChats, newChat]);
          setModalVisible(false);
        }
      })
      .catch(error => {
        console.log(error);
        setMsgError("Ocorreu um erro ao criar o chat.");
      });
  };

  const addParticipants = (chatId) => {
    Axios.post("http://localhost:4000/addParticipants", {
      nameParti: nameParti,
      room_id: chatId,
      user_id: user.id,
    }).then(response => {
      if (response.data.errors === null) {
        setMsgSucc(response.data)
      } else {
        setMsgError(response.data)
      }
    });
  };

  const retrieveChats = () => {
    Axios.get(`http://localhost:4000/chats?user_id=${user.id}`)
      .then((response) => {
        if (response.data.successes) {
          const chatPromises = response.data.successes[0].chats.map(
            async (chat) => {
              const messagesResponse = await Axios.get(
                `http://localhost:4000/messages?chat_id=${chat.id}`
              );
              const updatedChat = {
                ...chat,
                messages: messagesResponse.data.successes || [],
              };
              return updatedChat;
            }
          );
          Promise.all(chatPromises)
            .then((updatedChats) => {
              const sortedChats = updatedChats.sort((a, b) =>
                a.id > b.id ? 1 : -1
              );
              setChats(sortedChats);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (response.data.errors) {
          console.log(response.data.errors);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      retrieveChats();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Scroll para a parte inferior do elemento quando as mensagens forem atualizadas
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [chats]);


  const sendMessage = (chatId) => {
    Axios.post("http://localhost:4000/messages", {
      user_id: user.id,
      message: message[chatId],
      chat_id: chatId,
    })
      .then((response) => {
        if (response.data.errors === null) {
          const newMessage = response.data.messages;
          const updatedChats = chats.map((chat) => {
            if (chat.id === chatId) {
              return {
                ...chat,
                messages: [...chat.messages, newMessage],
              };
            }
            return chat;
          });
          setChats(updatedChats);
          setMessage((prevState) => ({
            ...prevState,
            [chatId]: ""
          }));
          socketRef.current.send(JSON.stringify({ chatId, message: newMessage.message }));

        } else {
          setMsgError(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setMsgError("Ocorreu um erro ao enviar a mensagem.");
      });
  };

  const refreshPage = () => {

    setChats([]);
    retrieveChats();

  }

  const toggleModalCreate = () => {
    setModalVisible(!isModalVisible);
    setButtonRotated(!isButtonRotated);
  };
  const toggleModalAddParti = () => {
    setModalVisibleParti(!isModalVisibleParti);
    setButtonRotatedParti(!isButtonRotatedParti);
  };

  return (
    <div className="chat-geral">
      <div className="create-chat">
        <button className={`btn-createChat ${isButtonRotated ? 'rotate' : ''}`} onClick={toggleModalCreate} >
          <img className="plus-img" src={isButtonRotated ? plus : plus} ></img>
        </button>
        {isModalVisible ? (
          <div className="div-modal-criaChat">
            <input
              className="input-text-nomeChat"
              type="text"
              onChange={(e) => {
                setNameRoom(e.target.value);
              }}
              placeholder="Digite o nome do chat"
            />
            <button
              className="btn-addNomeChat"
              onClick={() => {
                setModalVisible(false);
                createRooms();
              }}
            >
              Criar
            </button>
          </div>
        ) : null}
        {msgSucc !== undefined
          ? msgSucc.successes.map(success => (
            <p key={success.message} id="success">
              {success.message}
            </p>
          ))
          : null}
      </div>
      {chats.map(chat => (
        <div className="chat-content" key={chat.id}>
          <div className="chat-body">
            <div className="chat-header">
              <h3 className="name-chat">{chat.name}</h3>
              <button
                className={`btn-addParticipants ${isButtonRotatedParti ? 'rotate ' : ''}`}
                onClick={toggleModalAddParti}
              >
                <img className="plus-img" src={isButtonRotatedParti ? plus : plus}></img>
              </button>
            </div>
            <div className="chat-messages" ref={messagesContainerRef}>
              {chat.messages && Array.isArray(chat.messages) ? (
                chat.messages.map((message, index) => (
                  <p
                    key={index}
                    className={`message ${message.user_id == user.id ? "user-message" : "other-message"
                      }`}>
                    {message.message}
                  </p>
                ))
              ) : (
                <p>Sem mensagens</p>
              )}
            </div>
            <div className="div-input">
              <div className="chat-input">
                <input id="inp"
                  className="input-text-envMensa"
                  type="text"
                  value={message[chat.id] || ""} // Obtenha o valor da mensagem correspondente ao ID do chat
                  onChange={(e) =>
                    setMessage((prevState) => ({
                      ...prevState,
                      [chat.id]: e.target.value // Atualize a mensagem correspondente ao ID do chat
                    }))
                  }
                  placeholder="Envie uma mensagem"
                />
                <button
                  className="button-send"
                  onClick={() => {
                    sendMessage(chat.id); refreshPage();
                  }}
                >
                  <img className="send-img" src={send}></img>
                </button>
              </div>
            </div>
          </div>
          {isModalVisibleParti ? (
            <div className="content-modal-addUser">
              <div className="div-modalAddUser">
                <input
                  className="input-text-addUser"
                  type="text"
                  onChange={e => {
                    setNameParti(e.target.value);
                  }}
                  placeholder="Digite o nome do usuário"
                />
                <button
                  className="btn-addNameUser"
                  onClick={() => {
                    setModalVisibleParti(false);
                    addParticipants(chat.id);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Chat;
