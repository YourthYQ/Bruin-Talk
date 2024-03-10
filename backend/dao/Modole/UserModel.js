const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
// sequelize.query('ALTER TABLE Users ADD COLUMN types STRING DEFAULT "offline";');
// sequelize.query('ALTER TABLE Users ADD COLUMN socketId STRING ;');

const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      // 1 正常 Normal
      defaultValue: "1",
    },
    types: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // 1 online offline
      defaultValue: "offline",
    },
    socketId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true, // 启用时间戳 use timestamps
  }
);
const Friendship = sequelize.define("Friendship", {
  // 好友关系模型定义 define Friendship 
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    // "pending": 待验证, "accepted": 已接受, "rejected": 已拒绝
    defaultValue: "pending",
  },
  status_is: {
    type: DataTypes.STRING,
    allowNull: false,
    // "0": 删除, "1": 正常
    defaultValue: "1",
  },
  // 备注
  notes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // 申请标题
  marks: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
UserModel.belongsToMany(UserModel, {
  through: Friendship,
  as: "Friends",
  foreignKey: "userId",
  otherKey: "friendId",
});
// 添加好友
UserModel.addFriend = async function (data) {
  try {
    // 检查是否已存在好友关系记录
    const existingFriendship = await Friendship.findOne({
      where: {
        userId: data.userId,
        friendId: data.friendId,
      },
    });

    if (existingFriendship) {
      // 已存在好友关系记录，可以处理一些逻辑，例如提示用户已经是好友
      return {
        code: -1,
        msg: "请勿重复申请",
        success: false,
        message: "请勿重复申请",
      };
    }

    // 使用 Sequelize 自动生成的 addFriends 方法添加好友关系
    await Friendship.create(data);
    //await Friendship.create({...data,userId:data.friendId,friendId:data.userId});

    // 返回成功的消息或其他信息
    return {
      code: 0,
      msg: "Request Succeeded",
      success: true,
      message: "Friend added successfully.",
    };
  } catch (error) {
    // 处理错误，返回错误消息或其他信息
    console.log(error);
    return {
      code: -1,
    // 申请失败
      msg: "Request Failed",
      success: false,
      message: "Error adding friend.",
    };
  }
};
// 获取好友列表
UserModel.getFriendsList = async function (data) {
  try {
    const user = await UserModel.findOne({
      where: { id: data.userId },
      include: [
        {
          model: UserModel,
          as: "Friends",
          attributes: ["id", "username", "types", "socketId"],
          through: {
            // attributes: [], // 如果不需要返回 Friendship 表的字段，设置为空数组
          },
          where: {
            "$Friends.Friendship.status$": "accepted",
            "$Friends.Friendship.status_is$": 1,
            [Op.or]: [
              { "$Friends.Friendship.userId$": data.userId },
              { "$Friends.Friendship.friendId$": data.userId },
            ],
          },
        },
      ],
    });

    // 返回好友列表
    return { code: 0, msg: "Success", success: true, friends: user?.Friends || [] };
  } catch (error) {
    console.error("Error getting friends:", error);
    return {
      code: -1,
    // 失败
      msg: "Failure",
      success: false,
      message: "Error getting friends. " + error.message,
    };
  }
};
// 获取好友申请列表
UserModel.friendApply = async function (data) {
  try {
    const user = await Friendship.findAll({
      where: { friendId: data.userId, status: "pending", status_is: '1', },
    });
    // 返回好友列表
    return { code: 0, msg: "Success", success: true, friends: user || [] };
  } catch (error) {
    console.error("Error getting friends:", error);
    return {
      code: -1,
      msg: "失败",
      success: false,
      message: "Error getting friends. " + error.message,
    };
  }
};
// 删除好友
UserModel.delFriend = async function (data) {
  console.log(data);
  const { userId, friendId } = data;
  try {
    // 使用 Sequelize 自动生成的 getFriends 方法获取好友列表
    await Friendship.destroy({
      where: {
        [Op.or]: [
          { userId: userId, friendId: friendId },
        ],
      },
    });
    // 返回好友列表
    return { code: 0, msg: "Deleted Successfully", success: true };
  } catch (error) {
    console.log(error);
    // 处理错误，返回错误消息或其他信息
    return { success: -1, msg: "Delete Failed", message: "Error deleting friend." };
  }
};
// 查询好友
UserModel.findFriend = async function (data) {
  try {
    // 使用 Sequelize 自动生成的 getFriends 方法获取好友列表
    const userlist = await UserModel.findAll({
      where: {
        status: '1',
        username: {
          [Op.like]: '%' + data.username + '%',
        }
      },
      attributes: ['id', 'username'], // 选择要返回的用户字段
      raw: true, // 将查询结果直接返回为 JSON 对象
    });

    // 返回好友列表
    return { code: 0, msg: "Success", success: true, data: userlist };
  } catch (error) {
    console.log(error);
    // 处理错误，返回错误消息或其他信息
    return { success: -1, msg: "Fail", message: "Error getting friends." };
  }
};
// 验证好友
UserModel.verifyFriends = async function (data) {
  try {
    // 查看是否已存在好友关系记录
    const existingFriendship = await Friendship.findOne({
      where: {
        [Op.or]: [
          { userId: data.userId, friendId: data.friendId },
          { userId: data.friendId, friendId: data.userId },
        ],
      },
    });

    if (existingFriendship) {
      // 已存在好友关系记录，可以处理一些逻辑，例如提示用户已经是好友
      return {
        code: -1,
        msg: "",
        success: false,
        message: "Users are already friends.",
      };
    }

    // 创建好友关系记录，设置状态为 "pending"
    await Friendship.create({
      userId: data.userId,
      friendId: data.friendId,
      status: "pending",
    });

    // 返回成功的消息或其他信息
    return {
      code: -1,
      msg: "Success",
      success: true,
      message: "Friend request sent",
    };
  } catch (error) {
    // 处理错误，返回错误消息或其他信息
    return {
      code: -1,
      msg: "",
      success: false,
      message: "Error sending friend request",
    };
  }
};
// 修改信息
UserModel.setUserData = async function (data) {
  try {
    // 查找对应 userId 的用户记录
    const user = await UserModel.findOne({
      where: {
        id: data.userId,
        status: '1',
      },
    });
    if (!user) {
      // 如果找不到对应的用户记录，返回相应的错误消息
      return {
        code: -1,
        msg: "",
        success: false,
        message: "User not found",
      };
    }

    // 更新用户记录的字段
    await user.update(data.updateFields);

    // 返回成功的消息或其他信息
    return {
      code: 0,
      msg: "Success",
      success: true,
      message: "Success",
    };
  } catch (error) {
    // 处理错误，返回错误消息或其他信息
    return {
      code: -1,
      msg: "",
      success: false,
      message: JSON.stringify(error),
    };
  }
};
// 好友
UserModel.agreeFriendApply = async function (data) {
  try {
    // 查找对应 userId 的用户记录
    await Friendship.update({
      status: data.updateFields.status
    }, {
      where: {
        id: data.id // 条件，这里id为1的记录会被更新
      }
    });
    if(data.updateFields.status === 'accepted'){
      await Friendship.create({marks:data.updateFields.marks,
        status:data.updateFields.status,
        notes:data.updateFields.notes,userId:data.updateFields.friendId,friendId:data.updateFields.userId});
    }
    // 返回成功的消息或其他信息
    return {
      code: 0,
      msg: "Success",
      success: true,
      message: "Success",
    };
  } catch (error) {
    // 处理错误，返回错误消息或其他信息
    return {
      code: -1,
      msg: "",
      success: false,
      message: JSON.stringify(error),
    };
  }
};
// 查询是否好友
UserModel.isFindFriend = async function (data) {
  try {
    // 使用 Sequelize 自动生成的 getFriends 方法获取好友列表
    // const user = await Friendship.findOne({
    //   where: {
    //     userId: data.userId,
    //     friendId:data.friendId * 1
    //   },
    // });
    const user = await UserModel.findOne({
      where: { id: data.userId },
      include: [
        {
          model: UserModel,
          as: "Friends",
          attributes: ["id", "username", "types", "socketId"],
          through: {
            // attributes: [], // 如果不需要返回 Friendship 表的字段，设置为空数组
          },
          where: {
            "$Friends.Friendship.status$": "accepted",
            "$Friends.Friendship.status_is$": 1,
            "$Friends.Friendship.userId$": data.userId,
            "$Friends.Friendship.friendId$": data.friendId * 1
          },
        },
      ],
    });
    if (!user) {
      return { code: -1, msg: "Fail", success: false, message: "User not found" };
    }
    // 返回好友列表
    return { code: 0, msg: "Success", success: true, data: user };
  } catch (error) {
    console.log(error);
    // 处理错误，返回错误消息或其他信息
    return { success: -1, msg: "Fail", message: "Error getting friends" };
  }
};

module.exports = UserModel;
