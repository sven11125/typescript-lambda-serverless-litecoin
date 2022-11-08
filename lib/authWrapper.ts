import { Users } from './../db/entities/Users';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context, Handler } from 'aws-lambda';
import { forbidden, unauthorized } from '@lib/response-lib';
import { getAuthenticatedUser, tryCheckUserRole } from '@lib/auth-lib';

export const authWrapper = (userRole: string, handler: Handler, isContainingNonAuth: boolean = false): (event: APIGatewayProxyEvent, context: Context, callback: Callback) => Promise<APIGatewayProxyResult> => async (
  event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyResult> => {
  if (isContainingNonAuth) {
    return handler(event, context, callback);
  }
  let user: Users;
  try {
    user = await getAuthenticatedUser(event.headers);
  } catch (e) {
    return await unauthorized({ message: e.message });
  }
  if (!user) {
    return await forbidden({ message: 'Not found user' });
  }
  try {
    tryCheckUserRole(user, userRole);
    event.requestContext.authorizer = { dbUser: user };
  } catch (e) {
    return await forbidden({ message: e.message });
  }
  return handler(event, context, callback);
};