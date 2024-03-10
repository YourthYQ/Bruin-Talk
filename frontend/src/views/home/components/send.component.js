import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { List,  Modal, Button, Input } from "antd";
const { Search } = Input;

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

export default function SendComponent(props) {
    const [msgText, setMsgText] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [open, setOpen] = useState(false);
    const [historyData, setHistoryData] = useState([]);
    const [historyText, setHistoryText] = useState('');
    const [loading, setLoading] = useState(false);

    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });

    const draggleRef = useRef(null);

    const times = () => {
        const currentDate = new Date();
        const hours = currentDate.getHours().toString().padStart(2, '0'); // 小时，确保是两位数
        const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // 分钟，确保是两位数
        const seconds = currentDate.getSeconds().toString().padStart(2, '0'); // 秒，确保是两位数
        const currentTime = `${hours}:${minutes}:${seconds}`;
        return currentTime;
    }
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
    const sendMsg = async () => {
        props.data.socket.emit(
            "sendMessage",
            { from: props.data.chatData.user.id, to: props.data.chatData.friend, content: msgText, sortId: 1, socketId: props.data.chatData.socketId || null },
            (res) => {
                console.log(res)
                if (res.code === 0) {
                    setMsgText('')
                    props.sendMsg({
                        success: true,
                        userId: props.data.chatData.user.id,
                        friendId: props.data.chatData.friend,
                        content: msgText,
                        createdAt: times(),
                        add: 1
                    })
                }
                else {
                    props.sendMsg({
                        success: false,
                        msg: res.msg
                    })
                }
                console.log("Received message:", res);
            }
        );
    };
    const handleOk = (e) => {
        setOpen(false);
    };
    const handleCancel = (e) => {
        setOpen(false);
        setHistoryData([])
        setHistoryText('')
    };
    const searchHistory = () => {
        setLoading(true)
        try {
            props.data.socket.emit(
                "searchChatHistory",
                { userId: props.data.chatData.user.id, friendId: props.data.chatData.friend, msg: historyText },
                (res) => {
                    setLoading(false)
                    if (res.code === 0) {
                        setHistoryData(res.data)
                    }
                    else {

                    }
                    console.log("Received message:", res);
                }
            );
        } catch (error) {
            setLoading(false)
        }

    }
    return (
        <>
            <div className="tool">
                <Button type="primary" size="small" onClick={() => { setOpen(true) }}>
                  Search Message History
                </Button>
            </div>
            <div className="msgSend">
                <input
                    type="text"
                    className="msgText"
                    placeholder="Enter messages here"  // 请输入要发送的内容
                    value={msgText}
                    onChange={(e) => {
                        setMsgText(e.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        sendMsg();
                    }}  // 发送
                >
                    Send
                </button>
            </div>
            <Modal
                width="700px"
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
                    // end
                    >
                      Message History
                    </div>
                }
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
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
                <Search
                    placeholder="Enter keywords to search"   // 输入关键字进行搜索
                    value={historyText}
                    onChange={(e) => {
                        setHistoryText(e.target.value);
                    }}
                    enterButton="Search"    // 搜索
                    onSearch={searchHistory}
                    loading={loading}
                />
                <List
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 8,
                    }}
                    locale={{ emptyText: "No more messages" }}    // 没有更多信息了
                    itemLayout="horizontal"
                    dataSource={historyData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta  // 我说：+ 说
                                title={item.userId === props.data.chatData.user.id ? 'I say: ' + item.content : (props.data.chatData.username + ' says: ' + item.content)}
                                description={'Sending time：' + formatDate(item.createdAt)}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </>

    )
}
