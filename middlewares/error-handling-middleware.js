// 에러처리 미들웨어

export default function (err, req, res, next) {
  console.error(err);

  res.status(500).json({ message: "서버내부에서 에러가 발생했습니다." });
}
