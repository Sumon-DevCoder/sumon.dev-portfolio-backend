import mongoose, { Schema } from "mongoose";
import { TProject } from "./project.interface";

const projectSchema = new Schema<TProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    clientCode: { type: String, required: true },
    serverCode: { type: String, required: true },
    liveLink: { type: String, required: true },
  },
  { timestamps: true }
);

const Project = mongoose.model<TProject>("Project", projectSchema);
export default Project;