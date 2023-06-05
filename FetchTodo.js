
const AWS = require("aws-sdk");

const Fetchtodo = async (event) => {
    const DB = new AWS.DynamoDB.DocumentClient();
    let Fetch
    try {
        const results = await DB.scan({ TableName: "TodoTable" }).promise();
        Fetch=results.Items
    } catch (error) {
        console.log(error)
    }
  

  console.log(Fetch);

  return {
    statusCode: 200,
    body: JSON.stringify(Fetch),
  };
};

module.exports = {
  handler: Fetchtodo,
};
