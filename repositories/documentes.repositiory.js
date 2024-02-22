import { prisma } from '../models/index.js';

export class DocumentsRepository {
  // 게시글생성
  createDocuments = async (userId, title, introduction, name, status) => {
    userId = parseInt(userId);

    const createdDocuments = await prisma.documents.create({
      data: {
        userId,
        title,
        introduction,
        name,
        status,

        // 새 문서를 생성한 사용자의 userId
      },
    });
    return createdDocuments;
  };

  // 게시글 목록조회
  findAllDocuments = async () => {
    const documents = await prisma.documents.findMany();

    return documents;
  };

  // 게시글 상세조회
  findDocument = async (documentId) => {
    // documentId = parseInt(documentId);

    const document = await prisma.documents.findUnique({
      where: { documentId: parseInt(documentId) },
    });

    return document;
  };

  // 게시글 수정
  putDocuments = async (documentId, title, introduction, status) => {
    const documents = await prisma.documents.update({
      where: { documentId: parseInt(documentId) },
      data: {
        title,
        introduction,
        status,
      },
    });

    return documents;
  };

  // 게시글 삭제
  deleteDocuments = async (documentId) => {
    const documents = await prisma.documents.delete({
      where: {
        documentId: parseInt(documentId),
      },
    });

    return documents;
  };
}
