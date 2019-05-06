import * as dynamoDBLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export const main = async (event, context) => {
    const params = {
        TableName: 'notes',
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDBLib.call('delete', params);
        return success({ state: true });
    } catch(e) {
        console.log(e);
        return failure({ state: false });
    }
};