import http from "./index";

// 定义一个对象，用来存放所有的接口
const api = {
  // 注册
  register: (data) => http.post("/users/register", data),
  // 注册
  login: (data) => http.post("/users/login", data),
  // 获取好友列表
  getFriendsList: (data) => http.post("/users/getFriendsList", data),
  // 搜索好友
  findFriend: (data) => http.post("/users/findFriend", data),
  // 申请好友
  addFriend: (data) => http.post("/users/addFriend", data),
  // 删除好友
  delFriend: (data) => http.post("/users/delFriend", data),
  // 发送消息
  sendMsg: (data) => http.post("/msg/sendMsg", data),

};

// 导出 api 对象
export default api;
