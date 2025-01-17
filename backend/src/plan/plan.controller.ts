/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Routes } from 'src/utils/constants';
import { AuthGuard } from '@nestjs/passport';
import { PlanDto } from './dto/PlanDto';
import { Plan } from '@app/typeorm/entities/plan.entity';
import { PlanService } from './plan.service';

@ApiTags('CopyTrade')
@Controller(Routes.Plan)
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('subscribe')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Subscribe user' })
  @ApiResponse({
    status: 204,
    description: 'User subscribed successfully',
  })
  async subscribeUser(
    @Body(new ValidationPipe()) planDto: PlanDto,
    @Req() req: any,
  ): Promise<Plan> {
    const userId = req.user.id;
    return this.planService.subscribeUser(userId, planDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Trades fetched successfully',
  })
  async changeUserStatus(@Req() req: any): Promise<Plan[]> {
    const userId = req.user.id;
    return this.planService.getSubscribedUser(userId);
  }
}
