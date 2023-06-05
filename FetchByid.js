const AWS = require("aws-sdk");

const FetchtodoById = async (event) => {
    const {ID}=event.pathParameters 
  const DB = new AWS.DynamoDB.DocumentClient();
  let FetchById;
  try {
    const results = await DB.get({
      TableName: "TodoTable",
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

module.exports = {
  handler: FetchtodoById,
};
