import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class RequestService {
  private readonly logger = new Logger(RequestService.name);

  constructor(private readonly httpService: HttpService) {}

  async post(url: string, body: any): Promise<AxiosResponse<any>> {
    try {
      this.logger.log(
        `Sending POST request to ${url} with body: ${JSON.stringify(body)}`,
      );
      const response = await firstValueFrom(this.httpService.post(url, body));
      this.logger.log(
        `Response received from ${url}: ${JSON.stringify(response.data)}`,
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        this._handleError(error, url);
      }
    }
  }

  async get(url: string, params?: any): Promise<AxiosResponse<any>> {
    try {
      this.logger.log(
        `Sending GET request to ${url} with params: ${JSON.stringify(params)}`,
      );
      const response = await firstValueFrom(
        this.httpService.get(url, { params }),
      );
      this.logger.log(
        `Response received from ${url}: ${JSON.stringify(response.data)}`,
      );
      return response.data;
    } catch (error) {
      this._handleError(error, url);
    }
  }

  async put(url: string, body: any): Promise<AxiosResponse<any>> {
    try {
      this.logger.log(
        `Sending PUT request to ${url} with body: ${JSON.stringify(body)}`,
      );
      const response = await firstValueFrom(this.httpService.put(url, body));
      this.logger.log(
        `Response received from ${url}: ${JSON.stringify(response.data)}`,
      );
      return response.data;
    } catch (error) {
      this._handleError(error, url);
    }
  }

  private _handleError(error: any, url: string): never {
    this.logger.error(`Failed request to ${url}: ${error.message}`);

    if (error.response) {
      const { status, data } = error.response;
      this.logger.error(
        `Response error: ${status}, Data: ${JSON.stringify(data)}`,
      );
      throw new HttpException(
        `Error response from ${url}: ${JSON.stringify(data)}`,
        status,
      );
    } else if (error.request) {
      this.logger.error(`No response received from ${url}`);
      throw new HttpException(`No response from ${url}: ${error.message}`, 504);
    } else {
      this.logger.error(`Error setting up request: ${error.message}`);
      throw new HttpException(
        `Error setting up request to ${url}: ${error.message}`,
        500,
      );
    }
  }
}
