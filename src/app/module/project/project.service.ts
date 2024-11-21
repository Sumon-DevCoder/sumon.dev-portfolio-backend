import httpStatus from "http-status-codes";
import AppError from "../../error/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import Project from "./project.model";
import { TProject } from "./project.interface";
import { projectSearchableFields } from "./project.constant";

// create
const createProjectIntoDB = async (payload: TProject) => {
  // Project checking
  const isProjectExists = await Project.findOne({
    title: payload.title,
    liveLInk: payload.liveLink,
  });
  if (isProjectExists) {
    throw new AppError(httpStatus.CONFLICT, "Project Already Exist!");
  }

  const result = await Project.create(payload);
  return result;
};

// get all
const getAllProjectFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const ProjectQuery = new QueryBuilder(Project.find(), query)
    .search(projectSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await ProjectQuery.countTotal();
  const result = await ProjectQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not Exist!");
  }

  return {
    meta,
    result,
  };
};

// update
const updateProjectIntoDB = async (_id: string, payload: Partial<TProject>) => {
  // Project checking
  const isProjectExists = await Project.findById(_id);
  if (!isProjectExists) {
    throw new AppError(httpStatus.CONFLICT, "Project not Exists!");
  }

  const result = await Project.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};

// delete
const deleteProjectIntoDB = async (_id: string) => {
  // Project checking
  const isProjectExists = await Project.findById(_id);
  if (!isProjectExists) {
    throw new AppError(httpStatus.CONFLICT, "Project not Exists!");
  }

  const result = await Project.findByIdAndDelete(_id, {
    new: true,
  });
  return result;
};

export const ProjectServices = {
  createProjectIntoDB,
  getAllProjectFromDB,
  updateProjectIntoDB,
  deleteProjectIntoDB,
};
