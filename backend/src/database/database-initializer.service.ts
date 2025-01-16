/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseInitializerService implements OnModuleInit {
  constructor(
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    await this.runMigrations();
  }

  private async runMigrations() {
    await this.dataSource.runMigrations();
  }
}
