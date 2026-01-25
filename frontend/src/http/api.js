import http from "./index";

const api = {
  register: (data) => http.post("/users/register", data),
  login: (data) => http.post("/users/login", data),
  getFriendsList: (data) => http.post("/users/getFriendsList", data),
  findFriend: (data) => http.post("/users/findFriend", data),
  addFriend: (data) => http.post("/users/addFriend", data),
  delFriend: (data) => http.post("/users/delFriend", data),
  createMsg: (data) => http.post("/msg/createMsg", data),
};

export default api;
