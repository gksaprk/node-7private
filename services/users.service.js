import { UsersRepository } from '../repositories/users.repository.js';

export class UsersService {
  usersRepository = new UsersRepository();

  // 회원가입
  createUsers = async (email, password, name, age, gender, profileImage) => {
    const createdUsers = await this.usersRepository.createUsers(
      email,
      password,
      name,
      age,
      gender,
      profileImage
    );

    return {
      userId: createdUsers.userId,
      email: createdUsers.email,
      name: createdUsers.name,
      age: createdUsers.age,
      gender: createdUsers,
      profileImage: createdUsers.profileImage,
      createdAt: createdUsers.createdAt,
      updatedAt: createdUsers.updatedAt,
    };
  };

  // 로그인
  loginUsers = async (email, password) => {
    const loginedUsers = await this.usersRepository.loginUsers(email, password);

    return {
      userId: loginedUsers.userId,
      email: loginedUsers.email,
    };
  };

  // 사용자 정보 조회
  findAllUsers = async () => {
    const users = await this.usersRepository.findAllUsers();

    // 게시글 내림차순 정렬
    users.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // password 제외 controller에게 response 전달 ?? 보충 필요
    return users.map((user) => {
      return {
        userId: user.userId,
        name: user.name,
        age: user.age,
        gender: user.gender,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  };
}
