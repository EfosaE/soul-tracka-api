"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the 'express' module
const express_1 = __importDefault(require("express"));
const outreachContactRoute_1 = __importDefault(require("./routes/outreachContactRoute"));
// Create an Express application
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/outreach-contacts', outreachContactRoute_1.default);
exports.default = app;
