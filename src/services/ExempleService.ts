// import dateFormat = require("dateformat");
// import { Between, getCustomRepository } from "typeorm";
// import { ContactRepository } from "../repositories/ContactRepository";

// export class ContactService {
//   async create(data) {
//     try {
//       const contactRepository = getCustomRepository(ContactRepository);
//       const begin = dateFormat(new Date(), "yyyy-mm-dd 00:00:00");
//       const end = dateFormat(new Date(), "yyyy-mm-dd 23:59:59");
//       const existingContact = await contactRepository.findOne({
//         where: {
//           created_at: Between(begin, end),
//           client: data.client,
//           message: data.message,
//           seller: data.seller,
//         },
//       });

//       if (existingContact) {
//         existingContact.created_at = new Date();
//         await contactRepository.save(existingContact);

//         return { status: 201, message: "Contact Created" };
//       }

//       await contactRepository.save({ ...data });
//       return { status: 201, message: "Contact Created" };
//     } catch (e) {
//       console.log(e);
//       return { status: 400, message: e.message };
//     }
//   }
// }
