import  { Model, Schema, Types, model, models } from "mongoose";
import { Task } from "../../types";


interface IClient {
  _id: Types.ObjectId;
  name: string;
  email?: string;
  phone?:string;
}

interface IServer {
  _id?: Types.ObjectId;
  provider?: string;
  userName?: string;
  password?: string;
  ip?: string;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewProject {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  team?: string[];
  budget?: number;
  tags?: string[];
  progress?: number;
  visibility?: 'public' | 'private';
  projectUrl?: string;
  documents?: string[];
  riskAssessment?: string;
  dependencies?: string;
  server?: IServer;
  status?: string;
  balanceAmount?: number;
  paidAmount?: number;
  tasks?: Task[];
  clientID?: Types.ObjectId | IClient; // Can be ObjectId or populated client
  createdAt?: Date;
  updatedAt?: Date;
}

// For populated project type
export interface PopulatedProject extends Omit<NewProject, 'clientID'> {
  clientID: IClient;
}

const ServerSchema = new Schema<IServer>(
  {
    provider: { type: String },
    userName: { type: String },
    password: { type: String },
    ip: { type: String },
    url: String,
  },
  {
    timestamps: true,
  }
);

const TaskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    description: String,
    dueDate: String,
    type: {
      type: String,
      enum: ["bug", "feature", "task", "improvement"],
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "review", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    assignee: { type: String },
  },
  {
    timestamps: true,
  }
);

const ProjectSchema = new Schema<NewProject>(
  {
    name: { type: String, required: true },
    description: String,
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    team: { type: [String], default: [] },
    budget: Number,
    tags: { type: [String], default: [] },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    projectUrl: String,
    documents: { type: [String], default: [] },
    riskAssessment: String,
    dependencies: String,
    server: ServerSchema,
    balanceAmount: { type: Number, default: 0 },
    paidAmount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["planning", "active", "on-hold", "completed", "archived"],
      default: "active",
    },
    tasks: {
      type: [TaskSchema],
      default: () => [],
      validate: {
        validator: function(v: Task[]) {
          if (v.length === 0) return true;
          return v.every(task => task.assignee);
        },
      },
    },
    clientID: { 
      type: Schema.Types.ObjectId, 
      ref: "Client", // Make sure this matches your Client model name
      required: true 
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ name: "text", tags: "text" });

export const Project =
  (models.Project as Model<NewProject>) ||
  model<NewProject>("Project", ProjectSchema);