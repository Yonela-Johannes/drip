const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const mongoose = require('mongoose')
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { authMiddleware, isAdmin } = require("./middleware/authMiddleware");
const { handleError, notFound } = require("./middleware/errorHandler");
// Route imports
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const category = require('./routes/CategoryRouter');
const address = require('./routes/AddressRouter');
// const payment = require("./routes/PaymentRoute");
// const cart = require("./routes/WishListRoute");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const cloudinary = require("cloudinary");
const { createProducts } = require("./data/createProducts");
const { getAllUsers } = require("./controllers/UserController");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 12 * 60 * 60
    })
  })
)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: ['http://localhost:5173', 'https://be-pleasered-by-pinky.vercel.app'], credentials: true }));

app.get("/", getAllUsers());

app.use("/api", product);
app.use("/api", user);
app.use("/api", order);
app.use("/api", category);
app.use("/api", address);

// createProducts()
// app.use("/api/v1",payment);
// app.use("/api/v2",cart);

app.use(notFound)
app.use(handleError)


app.listen(PORT, () =>
{
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  })
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err.message));
  console.log(`Server is running at http://localhost:${PORT}`)
});

module.exports = app;