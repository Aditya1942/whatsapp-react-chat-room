import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MicOutlined,
  MoreVert,
  SearchOutlined,
  SettingsInputAntenna,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import "./chat.css";
import { selectThreadId, selectThreadName } from "../features/threadSlice";
import Message from "./Message";
function Chat() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const threadId = useSelector(selectThreadId);
  const threadName = useSelector(selectThreadName);
  const [Messages, setMessages] = useState([]);
  const sendMessage = (e) => {
    e.preventDefault();
    // firebase
    db.collection("chatroom").doc(threadId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    console.log(input);
    setInput("");
  };
  useEffect(() => {
    if (threadId) {
      db.collection("chatroom")
        .doc(threadId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
    }
  }, [threadId]);
  Messages.forEach((msg) => {
    let received = user.uid != msg.data.uid;
    msg.received = received;
  });
  console.log(Messages);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{threadName}</h3>
          <p>last seen at....</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {Messages.map((data) => (
          <Message
            key={data.id}
            name={data.data.displayName}
            message={data.data.message}
            timestamp={data.data.timestamp}
            received={data.received}
          />
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Sent a Message
          </button>
        </form>
        <MicOutlined />
      </div>
    </div>
  );
}

export default Chat;
