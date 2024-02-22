import { DocumentsService } from '../services/documentes.service.js';

export class DocumentsController {
  documentsService = new DocumentsService();

  // 게시글 생성
  createDocuments = async (req, res, next) => {
    try {
      const { title, introduction, name, status } = req.body;
      const { userId } = res.locals.user;

      const createDocuments = await this.documentsService.createDocuments(
        userId,
        title,
        introduction,
        name,
        status
      );

      return res.status(201).json({ data: createDocuments });
    } catch (err) {
      next(err);
    }
  };

  // 게시글 목록조회 API
  getDocuments = async (req, res, next) => {
    try {
      const getdocuments = await this.documentsService.findAllDocuments();

      return res.status(200).json({ data: getdocuments });
    } catch (err) {
      next(err);
    }
  };

  // 게시글 상세조회 API

  getDocument = async (req, res, next) => {
    try {
      const { documentId } = req.params;

      const getdocument = await this.documentsService.findDocument(documentId);

      return res.status(200).json({ data: getdocument });
    } catch (err) {
      next(err);
    }
  };

  // 게시글 수정
  putDocuments = async (req, res, next) => {
    try {
      const { title, introduction, status } = req.body;
      const { documentId } = req.params;
      // const { userId } = res.locals.user;

      const putDocuments = await this.documentsService.putDocuments(
        documentId,
        title,
        introduction,
        status
      );

      return res.status(200).json({ data: putDocuments });
    } catch (err) {
      next(err);
    }
  };

  // 게시글 삭제
  deleteDocuments = async (req, res, next) => {
    try {
      const { documentId } = req.params;
      // const { userId } = res.locals.user;
      const deletedDocuments = await this.documentsService.deleteDocuments(
        documentId
      );

      return res.status(200).json({ data: deletedDocuments });
    } catch (err) {
      next(err);
    }
  };
}
