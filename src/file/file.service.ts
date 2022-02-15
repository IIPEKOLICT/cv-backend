import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { ApiError } from '../errors/api.error';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable()
export class FileService {
  private azureUser: string = process.env.AZURE_USER || '';
  private azureContainer: string = process.env.AZURE_CONTAINER || '';
  private azureUrl: string = process.env.AZURE_URL || '';

  async create(file?: Express.Multer.File): Promise<string> {
    if (!file) {
      return '';
    }

    try {
      const fileName = `${v4()}.png`;

      await BlobServiceClient.fromConnectionString(this.azureUrl)
        .getContainerClient(this.azureContainer)
        .getBlockBlobClient(fileName)
        .uploadData(file.buffer);

      return `https://${this.azureUser}.blob.core.windows.net/${this.azureContainer}/${fileName}`;
    } catch (e) {
      console.log(e);
      ApiError.filesystem();
    }
  }
}
