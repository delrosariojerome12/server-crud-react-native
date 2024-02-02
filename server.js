const express = require("express");
const cors = require("cors");
const initEndpoints = require("./controllers/index");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();

const corsOptions = {
  origin: "*",
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const initServer = async () => {
  initEndpoints(app);
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
  });
};

initServer();
