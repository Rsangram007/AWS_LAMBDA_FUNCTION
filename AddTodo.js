
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

const Addtodo = async (event) => {
  const { Todo } = JSON.parse(event.body);
  const CreatedAt = new Date().toISOString();
  const id = uuidv4();
  const NewTodo = {
    id,
    Todo,
    CreatedAt,
    Completed: false,
  };

  const DB = new AWS.DynamoDB.DocumentClient();
  await DB.put({
    TableName: "TodoTable",
    Item: NewTodo,
  }).promise();

  console.log(NewTodo);

  return {
    statusCode: 200,
    body: JSON.stringify(NewTodo),
  };
};

module.exports = {
  handler: Addtodo,
};
