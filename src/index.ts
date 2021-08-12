import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as cors from "cors";
import { router } from "./routes/routes";
import * as swaggerUi from "swagger-ui-express";

import * as swaggerDocs from "./swagger.json";

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb" }));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.use("/", router);

    app.listen(5000);

    console.log(
      "Express server has started on port 5000. Open http://localhost:5000/users to see results"
    );
  })
  .catch((error) => console.log(error));
