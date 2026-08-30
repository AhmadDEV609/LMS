import "../src/config/env.js";

import { connectCloudinary } from "./config/cloudinary.js";
import dbconnection from "./db/db.connection.js";
import app from "./app.js";

await dbconnection();
connectCloudinary();

export default app;
