import { Body, Controller, Post } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GenerateApiKeyDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;
}

@ApiTags('API Keys')
@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Post()
  @ApiOperation({ summary: 'Generate new API key' })
  @ApiResponse({
    status: 201,
    description: 'The API key has been successfully generated.',
    schema: {
      type: 'object',
      properties: {
        apiKey: {
          type: 'string',
          example: '1234567890abcdef',
        },
      },
    },
  })
  generateApiKey(@Body() generateApiKeyDto: GenerateApiKeyDto) {
    const apiKey = this.apiKeysService.generateApiKey(
      generateApiKeyDto.clientId,
    );
    return { apiKey };
  }
}
