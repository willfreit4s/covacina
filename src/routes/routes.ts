import { response, Response, Router } from "express";
import { UserController } from "../controller/UserController";
import { DoctorController } from "../controller/DoctorController";
import { ExampleBaseRequest } from "../utils/ExampleBaseRequest";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const router = Router();

router.get("/terms", async (req: ExampleBaseRequest, res: Response) => {
  return res.json({
    message: "Termos de Serviço: Minha primeira API com Documentação",
  });
});
// ==============================================================================================================
// Quando quiser saber quem é o loggedUser, fazer:
// const loggedUser = req.user;
// E passar para a controller.

router.post("/login", async (req: ExampleBaseRequest, res: Response) => {
  const userController = new UserController();
  const response = await userController.login(req.body);
  if (!response.token) {
    return res.status(401).json(response);
  }
  return res.status(200).json(response);
});

router.post("/users", async (req: ExampleBaseRequest, res: Response) => {
  const userController = new UserController();
  const response = await userController.create(req.body, res);
  return res.status(200).json(response);
});

router.get(
  "/users",
  [AuthMiddleware],
  async (req: ExampleBaseRequest, res: Response) => {
    const userController = new UserController();
    const response = await userController.all();
    return res.status(200).json(response);
  }
);

// Exemplo passando o usuário logado
router.post(
  "/doctor",
  [AuthMiddleware],
  async (req: ExampleBaseRequest, res: Response) => {
    const loggedUser = req.user;
    const doctorController = new DoctorController();
    const response = await doctorController.create(req.body, loggedUser, res);
    return res.status(200).json(response);
  }
);

// Exemplo passando o usuário logado
// router.post(
//   "/seller",
//   [AuthMiddleware],
//   async (req: ExampleBaseRequest, res: Response) => {
// usuário logado
//     const loggedUser = req.user;
//     const sellerController = new SellerController();
//     const response = await sellerController.save(req.body.name, loggedUser);
//     return res.status(200).json(response);
//   }
// );

// router.put(
//   "/clients/updateStatus",
//   [AuthMiddleware],
//   async (req: ExampleBaseRequest, res: Response) => {
//     try {
//       const clientController = new ClientController();
//       const response = await clientController.updateClientStatus(req.body.data);
//       return res.status(200).json(response);
//     } catch (e) {
//       console.log(e);
//       return res.status(400).json({ message: e.message });
//     }
//   }
// );

// router.delete(
//   "/seller",
//   [AuthMiddleware],
//   async (req: ExampleBaseRequest, res: Response) => {
//     try {
//       const sellerController = new SellerController();
//       const response = await sellerController.delete(req.query.id);
//       return res.status(200).json(response);
//     } catch (e) {
//       console.log(e);
//       return res.status(400).json({ message: e.message });
//     }
//   }
// );


// module.exports = router;
export { router };
