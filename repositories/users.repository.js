import { prisma } from '@prisma/client';

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

  // 로그인  // ????
  loginUsers = async (email, password) => {
    const loginedUsers = await prisma.users.findFirst({
      where: { email, password },
      data: {
        password: loginedUsers.password,
      },
    });

    // 비밀번호가 맞아야한다.

    return loginUsers;
  };

  // 사용자 정보 조회
  findAllUsers = async () => {
    const users = await prisma.users.findMany();

    return users;
  };
}
