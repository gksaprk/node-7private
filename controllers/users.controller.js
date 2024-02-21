import { UsersService } from '../services/users.service.js';

export class UsersController {
  usersService = new UsersService();

  // 회원가입API
  postUserssignup = async (req, res, next) => {
    try {
      const { email, password, name, age, gender, profileImage } = req.body;

      const createdUsers = await this.usersService.createUsers(
        email,
        password,
        name,
        age,
        gender,
        profileImage
      );

      return res.status(200).json({ data: createdUsers });
    } catch (err) {
      next(err);
    }
  };

  // 로그인  API
  postUserssignin = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const loginedUsers = await this.usersService.loginUsers(email, password);

      return res.status(200).json({ data: loginedUsers });
    } catch (err) {
      next(err);
    }
  };

  // 사용자 정보 조회API

  getUsers = async (req, res, next) => {
    try {
      const users = await this.usersService.findAllUsers();

      return res.status(200).json({ data: users });
    } catch (err) {
      next(err);
    }
  };
}
