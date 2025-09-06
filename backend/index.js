const express = require("express");
const app = express();
const mainRouter = require("./routes/index")
const cors = require("cors")
const { PORT, MONGODB_URI, FRONTEND_URL, NODE_ENV } = require("./config")
const mongoose = require("mongoose")

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process if database connection fails
    });

app.use(express.json());

// Configure CORS based on environment
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





