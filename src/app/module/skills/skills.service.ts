import httpStatus from "http-status-codes";
import AppError from "../../error/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { TSkills } from "./skills.interface";
import Skills from "./skills.model";
import { skillsSearchableFields } from "./skills.constant";

// create
const createSkillsIntoDB = async (payload: TSkills) => {
  // Skills checking
  const isSkillsExists = await Skills.findOne({ name: payload.name });
  if (isSkillsExists) {
    throw new AppError(httpStatus.CONFLICT, "Skills Already Exist!");
  }

  const result = await Skills.create(payload);
  return result;
};

// get all
const getAllSkillsFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const SkillsQuery = new QueryBuilder(Skills.find(), query)
    .search(skillsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await SkillsQuery.countTotal();
  const result = await SkillsQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Skills not Exist!");
  }

  return {
    meta,
    result,
  };
};

// get single
const getSingleSkillsIntoDB = async (_id: string) => {
  // Skills checking
  const result = await Skills.findById(_id);

  if (!result) {
    throw new AppError(httpStatus.CONFLICT, "Skills does not Exists!");
  }

  return result;
};

// update
const updateSkillsIntoDB = async (_id: string, payload: Partial<TSkills>) => {
  // Skills checking
  const isSkillsExists = await Skills.findById(_id);
  if (!isSkillsExists) {
    throw new AppError(httpStatus.CONFLICT, "Skills not Exists!");
  }

  const result = await Skills.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};

// delete
const deleteSkillsIntoDB = async (_id: string) => {
  // Skills checking
  const isSkillsExists = await Skills.findById(_id);
  if (!isSkillsExists) {
    throw new AppError(httpStatus.CONFLICT, "Skills not Exists!");
  }

  const result = await Skills.findByIdAndDelete(_id, {
    new: true,
  });
  return result;
};

export const SkillsServices = {
  createSkillsIntoDB,
  getAllSkillsFromDB,
  updateSkillsIntoDB,
  getSingleSkillsIntoDB,
  deleteSkillsIntoDB,
};
