import express from "express";
import cookieParser from "cookie-parser";
import UsersRouter from "./routers/users.router.js";
import DocumentsRouter from "./routers/documents.router.js";

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());

// 예시: public 디렉터리의 파일을 정적 파일로 서빙
app.use(express.static("public"));

app.use("/api", UsersRouter, DocumentsRouter);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
