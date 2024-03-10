import React, { useEffect, useState, useRef } from "react";
import { message, Button, Popconfirm, Flex } from "antd";
import SendComponent from './send.component'

// Define formatDate outside of the MsgComponent
const formatDate = (dateString) => {
  try {
    // Attempt to format the date using the specified time zone
    return new Date(dateString).toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour12: false });
  } catch (error) {
    console.error('Error formatting date:', error);
    // Fallback to the default system time zone in case of error
    return new Date(dateString).toLocaleTimeString('en-US', { hour12: false });
  }
}

export default function MsgComponent(props) {
  const messagesRef = useRef();
  const [messageApi, contextHolder] = message.useMessage();
  const [msgList, setMsgList] = useState([]);
  useEffect(() => {
    const handleMessage = (msg) => {
      console.log("Received message:", msg);
      setMsgList((prevMsgList) => [
        ...prevMsgList,
        {
          id: prevMsgList.length + 1,
          userId: msg.from,
          friendId: props.data.chatData.user.id,
          content: msg.content,
          createdAt: times(),
          add: 1
        },
      ]);
      setTimeout(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      }, 200)
    };
    if (props.data.chatData.friend) {
      getChatHistory()
    }
    props.data.socket.on("receiveMessage", handleMessage);

    // 清理函数
    return () => {
      props.data.socket.off("receiveMessage", handleMessage);
    };
  }, [props]);

  const getChatHistory = () => {
    props.data.socket.emit(
      "getChatHistory",
      { userId: props.data.chatData.user.id, friendId: props.data.chatData.friend },
      (res) => {
        if (res.code === 0) {
          setMsgList(res.data)
          setTimeout(() => {
            if (messagesRef.current) {
              messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
            }
          }, 200)
        }
        console.log("Received message:", res);
      }
    );
  }
  const times = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0'); // 小时，确保是两位数
    const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // 分钟，确保是两位数
    const seconds = currentDate.getSeconds().toString().padStart(2, '0'); // 秒，确保是两位数
    const currentTime = `${hours}:${minutes}:${seconds}`;
    return currentTime;
}
  const deleteUser = async (e) => {
    try {
      console.log({ userId: props.data.chatData.user.id, friendId: props.data.chatData.friend, socketId: props.data.chatData.socketId })
      props.data.socket.emit('delFriends', { userId: props.data.chatData.user.id, friendId: props.data.chatData.friend, socketId: props.data.chatData.socketId }, (result) => {
        if (result.code === 0) {
          props.data.setChatData((prevChatData) => ({
            ...prevChatData,
            friend: null,
            socketId: null,
            username: null,
          }));
        }
        console.log(result)
        messageApi.open({
          type: result.code === 0 ? "success" : "error",
          content: result.msg,
        });
      })
    } catch (error) {
      messageApi.open({
        type: "error",
        content: JSON.stringify(error),
      });
    }
  };

  const cancel = (e) => {
    console.log(e);
    messageApi.open({
      type: "info",
      content: 'Undo Deletion',     // 取消删除
    });
  };


  // 接受发送消息
  const sendMsg = (msg) => {
    console.log(msg)
    if (msg.success) {
      setMsgList((prevMsgList) => [
        ...prevMsgList,
        {
          id: prevMsgList.length + 2,
          ...msg
        }
      ]);
      if (msg.add === 1) {
        setTimeout(() => {
          if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
          }
        }, 200)
      }
    }
  }

  return (
    <div className="msg_list">
      {contextHolder}
      {/* {JSON.stringify(props.data.chatData)} */}
      <div className="msgBox" ref={messagesRef}>
        <div className="header">
          {
            props.data.chatData.username ?
              <>
                <Flex>
                  <Button type="primary">
                    User: {props.data.chatData.username}
                  </Button>
                </Flex>
                <Popconfirm
                  title="Delete the friend?"    // 删除好友？
                  onConfirm={deleteUser}
                  onCancel={cancel}
                  okText="OK"       // 确认
                  cancelText="Undo"  // 取消
                >
                  <Button type="primary" danger>
                    Delete Friend
                  </Button>
                </Popconfirm>
              </>
              : null
          }

        </div>
        {props.data.chatData?.friend ? (
          msgList.length <= 0 ? (
            <div className="msgxt msgx">No Messages</div>    // 暂无消息
          ) : (
            msgList.map((item, index) => {
              return item.userId !== props.data.chatData.user.id ? (
                <div className="msgxt msgx" key={index + "you-msg"}>
                  <div className="msgName">{item.content}</div>
                  <div className="msgTime">{item?.add === 1 ? item.createdAt : formatDate(item.createdAt)}</div>
                </div>
              ) : (
                <div className="msgxy msgx" key={index + "my-msg"}>
                  <div className="msgName">{item.content}</div>
                  <div className="msgTime">{item?.add === 1 ? item.createdAt : formatDate(item.createdAt)}</div>
                </div>
              );
            })
          )
        ) : (
          <div style={{ color: '#ffffff' }}>Lets Chat!</div>  // 跟好友聊聊吧！
        )}
      </div>
      <SendComponent sendMsg={sendMsg} data={props.data} />
    </div>
  );
}
