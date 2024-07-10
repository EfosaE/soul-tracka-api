import AppError from '../utils/appError';
import { asyncHandler } from '../utils/asyncHandler';
import prisma from '../utils/prismaClient';
import { NextFunction, Request, Response } from 'express';
import {
  parseBoolean,
  parseString,
  parseUserDateInput,
} from '../utils/userInputParser';

export const getAllContacts = async (req: Request, res: Response) => {
  const queryObj = { ...req.query };
  const { name, contacted, groupName } = queryObj;

  // Type assertion and narrowing for name
  let nameString: string | undefined;
  nameString = parseString(name);

  // Type assertion and narrowing for groupName
  let groupNameString: string | undefined;
  groupNameString = parseString(groupName);

  // Convert contacted to boolean
  let contactedBoolean: boolean | undefined;
  contactedBoolean = parseBoolean(contacted);

  const contacts = await prisma.outreachContact.findMany({
    where: {
      name: {
        contains: nameString,
        mode: 'insensitive',
      },
      groupName: {
        contains: groupNameString,
        mode: 'insensitive',
      },
      contacted: contactedBoolean,
    },
  });

  return res.status(200).json({
    status: 'success',
    data: {
      length: contacts.length,
      contacts,
    },
  });
};

export const getByID = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    const contact = await prisma.outreachContact.findUnique({
      where: {
        id,
      },
    });
    if (!contact) {
      return next(new AppError('no records for this search', 404));
    }
    return res.status(200).json({
      status: 'success',
      contact,
    });
  }
);

export const createContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, outreachLocation, phoneNumber, outreachDateTime, groupName } =
      req.body;
    let parsedDateInput;
    parsedDateInput = parseUserDateInput(outreachDateTime);
    const contact = await prisma.outreachContact.create({
      data: {
        name,
        outreachLocation,
        phoneNumber,
        outreachDateTime: parsedDateInput,
        groupName,
      },
    });
    return res.status(201).json({
      status: 'success',
      contact,
    });
  }
);

export const deleteAll = asyncHandler(async (req: Request, res: Response) => {
  await prisma.outreachContact.deleteMany();
  return res.status(204).json({});
});

// export async function createManyContact(req: Request, res: Response) {
//   try {
//     const contactArray = req.body

//       req.body;
//     const contact = await prisma.outreachContact.createMany({
//       data: contactArray
//     });
//     return res.status(201).json({
//       status: 'success',
//       contact,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: 'fail',
//       message: `${error}`,
//     });
//   } finally {
//     await prisma.$disconnect();
//   }
// }
