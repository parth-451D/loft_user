import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import { ErrorAlert } from "../../comman/sweetalert";
import axios from "axios";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [initialQuestions, setInitialQuestions] = useState([]);
  const [QnA, setQnA] = useState([]);

  const onOpenModal = () => {
    getChatData();
    setOpen(true);
  };

  const onCloseModal = () => {
    setQnA([]);
    setInitialQuestions([]);
    setOpen(false);
  };
  const [isLoading, setIsLoading] = useState(false);

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
      setInitialQuestions(res.data.result);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const selectQuestion = async (item) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user-chatbot/answer/${item?.id}`
      );

      const { answer, relatedQuestionList } = res.data.result;
      setQnA([...QnA, { question: item?.question, answer: answer }]);
      setInitialQuestions(relatedQuestionList);
    } catch (error) {
      ErrorAlert({ title: error?.response?.data?.error });
    }
  };

  return (
    <>
      <Modal open={open} onClose={onCloseModal} className="chat-modal">
        <div className="clearfix">
          <div className="chat">
            {/* <div className="chat-header clearfix">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                alt="avatar"
              />

              <div className="chat-about">
                <div className="chat-with">Chat with Vincent Porter</div>
                <div className="chat-num-messages">already 1 902 messages</div>
              </div>
              <i className="fa fa-star"></i>
            </div> */}
            <div className="chat-history">
              <ul>
                {QnA &&
                  QnA.map((item, index) => (
                    <>
                    {/* question right */}
                      <li className="clearfix" key={index}>
                        <div className="message-data align-right"></div>
                        <div className="message other-message float-right">
                          {item?.question}
                        </div>
                      </li>
                      {/* answer left */}
                      <li>
                        <div className="message my-message">{item.answer}</div>
                      </li>
                    </>
                  ))}
                {initialQuestions &&
                  initialQuestions?.map((item) => (
                    // initial question ( right ) ( white bg )
                    <li className="cursor" onClick={() => selectQuestion(item)}>
                      <div className="message my-message">{item.question}</div>
                    </li>
                  ))}
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
