declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGO_URL: string;
    CORS_ORIGIN: string;
    SESSION_SECRET: string;
  }
}