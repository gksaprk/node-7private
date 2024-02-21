import { DocumentsRepository } from '../repositories/documentes.repositiory.js';

export class DocumentsService {
  documentsRepository = new DocumentsRepository();

  // 게시글 생성
  createDocuments = async (title, introduction, name, status) => {
    const createDocuments = await this.documentsRepository.createDocuments(
      title,
      introduction,
      name,
      status
    );

    return {
      documentId: createDocuments.documentId,
      title: createDocuments.title,
      introduction: createDocuments.introduction,
      name: createDocuments.name,
      status: createDocuments.status,
      createdAt: createDocuments.createdAt,
      updatedAt: createDocuments.updatedAt,
    };
  };

  // 게시글 목록조회
  findAllDocuments = async () => {
    const documents = await this.documentsRepository.findAllDocuments();

    // 내림차순
    documents.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // response 전달
    return documents.map((document) => {
      return {
        documentId: document.documentId,
        title: document.title,
        introduction: document.introduction,
        name: document.name,
        status: document.status,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      };
    });
  };

  // 게시글 상세조회
  findDocument = async (documentId) => {
    const document = await this.documentsRepository.findDocument(documentId);

    return {
      documentId: document.documentId,
      title: document.title,
      introduction: document.introduction,
      name: document.name,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  };

  // 게시글 수정
  putDocuments = async (documentId, title, introduction, status) => {
    const documents = await this.documentsRepository.findDocument(documentId);
    if (!documents) throw new Error('존재하지 않는 게시글입니다.');

    await this.documentsRepository.putDocuments(
      documentId,
      title,
      introduction,
      status
    );

    // 변경된 데이터 조회
    const putDocuments = await this.documentsRepository.findDocument(
      documentId
    );

    return {
      documentId: putDocuments.documentId,
      title: putDocuments.title,
      introduction: putDocuments.introduction,
      status: putDocuments.status,
      createdAt: putDocuments.createdAt,
      updatedAt: putDocuments.updatedAt,
    };
  };

  // 게시글 삭제
  deleteDocuments = async (documentId, password) => {
    const documents = await this.documentsRepository.findDocument(documentId);

    if (!documents) throw new Error('존재하지 않는 게시글입니다.');

    await this.documentsRepository.deleteDocuments(documentId, password);

    return {
      documentId: documents.documentId,
      title: documents.title,
      introduction: documents.introduction,
      status: documents.status,
      createdAt: documents.createdAt,
      updatedAt: documents.updatedAt,
    };
  };
}
