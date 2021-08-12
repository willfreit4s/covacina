import { EntityRepository, Repository } from "typeorm";
import { Doctor } from "../entity/Doctor";

// repositório tipo user
@EntityRepository(Doctor)
class DoctorRepository extends Repository<Doctor> {}

export { DoctorRepository };
