import React, { KeyboardEvent, useState } from 'react';
import axios from 'axios';

import './IvyLiveChat.scss';
import Typing from '../Typing/Typing';
import logo from './logo.png';
export interface IvyLiveChatProps {
  userName: string;
  agentId: string;
}

interface Message {
  role: string;
  content: string;
}

const IvyLiveChat: React.FC<IvyLiveChatProps> = ({ userName, agentId }) => {
  const [typing, setTyping] = useState<boolean>(false);
  const [convo, setConvo] = useState<Message[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>('');
  const [enable, setEnable] = useState<boolean>(false);

  const toggleState = () => {
    setConvo([]);
    setEnable(!enable);
    showOrHideChatBox();
  };

  const showOrHideChatBox = () => {
    if (enable) {
      // Add logic to show the chatbox
    } else {
      // Add logic to hide the chatbox
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLiveChat();
    }
  };

  const login = async () => {
    if (isLoggedIn) return;
    const url = 'https://api.steamlined.solutions/api/v1/login';
    const data = {
      user_name: 'Atomic_enrollment',
      password: 'Atomicenrollment24*',
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true,
        },
      });
      if (response.data.success === true) setIsLoggedIn(true);
      console.log(response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLiveChat = async () => {
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
    };

    setConvo([...convo, newUserMessage]);
    setUserMessage('');
    setTyping(true);

    const url = `https://api.steamlined.solutions/api/v1/live_chat/${userName}/${agentId}`;
    const data = {
      messages: [{ role: 'user', content: userMessage }],
    };

    try {
      await login();
      const response = await axios.post(url, data, {
        withCredentials: true,
      });
      console.log(response);
      const newMessage: Message = {
        role: response.data.data.role,
        content: response.data.data.content,
      };
      setConvo((prevConvo) => [...prevConvo, newMessage]);
      setTyping(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatbox">
      <div
        style={{
          opacity: enable ? '100' : '0',
          display: enable ? 'flex' : 'none',
        }}
        className={`chatbox__support  ${enable ? 'chatbox--active' : ''}`}
      >
        <div className="chatbox__header">
          <div className="chatbox__content--header">
            <h4 className="chatbox__heading--header">Chat support Bot</h4>
            <p className="chatbox__description--header">Powered by Steamlined Solutions</p>
          </div>
        </div>
        <div className="chatbox__messages">
          <div id="chatArea">
            {convo.map((message, index) => (
              <div
                key={index}
                className={`messages__item ${
                  message.role === 'assistant' ? 'messages__item--visitor' : 'messages__item--operator'
                }`}
              >
                {message.content}
              </div>
            ))}
            {typing && <Typing />}
          </div>
        </div>

        <div className="chatbox__footer">
          <input
            type="text"
            id="userMessage"
            value={userMessage}
            onKeyPress={handleKeyPress}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Write a message..."
          />
          <button className="chatbox__send--footer" onClick={handleLiveChat} id="sendMessage">
            Send
          </button>
        </div>
      </div>
      <div className="chatbox__button" onClick={toggleState}>
        <button style={{ border: 'solid 1px gray' }}>
          {enable ? (
            <button>
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="CloseOutlinedIcon"
                style={{ width: '40px', height: '40px' }}
              >
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          ) : (
            <img src={logo} style={{ width: '40px', height: '40px' }} />
          )}
        </button>
      </div>
    </div>
  );
};

export default IvyLiveChat;
