const express = require("express");
const app = express();
const mainRouter = require("./routes/index")
const cors = require("cors")
const { PORT } = require("./config")

app.use(express.json());
app.use(cors());
app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});





