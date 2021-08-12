import { EntityRepository, Repository } from "typeorm";
import { Address } from "../entity/Address";

// repositório tipo user
@EntityRepository(Address)
class AddressRepository extends Repository<Address> {}

export { AddressRepository };
