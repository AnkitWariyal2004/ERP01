import { Model, Schema, model, models } from "mongoose";
import { Client } from "../../types/clients_Type/client";

const ClientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      default: "Active",
    },
  },
  { timestamps: true }
);

ClientSchema.index({ name: "text", phone: "text" });

// Export as both "ClientT" for existing code and "Client" for schema registration
export const ClientT =
  (models.Client as Model<Client>) || model<Client>("Client", ClientSchema);

// This ensures that when we import ClientT, the model is properly registered with Mongoose
// under the name "Client" that's used in the Project schema reference