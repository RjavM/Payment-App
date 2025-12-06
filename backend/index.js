const express = require("express");
const app = express();
const mainRouter = require("./routes/index")
const cors = require("cors")
const { PORT, MONGODB_URI, FRONTEND_URL, NODE_ENV } = require("./config")
const mongoose = require("mongoose")

// Connect to MongoDB with retry logic
async function connectToMongoDB() {
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        console.log("Retrying connection in 5 seconds...");
        setTimeout(connectToMongoDB, 5000);
    }
}


connectToMongoDB();

app.use(express.json());


const corsOptions = {
    origin: NODE_ENV === 'production' ? FRONTEND_URL : true,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});





