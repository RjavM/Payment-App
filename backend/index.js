const express = require("express");
const app = express();
const mainRouter = require("./routes/index")
const cors = require("cors")
const jwt = require("jsonwebtoken")

app.use(express.json());
app.use(cors());
app.use("/api/v1", mainRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});





