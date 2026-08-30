import "../src/config/env.js"

import { connectCloudinary } from "./config/cloudinary.js";
import dbconnection from "./db/db.connection.js";
import app from "./app.js";




const port = process.env.PORT || 5000

connectCloudinary()
dbconnection()
app.listen(port, () => {
    try {
        console.log(`server is running on ${port}`)
    } catch (error) {
        console.log(error)
    }
})

export default app;