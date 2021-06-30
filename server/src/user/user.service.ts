import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { USER_REPOSITORY } from '../common/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findCount(): Promise<number> {
    return this.userRepository.count();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username: username } });
  }

  async create(user: User): Promise<User> {
    const result = await this.userRepository.insert(user);
    return this.userRepository.findOne({
      where: { id: result?.identifiers[0].id },
    });
  }

  async update(user: User): Promise<User> {
    const result = await this.userRepository.save(user);
    return this.userRepository.findOne({ where: { id: user.id } });
  }
}
