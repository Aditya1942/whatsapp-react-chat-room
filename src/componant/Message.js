import React from "react";
import "./chat.css";
const Message = ({ message, timestamp, name, received }) => {
  return (
    <div>
      <p className={`chat__message ${received ? "" : "chat__reciever"} `}>
        <span className="chat__name"> {name}</span>
        {message}
        <span className="chat__timestamp">{new Date().toUTCString()}</span>
      </p>
    </div>

    // {messages.map((message) => (
    //     <p
    //       key={message._id}
    //       className={`chat__message ${!message.received && "chat__reciever"}`}
    //     >
    //       <span className="chat__name"> {message.name}</span>
    //       {message.message}
    //       <span className="chat__timestamp">{message.timestamp}</span>
    //     </p>
    //   ))}
  );
};

export default Message;
