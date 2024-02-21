import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import UsersRouter from './routers/users.router.js';
import LogMiddleware from './middlewares/log.middleware.js';
import DocumentsRouter from './routers/documents.router.js';
import ErrorHandlingMiddleware from './middlewares/error-handling-middleware.js';

const app = express();
const port = process.env.PORT || 3020;
// const databaseUrl = process.env.DATABASE_URL;
// console.log(databaseUrl);

app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());

app.use('/users', UsersRouter);
app.use('/documents', DocumentsRouter);
app.use(ErrorHandlingMiddleware);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
