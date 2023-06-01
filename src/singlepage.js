const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

exports.Addtodo = async (event) => {
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
    TableName: "TodoTables",
    Item: NewTodo,
  }).promise();

  console.log(NewTodo);

  return {
    statusCode: 200,
    body: JSON.stringify(NewTodo),
  };
};

exports.FetchtodoById = async (event) => {
  const { ID } = event.pathParameters;
  const DB = new AWS.DynamoDB.DocumentClient();
  let FetchById;
  try {
    const results = await DB.get({
      TableName: "TodoTables",
      Key: {
        id: ID,
      },
    }).promise();
    FetchById = results.Item;
  } catch (error) {
    console.log(error);
  }

  console.log(FetchById);

  return {
    statusCode: 200,
    body: JSON.stringify(FetchById),
  };
};
exports.Fetchtodo = async (event) => {
  const DB = new AWS.DynamoDB.DocumentClient();
  let Fetch;
  try {
    const results = await DB.scan({ TableName: "TodoTables" }).promise();
    Fetch = results.Items;
  } catch (error) {
    console.log(error);
  }

  console.log(Fetch);

  return {
    statusCode: 200,
    body: JSON.stringify(Fetch),
  };
};

exports.UpdateTodo = async (event) => {
  const { ID } = event.pathParameters;
  const { Completed } = JSON.parse(event.body);
  const DB = new AWS.DynamoDB.DocumentClient();

  const results = await DB.update({
    TableName: "TodoTables",
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
