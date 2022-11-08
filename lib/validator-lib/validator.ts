import { ObjectSchema } from '@hapi/joi';
import { usersValidatorSchema } from '@lib/validator-lib/requestSchemas';

export enum SchemaName {
  USERS = 'USERS'
}


const schemas: { [schemaName: string]: ObjectSchema<any> } = {
  USERS: usersValidatorSchema
};

export const requestValidator = (schemaName: SchemaName, requestBody: any, requiredKeys?: string[]): {
  error: Error;
  request: { [key: string]: any; };
} => {
  let objToValidate = {};
  try {
    if (!requestBody) {
      throw new Error('Missing body');
    }
    if (typeof requestBody === 'string') {
      requestBody = JSON.parse(requestBody);
    }
    if (!requiredKeys || !requiredKeys.length) {
      objToValidate = requestBody;
    } else {
      requiredKeys.map(key => {
        if (requestBody.hasOwnProperty(key)) {
          objToValidate[key] = requestBody[key];
        } else {
          throw new Error(`Invalid key ${key}`);
        }
      });
    }
    const result = schemas[schemaName].validate(objToValidate);
    if (result.error && result.error.details && result.error.details.length) {
      throw new Error(result.error.details.map(detail => detail.message).toString());
    }
    return { error: null, request: result.value };
  } catch (e) {
    return { error: e, request: null };
  }
};
