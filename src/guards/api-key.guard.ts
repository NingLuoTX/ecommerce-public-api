import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ApiKeysService } from '../api-keys/api-keys.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private apiKeysService: ApiKeysService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.header('x-api-key');

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    if (!this.apiKeysService.validateApiKey(apiKey)) {
      throw new UnauthorizedException('Invalid API key');
    }

    const clientInfo = this.apiKeysService.getClientInfo(apiKey);
    request['clientInfo'] = clientInfo;

    return true;
  }
}
