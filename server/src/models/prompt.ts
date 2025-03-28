import { Schema, model, type Document } from 'mongoose';

export interface PromptDocument extends Document {
  category: string;
  theme: string;
  tone: string;
  text: string;
}

const promptSchema = new Schema<PromptDocument>(
  {
    category: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    tone: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Prompt = model<PromptDocument>('Prompt', promptSchema);
export default Prompt;


