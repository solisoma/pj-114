/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/typeorm/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOjIsImlhdCI6MTcxNjE0ODA0NywiZXhwIjoxNzE2MjM0NDQ3fQ.258xCDCNXGkd3t2e-4dqGkp5GgavjXlTXtBprIZ6oAY',
  })
  refreshToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic2Vzc2lvbklkIjoyLCJpYXQiOjE3MTYxNDgwNDcsImV4cCI6MTcxNjIzNDQ0N30.7Wmgp_Mdo578vpGJZrTVuNQ7zGtShPN0Qo7SU5DnuYQ',
  })
  token: string;

  @ApiProperty({
    example: 1716234447777,
  })
  tokenExpires: number;

  @ApiProperty({
    type: User,
  })
  user: User;
}
