const AWS = require("aws-sdk");

const UpdateTodo = async (event) => {
  const { ID } = event.pathParameters;
  const { Completed } = JSON.parse(event.body);
  const DB = new AWS.DynamoDB.DocumentClient();

  const results = await DB.update({
    TableName: "TodoTable",
    Key: {
      id: ID,
    },
    UpdateExpression: "set Completed = :Completed",
    ExpressionAttributeValues: {
      ":Completed": Completed,
    },
    ReturnValues: "ALL_NEW",
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results),
  };
};

module.exports = {
  handler: UpdateTodo,
};
