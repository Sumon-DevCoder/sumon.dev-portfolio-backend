import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import catchAsync from "../../utiils/catchAsync";
import sendResponse from "../../utiils/sendResponse";

// create
const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.createProjectIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project added successfully",
    data: result,
  });
});

// get all
const getAllProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.getAllProjectFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project retrieved successfully",
    data: result,
  });
});

// update
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.updateProjectIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

// delete
const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.deleteProjectIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

export const ProjectControllers = {
  deleteProject,
  updateProject,
  createProject,
  getAllProject,
};
