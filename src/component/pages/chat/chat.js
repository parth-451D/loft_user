import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { ErrorAlert } from "../../comman/sweetalert";
import axios from "axios";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const getChatData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user-chatbot/initial`,
        {
          headers: {
            "ngrok-skip-browser-warning": 0,
          },
        }
      );

      setChatData(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = async (questionId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user-chatbot/answer/${questionId}`,
        {
          headers: {
            "ngrok-skip-browser-warning": 0,
          },
        }
      );

      const { answer, relatedQuestionList } = res.data.result;
      setAnswer(answer);
      setRelatedQuestions(relatedQuestionList);

      // Append related question to the chat history
      if (relatedQuestionList.length > 0) {
        setChatData((prevChatData) => [
          ...prevChatData,
          ...relatedQuestionList,
        ]);
      }
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    }
    //  finally {
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    getChatData();
  }, []);

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className="clearfix">
          <div className="chat">
            <div className="chat-header clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                alt="avatar"
              />

              <div className="chat-about">
                <div className="chat-with">Chat with Vincent Porter</div>
                <div className="chat-num-messages">already 1 902 messages</div>
              </div>
              <i className="fa fa-star"></i>
            </div>
            {/* end chat-header */}
            <div className="chat-history">
              <ul>
                <li>
                  <div className="message-data">
                    <span className="message-data-name">
                      <i className="fa fa-circle online"></i> Vincent
                    </span>
                    <span className="message-data-time">10:12 AM, Today</span>
                  </div>
                  <div className="message my-message">
                    Are we meeting today? Project has been already finished and
                    I have results to show you.
                  </div>
                </li>

                {chatData.map((item, index) => (
                  <li
                    className="clearfix cursor"
                    key={index}
                    onClick={() => handleQuestionClick(item.id)}
                  >
                    <div className="message-data align-right">
                      {/* <span className="message-data-time">10:10 AM, Today</span>{" "} */}
                    </div>
                    <div className="message other-message float-right">
                      {item?.question}
                    </div>
                  </li>
                ))}

                {answer && (
                  <li>
                    <div className="message-data">
                      {/* <span className="message-data-name">
                        <i className="fa fa-circle online"></i> Vincent
                      </span>
                      <span className="message-data-time">10:20 AM, Today</span> */}
                    </div>
                    <div className="message my-message">{answer}</div>
                  </li>
                )}

                {relatedQuestions.map((item, index) => (
                  <li
                    className="clearfix cursor"
                    key={index}
                    onClick={() => handleQuestionClick(item.id)}
                  >
                    <div className="message-data align-right">
                      {/* <span className="message-data-time">10:10 AM, Today</span>{" "} */}
                    </div>
                    <div className="message other-message float-right">
                      {item?.question}
                    </div>
                  </li>
                ))}
                {/* 
                <li>
                  <div className="message-data">
                    <span className="message-data-name">
                      <i className="fa fa-circle online"></i> Vincent
                    </span>
                    <span className="message-data-time">10:31 AM, Today</span>
                  </div>
                  <i className="fa fa-circle online"></i>
                  <i
                    className="fa fa-circle online"
                    style={{ color: "#AED2A6" }}
                  ></i>
                  <i
                    className="fa fa-circle online"
                    style={{ color: "#DAE9DA" }}
                  ></i>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </Modal>

      <div>
        <div className="comman-bg chat-box cursor" onClick={onOpenModal}>
          <svg
            aria-hidden="true"
            class="drift-default-icon drift-default-icon--chat-square"
            width="24"
            height="24"
            viewBox="0 0 20 20"
          >
            <path
              fill="#ffffff"
              d="M4.583 14.894l-3.256 3.78c-.7.813-1.26.598-1.25-.46a10689.413 10689.413 0 0 1 .035-4.775V4.816a3.89 3.89 0 0 1 3.88-3.89h12.064a3.885 3.885 0 0 1 3.882 3.89v6.185a3.89 3.89 0 0 1-3.882 3.89H4.583z"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Chat;
