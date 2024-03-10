const { getChatHistory , sendMsg, createMsg,searchChatHistory } = require("../dao/msgDao");

// 在 service 层中使用
module.exports = {
  async createMsg(ctx, next) {
    try {
      const { sortId,content,userId,friendId } = ctx.fields;
      const result = await createMsg({ sortId,content,userId,friendId  });
      console.log(result);
      return {
        ...result,
        data: result.rows,
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
  async getChatHistory(ctx, next) {
    try {
      const { userId,friendId } = ctx.fields;
      const result = await getChatHistory({ userId,friendId  });
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
  async searchChatHistory(ctx, next) {
    try {
      const { userId,friendId,msg } = ctx.fields;
      const result = await searchChatHistory({ userId,friendId ,msg });
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
