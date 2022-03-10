import { getCustomRepository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import UsersRepository from '../../repositories/UsersRepository';
import User from '../../models/User';

interface IRequestDTO {
  name: string;
  password: string;
  local_id: string;
  role_id: string;
  active: boolean;
}

class CreateUserService {
  public async execute(user: IRequestDTO): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);

    const existUser = await usersRepository.findOne({
      where: {
        name: user.name,
      },
    });

    if (existUser) {
      throw new Error('Nome já registrado na base de dados');
    }

    const salt = await genSalt(10);

    user.password = await hash(user.password, salt);

    try {
      const newUser = usersRepository.create(user);
      await usersRepository.save(newUser);
      return newUser;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateUserService;
