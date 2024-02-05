import express from "express";
import { prisma } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/need-signin.middlware.js";
import { Prisma } from "@prisma/client";

const router = express.Router();

/** 사용자 회원가입 API **/
router.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password, name, age, gender, profileImage } = req.body;
    const isExistUser = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (isExistUser) {
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "비밀번호는 최소 6자 이상입니다." });
    }
    if (password !== password) {
      return res
        .status(400)
        .json({ message: " 비밀번호 확인이 일치하지 않습니다." });
    }

    // Users 테이블에 사용자를 추가합니다. + hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // 트랜잭션
    const [user, userInfo] = await prisma.$transaction(
      async (tx) => {
        const user = await tx.users.create({
          data: { email, password: hashedPassword },
        });
        // UserInfos 테이블에 사용자 정보를 추가합니다.
        const userInfo = await tx.userInfos.create({
          data: {
            userId: user.userId, // 생성한 유저의 userId를 바탕으로 사용자 정보를 생성합니다.
            name,
            age,
            gender,
            profileImage,
          },
        });
        return [user, userInfo];
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
      }
    );

    return res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (err) {
    next(err);
  }
});

/** 로그인 API **/
router.post("/sign-in", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.users.findFirst({ where: { email } });

    if (!user)
      return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
    // 입력받은 사용자의 비밀번호와 데이터베이스에 저장된 비밀번호를 비교합니다.
    else if (!(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });

    // 로그인에 성공하면, 사용자의 userId를 바탕으로 토큰을 생성합니다.
    const token = jwt.sign(
      {
        userId: user.userId,
      },
      "custom-secret-key",
      { expiresIn: "12h" } // 12시간 유효
    );

    // authotization 쿠키에 Berer 토큰 형식으로 JWT를 저장합니다.
    res.cookie("authorization", `Bearer ${token}`);
    return res.status(200).json({ message: "로그인 성공하였습니다." });
  } catch (err) {
    next(err);
  }
});

router.get("/users", authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await prisma.users.findFirst({
      where: { userId: +userId },
      select: {
        userId: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        userInfos: {
          // 1:1 관계를 맺고있는 UserInfos 테이블을 조회합니다.
          select: {
            name: true,
            age: true,
            gender: true,
            profileImage: true,
          },
        },
      },
    });

    return res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
});

export default router;
