const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const MsgModel = require("./Modole/MsgModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("../config/index");

module.exports = {
  // 添加聊天记录
  async createMsg(user) {
    let result = await MsgModel.createMsg(user);
    return result;
  },
  // 发信息
  async sendMsg(user) {
    try {
      await MsgModel.create(user);
      return {
        code: 0,
        msg: "Message sent",
      };
    } catch (error) {
      return {
        code: -1,
        msg: "Send failed",
        data: error,
      };
    }
  },
  // 获取聊天信息 
  getChatHistory(user) {
    return MsgModel.getChatHistory(user);
  },
  searchChatHistory(user) {
    return MsgModel.searchChatHistory(user);
  },
  // 返回id
  async GetMsgId(data) {
    let result = await MsgModel.findAndCountAll({
      order: [["sortId", "asc"]],
      where: {
        [Op.or]: [
          { userId: data.userId, friendId: data.friendId },
          { userId: data.friendId, friendId: data.userId },
        ],
      },
    });
    if (!result) {
      return {
        code: -1,
        msg: "Search failed",
      };
    } else {
      return {
        code: 0,
        msg: "Search completed",
        data: result,
      };
    }
  },

};
