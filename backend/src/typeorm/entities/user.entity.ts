/* eslint-disable prettier/prettier */
import { hashPassword } from 'src/utils/helpers';
import { Exclude } from 'class-transformer';
import { Length } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { AuthProvidersEnum } from 'src/auth/enums/auth-providers.enum';
import { Transaction } from './transaction.entity';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum UserPermission {
  SuperAdmin = 'super-admin',
  Admin = 'admin',
  User = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  @Length(2, 100)
  name: string;

  @Column({ type: String, unique: true, nullable: true })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    await this.hashPassword();
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.password !== this.previousPassword) {
      await this.hashPassword();
    }
  }

  private async hashPassword() {
    if (this.password && !this.isPasswordHashed(this.password)) {
      console.log(`Hashing password: ${this.password}`);
      this.password = await hashPassword(this.password);
      console.log(`Hashed password: ${this.password}`);
    }
  }

  private isPasswordHashed(password: string): boolean {
    return password.startsWith('$2a$') || password.startsWith('$2b$');
  }

  @Column({ default: AuthProvidersEnum.email })
  provider: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Active })
  status: UserStatus;

  @Column({
    type: 'enum',
    enum: UserPermission,
    default: UserPermission.User,
  })
  permission: UserPermission;

  @Index()
  @Column({ type: String, nullable: true })
  socialId: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  balance: number;

  @Column({ type: Boolean, default: false })
  suspended: boolean;

  @Column({ type: 'text', nullable: true })
  picture: string;

  @Column({ type: 'timestamp', nullable: true })
  activationExpiry: Date | null;

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: true,
  })
  transactions: Transaction;

  @DeleteDateColumn()
  deletedAt?: Date;
}
