import { getCustomRepository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import UsersRepository from '../../repositories/UsersRepository';
import User from '../../models/User';

interface IRequestDTO {
  id: string;
  name: string;
  password: string;
  local_id: string;
  role_id: string;
  active: boolean;
}

class UpdateUserService {
  public async execute(toUpdateUser: IRequestDTO): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);

    const existUser = await usersRepository.findOne({
      where: {
        name: toUpdateUser.name,
      },
    });

    if (existUser) {
      throw new Error('Nome já registrado na base de dados');
    }

    if (toUpdateUser.password) {
      const salt = await genSalt(10);

      toUpdateUser.password = await hash(toUpdateUser.password, salt);
    } else {
      // @ts-ignore
      delete toUpdateUser.password;
    }

    const updateResult = await usersRepository.update(
      {
        id: toUpdateUser.id,
      },
      toUpdateUser,
    );

    if (updateResult.affected) {
      return await usersRepository.findOne({
        where: { id: toUpdateUser.id },
      });
    }
    return undefined;
  }
}

export default UpdateUserService;
