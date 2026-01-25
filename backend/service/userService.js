const { login, register, addFriend, getFriendsList, delFriend, findFriend, setUserData, finUser, friendApply, agreeFriendApply, isFindFriend } = require("../dao/userDao");

// Accept both multipart (req.fields) and JSON (req.body). Socket callers pass { fields: {...} }.
const getFields = (ctx) => ctx.fields || ctx.body || {};

module.exports = {
  async register(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { username, password } = fields;
      const result = await register({ username, password });
      if (result.code === 0) {
        return { code: 0, msg: "Success", data: result.rows };
      }
      return result;
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
  async login(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { username, password } = fields;
      const result = await login({ username, password });
      return { ...result };
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
  async finUser(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { username, password } = fields;
      const result = await finUser({ username, password });
      return { ...result };
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
  async addFriend(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { userId, friendId, notes, marks, status } = fields;
      const result = await addFriend({ userId, friendId, notes, marks, status });
      return { ...result };
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
  async getFriendsList(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { userId } = fields;
      const result = await getFriendsList({ userId });
      return { ...result, data: result.rows };
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
  async friendApply(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { userId } = fields;
      const result = await friendApply({ userId });
      return { ...result, data: result.rows };
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
  async delFriend(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { friendId, userId } = fields;
      const result = await delFriend({ friendId, userId });
      return { ...result };
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
  async verifyFriends(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { userId, friendId } = fields;
      const result = await verifyFriends({ userId, friendId });
      if (result.code === 0) {
        return { ...result, data: result.rows };
      }
      return result;
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
  async findFriend(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { username } = fields;
      const result = await findFriend({ username });
      if (result.code === 0) {
        return { ...result };
      }
      return result;
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
  async setUserData(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { userId, updateFields } = fields;
      const result = await setUserData({ userId, updateFields });
      return { ...result };
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
  async agreeFriendApply(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { id, updateFields } = fields;
      const result = await agreeFriendApply({ id, updateFields });
      return { ...result };
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
  async isFindFriend(ctx, next) {
    try {
      const fields = getFields(ctx);
      const result = await isFindFriend(fields);
      return { ...result };
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
};
