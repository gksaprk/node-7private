import { beforeEach, describe, expect, jest } from '@jest/globals';
import { DocumentsRepository } from '../../repositories/documentes.repository';

let mockPrisma = {
  documents: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

let documentsRepository = new DocumentsRepository(mockPrisma);

describe('Documents Respository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createDocuments Method', async () => {
    const mockReturn = 'createDocuments String';
    mockPrisma.documents.create.mockReturnValue(mockReturn);

    const createDocumentsParams = {
      userId: '1',
      title: 'createDocumentstitle',
      introduction: 'createDocumentsintroduction',
      name: 'createDocumentsname',
      status: 'createDocumentsstatus',
    };

    const createDocumentsData = await documentsRepository.createDocuments(
      createDocumentsParams.userId,
      createDocumentsParams.title,
      createDocumentsParams.introduction,
      createDocumentsParams.name,
      createDocumentsParams.status
    );

    expect(createDocumentsData).toEqual(mockReturn);

    expect(mockPrisma.documents.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.documents.create).toHaveBeenCalledWith({
      data: {
        userId: parseInt(createDocumentsParams.userId),
        title: createDocumentsParams.title,
        introduction: createDocumentsParams.introduction,
        name: createDocumentsParams.name,
        status: createDocumentsParams.status,
      },
    });
  });

  test('findAllDocuments Method', async () => {
    const mockReturn = 'findMany String';
    mockPrisma.documents.findMany.mockReturnValue(mockReturn);

    const documents = await documentsRepository.findAllDocuments();

    expect(documents).toBe(mockReturn);

    expect(documentsRepository.prisma.documents.findMany).toHaveBeenCalledTimes(
      1
    );
  });

  test('putDocuments Method', async () => {});

  test('deleteDocuments Method', async () => {});
});
