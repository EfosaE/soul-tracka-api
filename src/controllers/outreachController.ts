import prisma from '../utils/prismaClient';
import { Request, Response } from 'express';

export async function getAllContacts(req: Request, res: Response) {
  try {
    const contacts = await prisma.outreachContact.findMany();
    return res.status(200).json({
      status: 'success',
      data: {
        length: contacts.length,
        contacts,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: `${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function createContact(req: Request, res: Response) {
  try {
    const { name, outreachLocation, phoneNumber, outreachDateTime, groupName } =
      req.body;
    const contact = await prisma.outreachContact.create({
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
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: `${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
}


export async function deleteAll(req: Request, res: Response) {
  try {
    const contact = await prisma.outreachContact.deleteMany()
    return res.status(204).json({})
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: `${error}`,
    });
  } finally {
    await prisma.$disconnect();
  }
}
