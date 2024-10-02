import express from "express";
import { router } from "./src/routes/RecipeRoute.js";
import { routerC } from "./src/routes/CategoryRoute.js";
import cors from "cors";

const app = express();
const port = 3002;

const corsOptions = {
  origin: (origin, callback) => {
    if (["http://localhost:5174"].includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(router);
app.use(routerC);

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
