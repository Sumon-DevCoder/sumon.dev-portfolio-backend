import mongoose, { Schema } from "mongoose";
import { TSkills } from "./skills.interface";

const skillsSchema = new Schema<TSkills>({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  img: { type: String, required: true },
});

const Skills = mongoose.model<TSkills>("Skills", skillsSchema);
export default Skills;
