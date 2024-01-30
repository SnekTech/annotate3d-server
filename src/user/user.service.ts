import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async onModuleInit() {
    const userCount = await this.userRepo.count();
    if (userCount > 0) return;

    const admin = new User();
    admin.isAdmin = true;
    await this.userRepo.save(admin);
  }

  async findUser(id: number) {
    return await this.userRepo.findOneBy({ userId: id });
  }
}
