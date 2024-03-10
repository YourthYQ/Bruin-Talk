import React, { useContext, useEffect ,useState,useRef} from "react";
// 调用 mock api
import "./style.css";
import Draggable from "react-draggable";
import AsideComponent from "./components/aside.component";
import MsgComponent from "./components/msg.component";
import ChatContext from "../../context/index";
import { Button ,message,Modal,List} from "antd";
import uclaImage from './ucla.png';

export default function Home(props) {
  const { socket, chatData, setChatData } = useContext(ChatContext);
  const [userList,setUserList] = React.useState([])
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  useEffect(() => {
    console.log("Home");
    socket.on('addFriendsMessage',(res)=>{
      console.log(res.content)
      if(res.content.code === 0){
        message.info('A Friend Request' + res.content.marks);   //有好友申请加好友
      }
    })
  }, []);
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
 const loginOut = ()=>{
   socket.emit('disconnect_s')
   window.localStorage.clear();
   window.location.href="#/user/login";
 }
 // 好友申请
 const friendApply = ()=>{
  socket.emit('friendApply',{userId:JSON.parse(localStorage.getItem('user')).id},(res)=>{
    console.log(res)
    if(res.code === 0 ){
      setUserList(res.friends)
      setOpen(true);
    }else{
      message.info(res.msg)
    }

  })
}
const agreeFriendApply = ({type,data}) =>{
  console.log(type,data)
  socket.emit('agreeFriendApply',{fields:{id:data.id,updateFields:{...data,status:type === 1 ? 'accepted' : 'rejected'}}},(res)=>{
    console.log(res)
    setOpen(false)
      if(res.code === 0){
        message.success('Approved')   //已同意
      }else{
        message.info(res.msg)
      }
  })
}

  return (
    <div className="Home">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "transparent"
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={uclaImage} id="ucla-logo" alt="ucla-logo" />
          <h1 style={{ padding: 0 }}>
            User ID:&nbsp;
            {window.localStorage.getItem("user")
              ? JSON.parse(window.localStorage.getItem("user")).username || ""
              : "Please Login"}
          </h1>
          <div>
            <Button type="dashed" onClick={()=>{friendApply()}} style={{ marginRight: 20 }}>
              Friend Request
            </Button>
            <Button type="primary" onClick={()=>{loginOut()}} >
              Logout
            </Button>
          </div>
        </div>
      </header>
      <section className="container Homecontent">
        <AsideComponent data={{ socket, chatData, setChatData }} />
        <MsgComponent data={{ socket, chatData, setChatData }} />
      </section>
      <Modal
        width="400px"
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
            Friend Request
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
          locale={{ emptyText: "No Requests now" }}  //暂无好友申请
          itemLayout="horizontal"
          dataSource={userList}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={item.marks}
                description={
                  <>
                  <Button type="primary" size="small" onClick={()=>{agreeFriendApply({type:1,data:item})}}>
                      Request Approved
                    </Button>
                    <Button type="primary" danger size="small" style={{ marginLeft: 20 }}  onClick={()=>{agreeFriendApply({type:2,data:item})}}>
                      Request Denied
                    </Button>
                    </>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}
