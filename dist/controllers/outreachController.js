"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContacts = getAllContacts;
exports.createContact = createContact;
exports.deleteAll = deleteAll;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
function getAllContacts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contacts = yield prismaClient_1.default.outreachContact.findMany();
            return res.status(200).json({
                status: 'success',
                data: {
                    length: contacts.length,
                    contacts,
                },
            });
        }
        catch (error) {
            return res.status(400).json({
                status: 'fail',
                message: `${error}`,
            });
        }
        finally {
            yield prismaClient_1.default.$disconnect();
        }
    });
}
function createContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, outreachLocation, phoneNumber, outreachDateTime, groupName } = req.body;
            const contact = yield prismaClient_1.default.outreachContact.create({
                data: {
                    name,
                    outreachLocation,
                    phoneNumber,
                    outreachDateTime,
                    groupName,
                },
            });
            return res.status(201).json({
                status: 'success',
                contact,
            });
        }
        catch (error) {
            return res.status(400).json({
                status: 'fail',
                message: `${error}`,
            });
        }
        finally {
            yield prismaClient_1.default.$disconnect();
        }
    });
}
function deleteAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contact = yield prismaClient_1.default.outreachContact.deleteMany();
            return res.status(204).json({});
        }
        catch (error) {
            return res.status(400).json({
                status: 'fail',
                message: `${error}`,
            });
        }
        finally {
            yield prismaClient_1.default.$disconnect();
        }
    });
}
