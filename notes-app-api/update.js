import * as dynamoDBLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export const main = async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: 'notes',
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        UpdateExpression: 'SET content = :content, attachment = :attachment',
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const result = await dynamoDBLib.call('update', params);
        return success({ state: true });
    } catch(e) {
        console.log(e);
        return failure({ state: false });
    }
};