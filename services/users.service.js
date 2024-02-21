import { UsersRepository } from '../repositories/users.repository.js';

export class UsersService {
  usersRepository = new UsersRepository();

  // 회원가입
  createUsers = async (email, password, name, age, gender, profileImage) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUsers = await this.usersRepository.createUsers(
      email,
      hashedPassword,
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
    const loginedUsers = await this.usersRepository.loginUsers(email);

    if (!loginedUsers) {
      throw new Error('이메일이 존재하지 않습니다.');
    } else if (!(await bcrypt.compare(password, loginedUsers.password)))
      throw new Error('비밀번호가 일치하지 않습니다.');

    const token = jwt.sign(
      { userId: loginedUsers.userId },
      process.env.SECRET_KEY,
      { expiresIn: '12h' } // 12시간 유효
    );

    return {
      data: {
        userId: loginedUsers.userId,
        email: loginedUsers.email,
      },
      token,
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
