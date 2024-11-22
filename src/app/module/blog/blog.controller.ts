import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import catchAsync from "../../utiils/catchAsync";
import sendResponse from "../../utiils/sendResponse";
import { BlogServices } from "./blog.service";

// create
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog added successfully",
    data: result,
  });
});

// get all
const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllBlogFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});

// get single
const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params.id);
  const result = await BlogServices.getSingleBlogIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});

// update
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.updateBlogIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

// delete
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.deleteBlogIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
});

export const BlogControllers = {
  deleteBlog,
  updateBlog,
  createBlog,
  getAllBlog,
  getSingleBlog,
};
