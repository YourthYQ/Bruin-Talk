// 上面的代码我在其他页面怎么调用
const UserModel = require("./Modole/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("../config/index");
module.exports = {
  // 注册
  async register(user) {
    const info = await UserModel.findOne({
      where: {
        username: user.username,
      },
    });
    console.log(info);
    if (info !== null) {
      return {
        code: -1,
        msg: "User already exists",
      };
    }
    var salt = bcrypt.genSaltSync(10); //设置加密等级，如果不设置默认为10，最高为10
    let password = user.password;
    var hash = bcrypt.hashSync(password, salt); //将获取
    await UserModel.create({
      username: user.username,
      password: hash,
      socketId: "1",
    });
    return {
      code: 0,
      msg: "Register completed",
    };
  },
  // 登录
  async login(userData) {
    const user = await UserModel.findOne({
      where: {
        username: userData.username,
      },
    });
    if (!user) {
      return {
        code: -1,
        msg: "Incorrect username or password",
      };
    }
    const isPasswordValid = bcrypt.compareSync(
      userData.password,
      user.password
    );
    if (!isPasswordValid) {
      return {
        code: -1,
        msg: "Incorrect username or password",
      };
    }
    const authorization = jwt.sign(
      { id: user.id, username: user.username, password: user.password },
      config.jwtc.jwtSecret,
      {
        expiresIn: 60 * 60 * 24 * 1,
      }
    );
    return {
      code: 0,
      msg: "Login successfully",
      data: {
        authorization,
        id: user.id,
        username: user.username,
      },
    };
  },
  // 登录
  async finUser(userData) {
    const user = await UserModel.findOne({
      where: {
        username: userData.username,
      },
    });
    if (!user) {
      return {
        code: -1,
        msg: "Search failed",
      };
    }
    return {
      code: 0,
      msg: "Search completed",
      data: {
        id: user.id,
        username: user.username,
      },
    };
  },

  // 退出登录
  async logout(user) {
    const result = await UserModel.update(user, {
      where: {
        username: user.username,
        password: user.password,
      },
    });
    return result;
  },
  // 好友列表
  async userList() {
    let result = await UserModel.findAndCountAll({
      order: [["id", "asc"]],
      where: {
        [Op.status]: 1,
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
  // 添加好友
  async addFriend(user) {
    let result = await UserModel.addFriend(user);
    return result;
  },
    // 好友申请列表
    async friendApply(user) {
      let result = await UserModel.friendApply(user);
      return result;
    },
  
  // 查询好友
  async getFriendsList(user) {
    let result = await UserModel.getFriendsList(user);
    return result;
  },
  // 删除好友
  async delFriend(user) {
    let result = await UserModel.delFriend(user);
    return result;
  },
  // 验证好友
  async verifyFriends(user) {
    let result = await UserModel.verifyFriends(user);
    return result;
  },
  // 查询好友
  async findFriend(user) {
    let result = await UserModel.findFriend(user);
    return result;
  },
  // 修改信息
  async setUserData(user) {
    let result = await UserModel.setUserData(user);
    return result;
  },
  //
  async agreeFriendApply(user) {
    let result = await UserModel.agreeFriendApply(user);
    return result;
  },
  async isFindFriend(user) {
    let result = await UserModel.isFindFriend(user);
    return result;
  },
  
};
