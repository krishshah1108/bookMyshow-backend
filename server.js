import express from "express";
import dotenv from "dotenv";
import routes from "./routes/route.js";
import init_db from "./config/inti_db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
init_db();

routes.forEach((route) => {
    app.use(route.path, route.route);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
