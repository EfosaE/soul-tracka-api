"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const outreachController_1 = require("../controllers/outreachController");
const outreachRouter = (0, express_1.Router)();
outreachRouter.route('/').get(outreachController_1.getAllContacts);
outreachRouter.route('/').post(outreachController_1.createContact);
outreachRouter.route('/').delete(outreachController_1.deleteAll);
exports.default = outreachRouter;
