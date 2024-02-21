import { prisma } from '../models/index.js';

export class UsersRepository {
  // 회원가입
  createUsers = async (email, password, name, age, gender, profileImage) => {
    const createUsers = await prisma.users.create({
      data: {
        email,
        password,
        name,
        age,
        gender,
        profileImage,
      },
    });

    return createUsers;
  };

  // 로그인  // ????// 비밀번호가 필요없다 >> service 에서 처리하기 때문에
  loginUsers = async (email) => {
    const loginedUsers = await prisma.users.findFirst({
      where: { email },
    });

    // 비밀번호가 맞아야한다.

    return loginedUsers;
  };

  // 사용자 정보 조회
  findAllUsers = async () => {
    const users = await prisma.users.findMany();

    return users;
  };
}
