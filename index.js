import express from "express";
import sequelize from "./config/database.js";
import db from "./models/index.js";

import { router as apiRouter } from "./routes/index.js";
import { responseHandlers, errorHandler } from "./middlewares/responseHandlers.js";

const app = express();
app.use(express.json());
app.use(responseHandlers);
app.use(errorHandler);
app.use("/",apiRouter);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Database connected.');
    await db.sequelize.sync()

    app.listen(3000, () => console.log('Server running on port 3000'));
  } catch (err) {
    console.error('Unable to connect to the DB:', err);
  }
})();
