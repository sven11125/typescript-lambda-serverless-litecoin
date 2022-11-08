export const success = async (body) => await buildResponse(200, body);
export const unauthorized = async (body) => await buildResponse(401, body);
export const forbidden = async (body) => await buildResponse(403, body);
export const badRequest = async (body) => await buildResponse(400, body);
export const failure = async (body) => await buildResponse(500, body);
export const buildResponse = async (statusCode, body) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': "*"
    },
    body: JSON.stringify(body),
  };
};
