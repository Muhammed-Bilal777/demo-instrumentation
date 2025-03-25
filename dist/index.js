"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instrumentaation_1 = require("./instrumentation/instrumentaation");
(0, instrumentaation_1.instrumentationInitializetion)();
const database_1 = require("./config/database");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// Database connection
const db = new database_1.Database();
db.connect();
// Routes
app.use("/api/users", user_routes_1.default);
setInterval(() => {
    const memoryUsage = process.memoryUsage();
    console.log(`Heap Total: ${memoryUsage.heapTotal / 1024 / 1024} MB`);
    console.log(`Heap Used: ${memoryUsage.heapUsed / 1024 / 1024} MB`);
}, 5000);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
