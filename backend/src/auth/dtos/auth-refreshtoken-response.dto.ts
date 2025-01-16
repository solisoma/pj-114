/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOjcsImlhdCI6MTcxNjIwMTYzMSwiZXhwIjoxNzE2Mjg4MDMxfQ.epeKCgIWbehjeCSm8BW3tG1P9K3qgTdm3QSEEZJ0BwQ',
  })
  refreshToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywic2Vzc2lvbklkIjo3LCJpYXQiOjE3MTYyMDE2MzEsImV4cCI6MTcxNjI4ODAzMX0.xQRtDAmMqL3SBO1fYlJ0N18TdCzGwoVA7YXX_40Bpio',
  })
  token: string;

  @ApiProperty({
    example: 1716288031411,
  })
  tokenExpires: number;
}
