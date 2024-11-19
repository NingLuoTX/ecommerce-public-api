import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

interface ApiKeyInfo {
  clientId: string;
  createdAt: Date;
  expiresAt: Date;
}

@Injectable()
export class ApiKeysService {
  private apiKeys: Map<string, ApiKeyInfo> = new Map();

  generateApiKey(clientId: string, expirationDays = 30): string {
    const apiKey = randomBytes(32).toString('hex');
    const now = new Date();
    this.apiKeys.set(apiKey, {
      clientId,
      createdAt: now,
      expiresAt: new Date(now.getTime() + expirationDays * 24 * 60 * 60 * 1000),
    });
    return apiKey;
  }

  validateApiKey(apiKey: string): boolean {
    const keyInfo = this.apiKeys.get(apiKey);
    if (!keyInfo) return false;

    const now = new Date();
    if (now > keyInfo.expiresAt) {
      this.apiKeys.delete(apiKey);
      return false;
    }

    return true;
  }

  getClientInfo(apiKey: string) {
    return this.apiKeys.get(apiKey);
  }
}
