const express = require("express");
const server = express();

const projectRouter = require("./routers/projectRouter.js");
const actionRouter = require("./routers/actionRouter.js");

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

const PORT = 8000;
server.listen(PORT, () => console.log(`Server is Running on port http://localhost:${PORT}`));