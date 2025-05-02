import * as dotenv from 'dotenv';
dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value;
}

export const secrets = {
  ENV: requireEnv('NODE_ENV'),
  PORT: parseInt(requireEnv('PORT'), 10),
  MODE: requireEnv('MODE'),
  DB: requireEnv('DATABASE_URL'),
  REDIS_HOST: requireEnv('REDIS_HOST'),
  REDIS_PORT: parseInt(requireEnv('REDIS_PORT')),
  JWT_SECRET: requireEnv('JWT_SECRET'),
};
