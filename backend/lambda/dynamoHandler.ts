import { EventBridgeEvent, Context } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME as string;


export const handler = async (event: EventBridgeEvent<string, any>) => {
    try {
        if (event["detail-type"] === "addTodo") {
            const params = {
                TableName: TABLE_NAME,
                Item: { ...event.detail },
            } 

            await dynamoClient.put(params).promise();
        }

        else if (event["detail-type"] === "deleteTodo") {
            const params = {
                TableName: TABLE_NAME,
                Key: { id: event.detail.id },
            }

            await dynamoClient.delete(params).promise();
        }
    } catch (error) {
        console.log("ERROR ====>", error);
    }
};