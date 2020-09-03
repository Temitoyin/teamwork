const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
dotenv.config();
const port = process.env.PORT || 3000;

//Routes
const userRoutes = require("./routes/user");
const gifRoutes = require("./routes/gif");
//Db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

const app = express();
//Middle wares

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
//Router middle ware
app.use("/api-v1", userRoutes);
app.use("/api-v1", gifRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
