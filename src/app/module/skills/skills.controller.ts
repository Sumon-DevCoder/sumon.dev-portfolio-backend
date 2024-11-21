import httpStatus from "http-status-codes";
import { SkillsServices } from "./skills.service";
import { Request, Response } from "express";
import catchAsync from "../../utiils/catchAsync";
import sendResponse from "../../utiils/sendResponse";

// create
const createSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillsServices.createSkillsIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skills added successfully",
    data: result,
  });
});

// get all
const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillsServices.getAllSkillsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skills retrieved successfully",
    data: result,
  });
});

// get single
const getSingleSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillsServices.getSingleSkillsIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skills retrieved successfully",
    data: result,
  });
});

// update
const updateSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillsServices.updateSkillsIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skills updated successfully",
    data: result,
  });
});

// delete
const deleteSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillsServices.deleteSkillsIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skills deleted successfully",
    data: result,
  });
});

export const SkillsControllers = {
  deleteSkills,
  updateSkills,
  createSkills,
  getAllSkills,
  getSingleSkills,
};
