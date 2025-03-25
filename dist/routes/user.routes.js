"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = (0, express_1.Router)();
const userController = new user_controller_1.default();
router.post("/register", userController.register); // No binding needed
router.get("/test", (req, res) => {
    console.log("Test route hitted");
    res.json({ message: "Test route hitted" });
});
exports.default = router;
