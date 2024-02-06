const authMiddleware = async (req, res, next) => {
  try {
    // 여기에서 로그인된 사용자 정보를 확인하고 req.locals.user에 저장하는 로직이 있어야 합니다.
    const user = await getUserFromToken(req.headers.authorization);

    if (user) {
      req.locals.user = user;
    } else {
      // 사용자 정보가 없는 경우, 로그인이 필요하다는 메시지를 반환하거나 다른 처리를 수행할 수 있습니다.
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    next(); // 다음 미들웨어로 진행
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;

// 좀 더 공부하기!
