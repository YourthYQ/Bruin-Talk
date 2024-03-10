const { login, register, logout, addFriend,getFriendsList,delFriend,findFriend,setUserData,finUser,friendApply,agreeFriendApply,isFindFriend } = require("../dao/userDao");

// 在 service 层中使用
module.exports = {
  async register(ctx, next) {
    try {
      // 注册前先判断是否存在该用户
      const { username, password } = ctx.fields;
      const result = await register({ username, password });
      if (result.code == 0) {
        return {
          code: 0,
          msg: "Success",
          data: result.rows,
        };
      } else {
        return(result);
      }
    } catch (error) {
      console.log(error)
      reutrn({
        code: 300,
        msg: "Fail",
        data: error.message || "Unexpected error",
      });
    }
  },
  async login(ctx, next) {
    try {
      const { username, password } = ctx.fields;
      const result = await login({ username, password });
      console.log(result);
      return {
        ...result
      };
    } catch (error) {
        console.log(error)
      return({
        code: 300,
        msg: "Fail",
        data: error.message || "Unexpected error",
      });
    }
  },
  async finUser(ctx, next) {
    try {
      const { username, password } = ctx.fields;
      const result = await finUser({ username, password });
      return {
        ...result
      };
    } catch (error) {
        console.log(error)
      return({
        code: 300,
        msg: "Fail",
        data: error.message || "Unexpected error",
      });
    }
  },
  async addFriend(ctx, next) {
    try {
      const { userId, friendId ,notes,marks,status } = ctx.fields;
      const result = await addFriend({ userId, friendId,notes,marks,status });
      console.log(result);
      return {
        ...result,
      };
    } catch (error) {
        console.log(error)
      return({
        code: 300,
        msg: "Fail",
        data: error.message || "Unexpected error",
      });
    }
  },
  async getFriendsList(ctx, next) {
    try {
      const { userId } = ctx.fields;
      console.log(ctx.fields);
      const result = await getFriendsList({ userId });
      return {
        ...result,
        data: result.rows,
      };
    } catch (error) {
        console.log(error)
      reutrn({
        code: 300,
        msg: "Fail",
        data: error.message || "Unexpected error",
      });
    }
  },
  async friendApply(ctx, next) {
    try {
      const { userId } = ctx.fields;
      const result = await friendApply({ userId });
      return {
        ...result,
        data: result.rows,
      };
    } catch (error) {
        console.log(error)
      reutrn({
        code: 300,
        msg: "Fail",
        data: error.message || "Unexpected error",
      });
    }
  },
  
  async delFriend(ctx, next) {
    try {
      const { friendId,userId } = ctx.fields;
      const result = await delFriend({ friendId,userId });
      return {
        ...result,
      };
    } catch (error) {
        console.log(error)
      retrun({
        code: 300,
        msg: "Fail",
        data: error.message || "Unexpected error",
      });
    }
  },
  async verifyFriends(ctx, next) {
    try {
      const { userId,friendId } = ctx.fields;
      const result = await verifyFriends({ userId,friendId });
      console.log(result);
      if (result.code == 0) {
        return {
          ...result,
          data: result.rows,
        };
      } else {
        return(result);
      }
    } catch (error) {
        console.log(error)
      return({
        code: 300,
        msg: "Fail",
        data: error.message || "Unexpected error",
      });
    }
  },
  async findFriend(ctx, next) {
    try {
      const { username } = ctx.fields;
      const result = await findFriend({ username });
      console.log(result);
      if (result.code == 0) {
        return {
          ...result,
        };
      } else {
        return(result);
      }
    } catch (error) {
      console.log(error)
     return({
        code: 300,
        msg: "Fail",
        data: error.message || "Unexpected error",
      });
    }
  },
  async setUserData(ctx, next) {
    try {
      const { userId,updateFields } = ctx.fields;
      const result = await setUserData({ userId,updateFields });
      return {
        ...result,
      };
    } catch (error) {
      console.log(error)
      return({
        code: 300,
        msg: "Fail",
        data: error.message || "Unexpected error",
      });
    }
  },
  async agreeFriendApply(ctx, next) {
    try {
      const { id,updateFields } = ctx.fields;
      const result = await agreeFriendApply({ id,updateFields });
      return {
        ...result,
      };
    } catch (error) {
      console.log(error)
      return({
        code: 300,
        msg: "Fail",
        data: error.message || "Unexpected error",
      });
    }
  },
  async isFindFriend(ctx, next) {
    try {
      const result = await isFindFriend(ctx.fields);
      return {
        ...result,
      };
    } catch (error) {
      console.log(error)
      return({
        code: 300,
        msg: "Fail",
        data: error.message || "Unexpected error",
      });
    }
  },
  
};
