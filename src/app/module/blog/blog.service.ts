import httpStatus from "http-status-codes";
import AppError from "../../error/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import Blog from "./blog.model";
import { TBlog } from "./blog.interface";
import { blogSearchableFields } from "./blog.constant";

// create
const createBlogIntoDB = async (payload: TBlog) => {
  // Blog checking
  const isBlogExists = await Blog.findOne({
    title: payload.title,
  });
  if (isBlogExists) {
    throw new AppError(httpStatus.CONFLICT, "Blog Already Exist!");
  }

  const result = await Blog.create(payload);
  return result;
};

// get all
const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const BlogQuery = new QueryBuilder(Blog.find(), query)
    .search(blogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await BlogQuery.countTotal();
  const result = await BlogQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not Exist!");
  }

  return {
    meta,
    result,
  };
};

// get single
const getSingleBlogIntoDB = async (_id: string) => {
  // Skills checking
  const result = await Blog.findById(_id);

  if (!result) {
    throw new AppError(httpStatus.CONFLICT, "Blog does not Exists!");
  }

  return result;
};

// update
const updateBlogIntoDB = async (_id: string, payload: Partial<TBlog>) => {
  // Blog checking
  const isBlogExists = await Blog.findById(_id);
  if (!isBlogExists) {
    throw new AppError(httpStatus.CONFLICT, "Blog not Exists!");
  }

  const result = await Blog.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};

// delete
const deleteBlogIntoDB = async (_id: string) => {
  // Blog checking
  const isBlogExists = await Blog.findById(_id);
  if (!isBlogExists) {
    throw new AppError(httpStatus.CONFLICT, "Blog not Exists!");
  }

  const result = await Blog.findByIdAndDelete(_id, {
    new: true,
  });
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogFromDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
  getSingleBlogIntoDB,
};
