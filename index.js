require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const trackRoute = require("./routes/track");
const errorHandler = require("./routes/error");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(userRoute);
app.use(trackRoute);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: ", err));

app.use(errorHandler.error);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
