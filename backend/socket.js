const {
  login,
  register,
  addFriend,
  getFriendsList,
  delFriend,
  verifyFriends,
  findFriend,
  finUser,
  setUserData,
  agreeFriendApply,
  friendApply,
  isFindFriend
} = require("./service/userService");
const { createMsg, getChatHistory, searchChatHistory } = require("./service/msgService");
const UserModel = require("./dao/Modole/UserModel");
const { validateTokenSocket } = require('./middleware/auth');
const auth = ['setUserData', 'getFriendsList']
module.exports = function socketIo(io) {
  // 处理 Socket.io 连接
  const connectedUsers = new Map();
  io.on("connection", (socket) => {
    console.log("用户已连接" + socket.id);
    // 处理用户进入后修改信息
    socket.on("setUserData", async (userData, callback) => {
      try {
        const user_s = await finUser({
          fields: {
            username: userData?.username,
            password: userData?.password
          },
        });
        if (user_s.code !== 0) {
          return callback({ ...user_s, socketId: socket.id, username: userData?.username });
        }
        const result = await setUserData({
          fields: {
            userId: userData.id,
            updateFields: {
              types: userData?.types ? userData.types : 'online',
              socketId: userData?.types ? '' : socket.id
            }
          },
        });
        if (result.code === 0) {
          connectedUsers.set(socket.id, userData.id);
        }
        callback({ code: 0, socketId: socket.id });
        io.emit("getFriendsList", { code: 0, msg: 'updata' });
        // callback({...loggedInUser});
      } catch (error) {
        callback({
          code: -1,
          msg: "Error during login:",
          error,
        });
        console.error("Error during login:", error);
      }
    });

    // 处理用户登录
    socket.on("login", async (userData, callback) => {
      try {
        let islogin = false;
        const user_s = await finUser({
          fields: {
            username: userData?.username,
            password: userData?.password,
          },
        });
        connectedUsers.forEach((value, key) => {
          console.log(`Key: ${key}, Value: ${value}`);
          if (user_s.data.id === value) {
            islogin = true
          }
        });
        if (islogin) {
          return callback({ code: -1, msg: 'Already Logged in!' });
        }
        const loggedInUser = await login({
          fields: {
            username: userData?.username,
            password: userData?.password,
          },
        });
        if (loggedInUser.code === 0) {
          io.emit("getFriendsList", { code: 0, msg: 'updata' });
          await setUserData({
            fields: {
              userId: loggedInUser.data.id,
              updateFields: {
                types: 'online',
                socketId: socket.id
              }
            },
          });
          connectedUsers.set(socket.id, loggedInUser.data.id);
          //io.emit("setUserData", {code:0,msg:'updata'});
        }
        callback({ ...loggedInUser, socketId: socket.id });
      } catch (error) {
        callback({
          code: -1,
          msg: "Error during login:",
          error,
        });
        console.error("Error during login:", error);
      }
    });
    // 获取好友列表
    socket.on("getFriendsList", async (userData, callback) => {
      try {
        // 获取好友列表
        const friends = await getFriendsList({
          fields: { userId: userData.userId },
        });
        callback(friends);
        // io.emit("getFriendsList",await getFriendsList({ fields: { userId: userData.userId } }));
      } catch (error) {
        callback({
          code: -1,
          msg: "Error during login:",
          error,
        });
        console.error("Error during login:", error);
      }
    });
    // 处理用户发送消息
    socket.on("sendMessage", async (data, callback) => {
      try {
        const { from, to, content, sortId, socketId } = data;
        const rs = await isFindFriend({fields:{userId: from, friendId: to}});
        // 保存消息到数据库
        const msg = await createMsg({ fields: { userId: from, friendId: to, content, sortId } });
        callback(rs);
        if (msg.code === 0 && rs.code === 0 ) {
          // 发送消息给目标用户
          const targetSocket = io.sockets.sockets.get(rs.data.Friends[0].socketId);
          if (targetSocket) {
            targetSocket.emit("receiveMessage", { from, content });
          }
        }
      } catch (error) {
        console.error("Error during sendMessage:", error);
      }
    });
    // 添加好友 
    socket.on("addFriends", async (data, callback) => {
      try {
        console.log(data)
        // 保存消息到数据库
        if (data.userId === data.friendId) {
          return callback({ code: -1, msg: 'You cannot follow yourself!' });
        }
        const rs = await isFindFriend({fields:{userId: data.friendId, friendId: data.userId}});
        console.log(rs)
        const msg = await addFriend({ fields: {...data,status: rs.code === 0 ? 'accepted' : 'pending' } });
        if (msg.code === 0 && rs.code !== 0) {
          // io.emit("getFriendsList", { code: 0, msg: 'Application sent!' });
          const r = await UserModel.findOne({ where: { id: data.friendId } })
          if (r.dataValues.socketId) {
            // 发送消息给目标用户
            const targetSocket = io.sockets.sockets.get(r.dataValues.socketId);
            if (targetSocket) {
              targetSocket.emit("addFriendsMessage", { content: { ...data, code: 0 } });
            }
          }
        }else if(msg.code === 0 && rs.code === 0){
          io.emit("getFriendsList", { code: 0, msg: 'Success' });
        }else if(msg.code === 0){
          const r = await UserModel.findOne({ where: { id: data.friendId } })
          if (r.dataValues.socketId) {
            // 发送消息给目标用户
            const targetSocket = io.sockets.sockets.get(r.dataValues.socketId);
            if (targetSocket) {
              targetSocket.emit("addFriendsMessage", { content: { ...data, code: 0 } });
            }
          }
        }
        callback(msg);
      } catch (error) {
        console.error("Error during sendMessage:", error);
      }
    });
    // 删除好友
    socket.on("delFriends", async (data, callback) => {
      try {
        // 保存消息到数据库
        const msg = await delFriend({ fields: data });
        console.log(msg)
        if (msg.code === 0) {
          io.emit("getFriendsList", { code: 0, msg: 'Delete successfully' });
          // 发送消息给目标用户
          // const targetSocket = io.sockets.sockets.get(data.socketId);
          // if (targetSocket) {
          //   targetSocket.emit("addFriendsMessage", { from:data.userId, content: '删除成功' });
          // }
        }
        callback(msg);
      } catch (error) {
        console.error("Error during sendMessage:", error);
      }
    });
    // 获取聊天记录
    socket.on("getChatHistory", async (data, callback) => {
      try {
        const chatRecord = await getChatHistory({ fields: data });
        callback(chatRecord);
      } catch (error) {
        callback({
          code: -1,
          msg: "Error during login:",
          error,
        });
        console.error("Error during login:", error);
      }
    });
    // 获取好友申请
    socket.on("friendApply", async (data, callback) => {
      try {
        console.log(data)
        const chatRecord = await friendApply({ fields: data });
        callback(chatRecord);
      } catch (error) {
        callback({
          code: -1,
          msg: "Error during :",
          error,
        });
        console.error("Error during :", error);
      }
    });
    // 修改好友申请
    socket.on("agreeFriendApply", async (data, callback) => {
      try {
        console.log(data)
        const result = await agreeFriendApply(data);
        callback(result);
        if(result.code===0){
          io.emit("getFriendsList", { code: 0, msg: 'updata' });
        }
      } catch (error) {
        callback({
          code: -1,
          msg: "Error during login:",
          error,
        });
      }
    })
    // 搜索好友聊天记录
    socket.on("searchChatHistory", async (data, callback) => {
      try {
        const chatRecord = await searchChatHistory({ fields: data });
        callback(chatRecord);
      } catch (error) {
        callback({
          code: -1,
          msg: "Error during login:",
          error,
        });
        console.error("Error during login:", error);
      }
    });
    // 处理用户断开连接
    socket.on("disconnect", async (data) => {
      try {
        console.log("User disconnected");
        const disconnectUser = connectedUsers.get(socket.id);
        console.log(disconnectUser)
        connectedUsers.delete(socket.id);
        await setUserData({
          fields: {
            userId: disconnectUser,
            updateFields: {
              types: 'offline',
              socketId: ''
            }
          },
        });
        io.emit("getFriendsList", { code: 0, msg: 'updata' });
      } catch (error) {

      }
      // io.emit("setUserData", {id:disconnectUser,types:'offline'});
    });
    socket.on("disconnect_s", async (data) => {
      try {
        console.log("User disconnected");
        io.emit("getFriendsList", { code: 0, msg: 'updata' });
        const disconnectUser = connectedUsers.get(socket.id);
        console.log(connectedUsers)
        connectedUsers.delete(socket.id);
        await setUserData({
          fields: {
            userId: disconnectUser,
            updateFields: {
              types: 'offline',
              socketId: ''
            }
          },
        });
        //io.emit("getFriendsList", {code:0,msg:'updata'});
      } catch (error) {

      }
      // io.emit("setUserData", {id:disconnectUser,types:'offline'});
    });
    
  });
}
