import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

// repositório tipo user
@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export { UsersRepository };
