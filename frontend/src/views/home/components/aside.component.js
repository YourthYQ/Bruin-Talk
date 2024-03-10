import React, { useState, useEffect, useRef } from "react";
import { List, Popconfirm, Badge, Modal, Button, message, Input } from "antd";
import Draggable from "react-draggable";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../http/api";
const { Search } = Input;

const style = {
  marginRight: "5px",
};
export default function AsideComponent(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  // 用户列表 
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);
  // 0 正常 1 搜索
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const [friendsText, setfriendsText] = useState("");
  const [activeId, setActiveId] = useState(1);
  const [friends, setFriends] = useState([]);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  const searchFriend = async () => {
    try {
      if (friendsText.length < 2) {
        messageApi.open({
          type: "error",
          content: "2 Characters Minimum",    //最少2个字符
        });
        return;
      }
      setStatus("1");
      setLoading(true);
      const result = await api.findFriend({
        username: friendsText,
      });
      setLoading(false);
      if (result.code === 0) {
        setUserList(result.data);
        setOpen(true);
      }
    } catch (error) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: JSON.stringify(error),
      });
    }
  };
  const confirm = async (e) => {
    try {
      props.data.socket.emit(
        "addFriends",
        {
          userId: window.localStorage.getItem("user")
            ? JSON.parse(window.localStorage.getItem("user")).id * 1
            : "",
          friendId: e.id * 1,
          username: e.username,
          notes: "1",
          marks: window.localStorage.getItem("user")
          ? JSON.parse(window.localStorage.getItem("user")).username
          : "",
        },
        (result) => {
          setOpen(false);
          messageApi.open({
            type: result.code === 0 ? "success" : "error",
            content: result.msg,
          });
        }
      );
    } catch (error) {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: JSON.stringify(error),
      });
    }
  };

  const cancel = (e) => {
    messageApi.open({
      type: "info",
      content: "Cancel Request",    //取消申请 
    });
  };
  useEffect(() => {
    props.data.setChatData((prevChatData) => ({
      ...prevChatData,
      user: JSON.parse(localStorage.getItem("user")) || null,
    }));
    const userInfoFromLocalStorage = JSON.parse(localStorage.getItem("user")) || null;
    try {
      props.data.socket.on("getFriendsList", (res) => {
        console.log(res,userInfoFromLocalStorage)
        if (res.code === 0) {
          setTimeout(() => {
            getFriendsList();
          }, 1000);
        }
      });
    } catch (error) {
      console.error("Error getting friends:", error);
    }
    async function getFriendsList() {
      try {
        if (userInfoFromLocalStorage) {
          props.data.socket.emit(
            "getFriendsList",
            { userId: userInfoFromLocalStorage.id },
            (res) => {
              console.log(res);
              if (res.code === 0) {
                res.friends.forEach((element) => {
                  if (element.id == id) {
                    props.data.setChatData((prevChatData) => ({
                      ...prevChatData,
                      friend: id,
                      socketId: element.socketId,
                      username: element.username,
                    }));
                  }
                });
                setFriends(res.friends);
              }
            }
          );
        }
      } catch (error) {
        console.error("Error getting friends:", error);
      }
    }
    getFriendsList();
    return () => {
      props.data.socket.off("getFriendsList");
    };
  }, []); 

  const JoinRoom = (item) => {
    setStatus("0");
    props.data.setChatData((prevChatData) => ({
      ...prevChatData,
      friend: item.id,
      socketId: item.socketId,
      username: item.username,
    }));
    navigate("/home/" + item.id);
    setActiveId(item.Friendship.friendId);
  };
  return (
    <aside>
      {contextHolder}
      <div>
        <Search
          placeholder="Find ur friends"    //输入用户名进行搜索
          value={friendsText}
          onChange={(e) => {
            setfriendsText(e.target.value);
          }}
          enterButton="Search"        //搜索
          onSearch={searchFriend}
          loading={loading}
        />
      </div>
      <List
        locale={{ emptyText: "Ur friend is on the way"}}     //好友正在前来的路上
        itemLayout="horizontal"
        dataSource={friends}
        renderItem={(item, index) => (
          <List.Item
            className={
              item.Friendship.friendId === activeId &&
              props.data.chatData?.friendId === item.id
                ? "active"
                : ""
            }
            onClick={() => {
              JoinRoom(item);
              setUser(item);
            }}
          >
            <List.Item.Meta
              title={item.username}
              description={
                item.types === "online" ? (
                  <>
                    <span style={{ ...style }}>Online</span>
                    <Badge status="success" />
                  </>
                ) : (
                  <>
                    <span style={{ ...style }}>Offline</span>
                    <Badge status="error" />
                  </>
                )
              }
            />
          </List.Item>
        )}
      />
      <Modal
        width="300px"
        footer={null}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            {status === "0" ? "User Information" : "Search List"}
          </div>
        }
        open={open}
        onOk={() => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <List
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 8,
          }}
          locale={{ emptyText: "My friend is on the way" }}    //好友正在前来的路上
          itemLayout="horizontal"
          dataSource={userList}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={item.username}
                description={
                  <Popconfirm
                    title="Friend Request"        //申请好友
                    onConfirm={() => {
                      confirm(item);
                    }}
                    onCancel={cancel}
                    okText="OK"         //确认
                    cancelText="Cancel"     //取消
                  >
                    <Button type="primary" size="small">
                      Friend Request         
                    </Button>
                  </Popconfirm>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    </aside>
  );
}
