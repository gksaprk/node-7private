import { prisma } from '@prisma/client';

export class DocumentsRepository {
  // 게시글생성
  createDocuments = async (title, introduction, name, status) => {
    const createDocuments = await prisma.documents.create({
      data: {
        title,
        introduction,
        name,
        status,
      },
    });
    return createDocuments;
  };

  // 게시글 목록조회
  findAllDocuments = async () => {
    const documents = await prisma.documents.findMany();

    return documents;
  };

  // 게시글 상세조회
  findDocument = async (documentId) => {
    const document = await prisma.document.findUnique({
      where: { documentId: +documentId },
    });

    return document;
  };

  // 게시글 수정
  putDocuments = async (documentId, title, introduction, status) => {
    const documents = await prisma.documents.update({
      where: { documentId: +documentId, password },
      data: {
        title,
        introduction,
        status,
      },
    });

    return documents;
  };

  // 게시글 삭제
  deleteDocuments = async (documentId, password) => {
    const documents = await prisma.documents.delete({
      where: {
        documentId: +documentId,
        password: password,
      },
    });

    return documents;
  };
}
