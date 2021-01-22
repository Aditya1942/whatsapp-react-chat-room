import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setThread } from "../features/threadSlice";
import db from "../firebase";
import "./SidebarChat.css";
function SidebarChat({ id, threadName }) {
  const dispatch = useDispatch();
  const [threadInfo, setThreadInfo] = useState([]);
  useEffect(() => {
    db.collection("chatroom")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setThreadInfo(snapshot.docs.map((doc) => doc.data()));
      });
    console.log(threadInfo);
  }, [id]);
  return (
    <div
      className="sidebarChat"
      onClick={() => {
        dispatch(
          setThread({
            threadId: id,
            threadName: threadName,
          })
        );
      }}
    >
      <Avatar src={`${process.env.PUBLIC_URL}avatar.jpg`} />
      <div className="sidebarChat__info">
        <h2>{threadName}</h2>
        <p>This is the last message</p>
      </div>
    </div>
  );
}

export default SidebarChat;
