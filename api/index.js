import { app } from './app.js';
import connectDB from "./db/database.js";
import dotenv from 'dotenv';

// Load environment variables from the specified file
dotenv.config({ path: './.env' });

// Connect to the MongoDB database
connectDB()
    .then(() => {
        // Handle errors in the application
        app.on("error", (err) => {
            console.log("ERROR: ", err);
        });

        // Start the Express server on the specified port or default to 8000
        const port = process.env.PORT || 8000;
        app.listen(port, process.env.IP_ADDRESS, () => {
            console.log(`Server is running at port: http://${process.env.IP_ADDRESS}:${port}`);
        });
    })
    .catch((error) => {
        console.log("MONGODB connection failed !!!", error);
    });