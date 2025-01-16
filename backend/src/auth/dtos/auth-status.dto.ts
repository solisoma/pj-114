/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class StatusResponseDto {
  @ApiProperty({
    example: 3,
  })
  id: number;

  @ApiProperty({
    example: 'Ufere Kalu',
  })
  name: string;

  @ApiProperty({
    example: 'dekalusha@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: '$2a$10$eyWJ.YyD55h3htmUOVLEteFovyOEM6goCwV93rErVdaQhB/rwQAju',
  })
  password: string;

  @ApiProperty({
    example: 'email',
  })
  provider: string;

  @ApiProperty({
    example: 'active',
  })
  status: string;

  @ApiProperty({
    example: null,
  })
  socialId: string;

  @ApiProperty({
    example: '2024-05-20T00:01:54.840Z',
  })
  createdAt: string;

  @ApiProperty({
    example: null,
  })
  hash: string;

  @ApiProperty({
    example: '2024-05-20T10:23:28.000Z',
  })
  updatedAt: string;

  @ApiProperty({
    example: null,
  })
  picture: string;

  @ApiProperty({
    example: '$2a$10$eyWJ.YyD55h3htmUOVLEteFovyOEM6goCwV93rErVdaQhB/rwQAju',
  })
  previousPassword: string;
}
