import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import helmet from "helmet";
import { limiterConfig } from "./config/rateLimitConfig";
import { env } from "./config/envConfig";
import connectDB from "./config/dbConfig";
import cookieParser from 'cookie-parser';


// import { throttleConfig } from "./config/throttleConfig.cjs";
const app: Application = express();

// ===== Middleware =====

//rate-limit
app.use(limiterConfig);

//api thorttle
// app.use(throttleConfig);

// Security middleware to set various HTTP headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)

app.use(cors({
  origin: 'http://localhost:5173', // or your frontend URL
  credentials: true, // ✅ allow cookies
}));


// Parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());  // 👈 This enables reading cookies from requests

// Parse URL-encoded data with extended option
app.use(express.urlencoded({ extended: true }));

// Log HTTP requests in development mode
app.use(morgan("dev"));

// ===== API Routes =====
app.use(env.BASIC_API_URL, routes);

//connect db
connectDB();

// ===== Health Check =====
app.get("/", async(req, res) => {
  res.send("API is running");
//   const saveUser = async () => {
//   try {
//     const userData = {
//   name: "John Doe",
//   email: "user@gmail.com",
//   phone: "1232327890",
//   role: "user", // or 'researcher', 'admin', 'user'
//   password: "$2b$10$52Zqi8QgiS6muzdvFjprKO6NhAZaK3qajMO3y2.ftChmn88k7wmaK",
// };
//     const newUser = new User(userData);
//     await newUser.save(); // This will automatically hash the password before saving
//     console.log("User saved successfully:", newUser);
//   } catch (error) {
//     console.error("Error saving user:", error);
//   }
// };
// saveUser()
});





export default app;
