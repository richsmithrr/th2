const AWS = require("aws-sdk");
const crypto = require("crypto");

// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const order = event.body;
  console.log("Your Event: " + event.body)
  const row = { // Creating an Item with a unique id and with the passed name
      id: generateUUID(),
      name: order.name,
      amount: order.amount,
      date: order.date,
      shipTo: order.shipTo,
      creditCard: order.creditCard
    }
  
  const params = {
    TableName: "orders", // The name of your DynamoDB table
    ReturnValues: "ALL_OLD",
    Item: row
  };
  try {
    // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
    const data = await documentClient.put(params).promise();
    const response = {
      "statusCode": 200,
      "headers": {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(row)
    };
    console.log(JSON.stringify(data))
    return response; // Returning a 200 if the item has been inserted 
  }
  catch (e) {
    return {
      statusCode: 500,
        "headers": {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST"
        },
      body: JSON.stringify(e)
    };
  }
};
