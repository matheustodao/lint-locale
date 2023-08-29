import { Configuration, OpenAIApi, ClientOptions, OpenAI } from 'openai';
import { OPENAI_API_KEY } from '../config/env';

/** @type {ClientOptions} */
const openaiConfigs = {
  apiKey: OPENAI_API_KEY,
};

const configuration = new Configuration(openaiConfigs);

/** @type {OpenAI} */
export const openai = new OpenAIApi(configuration);
