import "./App.css";
// import './mock/index'
import { HashRouter as Router } from "react-router-dom";
import RouterList from "./router/index";
import routesList from "./router/route";
import ChatContext from "./context/index";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [socket, setSocket] = useState(null);
  const [chatData, setChatData] = useState({});

  useEffect(() => {
    try {
      if (localStorage.getItem('user')) {
        setChatData({...chatData, user: JSON.parse(localStorage.getItem('user'))});
      }
        const socketUrl = process.env.REACT_APP_SOCKET_URL || "http://localhost:4001";
        const socket_ = io(socketUrl);
        socket_.on("connect", () => {
          // setChatData({...chatData, user: JSON.parse(localStorage.getItem('user'))});
          if (window.localStorage.getItem("user")) {
            socket_.emit("setUserData", {
              id: JSON.parse(window.localStorage.getItem("user")).id,
              username: JSON.parse(window.localStorage.getItem("user")).username,
              password:''
            },(res)=>{
              console.log(res)
              if(res.code !== 0){
                if(JSON.parse(window.localStorage.getItem("user")).username === res.username){
                  window.localStorage.clear();
                  window.location.href="#/user/login";
                }
              }else{
                window.localStorage.setItem("socketId",res.socketId)
              }
            });
          }
          console.log("Connected to the server");
        });
        setSocket(socket_);
      // }
    } catch (error) {
      console.log(error);
    }
    return () => {
      if (socket_) socket_.disconnect();
    };
  }, []);

  return (
    // 路由
    <ThemeProvider>
      <ChatContext.Provider value={{ socket, chatData, setChatData }}>
        {socket && (
          <Router>
            <RouterList data={routesList} />
          </Router>
        )}
      </ChatContext.Provider>
    </ThemeProvider>
  );
}

export default App;
