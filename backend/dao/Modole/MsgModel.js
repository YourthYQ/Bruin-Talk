const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const UserModel = require("./UserModel");
const MsgModel = sequelize.define(
  "Msg",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT, // 根据消息内容的需求更改数据类型
      allowNull: false,
    },
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // 假设你已经定义了一个User模型
      references: {
        model: "Users", // 根据实际的用户模型名称进行更新
        key: "id",
      },
    },
    // 发信息顺序
    sortId:{
      type:DataTypes.INTEGER,

    }
  },
  {
    timestamps: true
  }
);
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
// 如果尚未关联，可能需要将Msg模型与User模型关联起来
MsgModel.belongsTo(UserModel, { foreignKey: "userId" });
// 添加好友
MsgModel.createMsg = async function (data) {
  try {
    console.log(data);
    // 使用 Sequelize 自动生成的 addFriends 方法添加好友关系
    await MsgModel.create(data);
    // 返回成功的消息或其他信息
    return {
      code: 0,
      msg: "Success",
      success: true,
      message: "added successfully.",
    };
  } catch (error) {
    // 处理错误，返回错误消息或其他信息
    return {
      code: -1,
      msg: "Fail",
      success: false,
      message: "Error adding.",
    };
  }
};
// 获取聊天记录
MsgModel.getChatHistory = async function (data) {
  try {
    const chatHistory = await MsgModel.findAll({
      where: {
        [Op.or]: [
          { userId: data.userId, friendId: data.friendId },
          { userId: data.friendId, friendId: data.userId },
        ],
      },
      order: [['createdAt', 'ASC']], // 根据需要调整排序方式
    });

    return {
      code: 0,
      msg: "Success",
      success: true,
      data: chatHistory,
    };
  } catch (error) {
    return {
      code: -1,
      msg: "Fail",
      success: false,
      message: "Error fetching chat history." + JSON.stringify(error),  
    };
  }
};
// 搜索聊天记录
MsgModel.searchChatHistory = async function (data) {
  try {
    console.log(data);
    const chatHistory = await MsgModel.findAll({
      where: {
        content: {
          [Op.like]: "%" + data.msg + "%",
        },
        [Op.or]: [
          { userId: data.userId, friendId: data.friendId },
          { userId: data.friendId, friendId: data.userId },
        ],
      },
      order: [['createdAt', 'ASC']], // 根据需要调整排序方式
    });

    return {
      code: 0,
      msg: "Success",
      success: true,
      data: chatHistory,
    };
  } catch (error) {
    return {
      code: -1,
      msg: "Fail",
      success: false,
      message: "Error fetching chat history." + JSON.stringify(error),  
    };
  }
};

// 现在，你可以使用MsgModel与数据库中的'Msg'表进行交互
module.exports = MsgModel;