import { Avatar, IconButton } from "@material-ui/core";
import {
  ChatOutlined,
  DonutLarge,
  MoreVert,
  PhoneOutlined,
  QuestionAnswerOutlined,
  SearchOutlined,
  Settings,
} from "@material-ui/icons";
import db, { auth } from "../firebase";
import React, { useState, useEffect } from "react";
import "./sidebar.css";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Sidebar() {
  const user = useSelector(selectUser);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    db.collection("chatroom").onSnapshot((snapshot) =>
      setThreads(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  console.log(threads);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <IconButton>
          <Avatar src={user.photo} />
        </IconButton>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <ChatOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or Start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        {threads.map((room) => (
          <SidebarChat key={room.id} id={room.id} threadName={room.data.Name} />
        ))}
      </div>
      <div className="sidebar__bottom">
        <Avatar
          className="sidebar__bottom__avatar"
          onClick={() => {
            auth.signOut();
          }}
        />
        <IconButton>
          <PhoneOutlined />
        </IconButton>
        <IconButton>
          <QuestionAnswerOutlined />
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
      </div>
    </div>
  );
}

export default Sidebar;
