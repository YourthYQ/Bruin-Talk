const { getChatHistory, createMsg, searchChatHistory } = require("../dao/msgDao");

const getFields = (ctx) => ctx.fields || ctx.body || {};

module.exports = {
  async createMsg(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { sortId, content, userId, friendId } = fields;
      const result = await createMsg({ sortId, content, userId, friendId });
      return { ...result, data: result.rows };
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
  async getChatHistory(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { userId, friendId } = fields;
      const result = await getChatHistory({ userId, friendId });
      return { ...result };
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
  async searchChatHistory(ctx, next) {
    try {
      const fields = getFields(ctx);
      const { userId, friendId, msg } = fields;
      const result = await searchChatHistory({ userId, friendId, msg });
      return { ...result };
    } catch (error) {
      console.log(error);
      return { code: 300, msg: "Fail", data: error.message || "Unexpected error" };
    }
  },
};
