import express from 'express';
import { prisma } from '../models/index.js';
import authMiddleware from '../middlewares/need-signin.middlware.js';

import { DocumentsController } from '../controllers/documents.controller.js';

const router = express.Router();

const documentsController = new DocumentsController(); // 인스터화

// 게시글 생성
router.post('/', authMiddleware, documentsController.createDocuments);

// 게시글 목록조회
router.get('/', authMiddleware, documentsController.getDocuments);

// 게시글 상세조회
router.get('/:documentId', authMiddleware, documentsController.getDocument);

// 게시글 수정
router.put('/:documentId', authMiddleware, documentsController.putDocuments);

// 게시글 삭제
router.delete(
  '/:documentId',
  authMiddleware,
  documentsController.deleteDocuments
);

// router.post('/documents', authMiddleware, async (req, res, next) => {
//   try {
//     const { title, introduction, name, status } = req.body;
//     const { userId } = res.locals.user;

//     const document = await prisma.documents.create({
//       data: {
//         userId: +userId,
//         title: title,
//         introduction: introduction,
//         name: name,
//         status: status || 'APPLY',
//       },
//     });

//     return res.status(201).json({ data: document });
//   } catch (err) {
//     next(err);
//   }
// });
// // 목록조회
// router.get('/documents', async (req, res, next) => {
//   try {
//     // const { orderKey, orderValue } = req.query;

//     // const allowedOrderKeys = [
//     //   'userId',
//     //   'createdAt',
//     //   'titel',
//     //   'introduction',
//     //   'status',
//     //   'name',
//     //   'updatedAt',
//     // ];
//     // const isValidOrderKey = allowedOrderKeys.includes(orderKey);

//     // if (!isValidOrderKey) {
//     //   return res.status(400).json({ message: '유효하지 않은 키입니다.' });
//     // }

//     // const sortOrderValue =
//     //   orderValue?.toUpperCase() === 'DESC' ? 'desc' : 'asc';

//     const documents = await prisma.documents.findMany({
//       select: {
//         documentId: true,
//         userId: true,
//         title: true,
//         name: true,
//         status: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//       orderBy: {
//         // [orderKey]: sortOrderValue,
//         createdAt: 'desc', // 게시글을 최신순으로 정렬합니다.
//       },
//     });

//     return res.status(200).json({ data: documents });
//   } catch (err) {
//     next(err);
//   }
// });

// //상세조회

// router.get('/documents/:documentId', async (req, res, next) => {
//   try {
//     const { documentId } = req.params;
//     const document = await prisma.documents.findFirst({
//       where: {
//         documentId: +documentId,
//       },
//       select: {
//         documentId: true,
//         userId: true,
//         name: true,
//         title: true,
//         status: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });

//     return res.status(200).json({ data: document });
//   } catch (err) {
//     next(err);
//   }
// });

// // 수정
// router.put('/documents/:documentId', authMiddleware, async (req, res, next) => {
//   try {
//     const { title, introduction, status } = req.body;
//     const { documentId } = req.params;
//     const { userId } = res.locals.user;

//     // 내가 작성한 이력서인지 확인
//     const document = await prisma.documents.findFirst({
//       where: {
//         userId: userId,
//         documentId: +documentId,
//       },
//     });
//     if (!document) {
//       return res.status(400).json({ message: '이력서 조회에 실패하였습니다.' });
//     }

//     const updateDocument = await prisma.documents.update({
//       where: {
//         documentId: +documentId,
//       },
//       data: {
//         title,
//         introduction,
//         status,
//       },
//     });

//     return res.status(200).json({ data: updateDocument });
//   } catch (err) {
//     next(err);
//   }
// });

// // 삭제
// router.delete(
//   '/documents/:documentId',
//   authMiddleware,
//   async (req, res, next) => {
//     try {
//       const { documentId } = req.params;
//       const { userId } = res.locals.user;

//       // 내가 작성한 이력서인지 확인
//       const document = await prisma.documents.findFirst({
//         where: {
//           userId: +userId,
//           documentId: +documentId,
//         },
//       });
//       if (!document) {
//         return res
//           .status(400)
//           .json({ message: '이력서 조회에 실패하였습니다.' });
//       }

//       await prisma.documents.delete({
//         where: {
//           documentId: +documentId,
//         },
//       });

//       return res.status(200).json({ message: '이력서가 삭제되었습니다.' });
//     } catch (err) {
//       next(err);
//     }
//   }
// );

export default router;
