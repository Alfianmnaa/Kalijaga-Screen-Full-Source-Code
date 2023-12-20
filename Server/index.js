const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const watchRoutes = require("./src/routes/movies");
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");
const favoriteRoutes = require("./src/routes/favorite");

dotenv.config();

class Database {
  constructor() {
    // Set up MongoDB connection
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("Connected to mongoose"))
      .catch((err) => console.log(err));
  }

  _setupDatabase() {
    // Message setting database
    console.log("Setting up the database...");
  }
}

class App extends Database {
  constructor() {
    super();
    this._app = express();
    this._setupMiddlewares(); // Set up Express middleware
    this._setupRoutes(); // Set up Express routing
    this._startServer(); // Start Express server
  }

  _setupDatabase() {
    // Override the method in the parent class
    // Setting up the database in the App class
    console.log("Setting up the database for the app...");
  }

  _setupMiddlewares() {
    this._app.use(bodyParser.json());
    this._app.use(express.json());

    const corsOptions = {
      origin: ["https://kalijaga-screen.netlify.app/", "https://breakable-undershirt-cod.cyclic.app", "http://localhost:5173", "http://localhost:5174"],
      credentials: true,
    };

    this._app.use(cors(corsOptions));
    this._app.use(cookieParser());
  }

  _setupRoutes() {
    // Express routes
    this._app.use("/watch", watchRoutes);
    this._app.use("/auth", authRoutes);
    this._app.use("/user", userRoutes);
    this._app.use("/favorite", favoriteRoutes);
  }

  _startServer() {
    // Start
    const PORT = process.env.PORT || 4000;
    this._app.listen(PORT, () => {
      console.log("Backend movie is running in port " + PORT);
    });
  }
}

// Create an instance of the App class to start the application
const myApp = new App();
