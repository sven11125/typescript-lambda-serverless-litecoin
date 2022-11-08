import * as AWS from 'aws-sdk';
import CONFIG from '../config';

AWS.config.update({
  accessKeyId: CONFIG.accessKeyId,
  secretAccessKey: CONFIG.secretAccessKey,
  region: CONFIG.region,
});

export const makeUsername = (name: string): string => {
  return name.replace(/ /g, "_").toLocaleLowerCase();
}