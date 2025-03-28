import { Schema, model, type Document } from 'mongoose';

export interface StoryDocument extends Document {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  likes: number;
  comments: Schema.Types.ObjectId[];
  parentStory?: Schema.Types.ObjectId;
  branches: Schema.Types.ObjectId[];
}

const storySchema = new Schema<StoryDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 280,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
    parentStory: {
      type: Schema.Types.ObjectId,
      ref: 'Story',
    },
    branches: [{
      type: Schema.Types.ObjectId,
      ref: 'Story',
    }],
  },
  { timestamps: true }
);

const Story = model<StoryDocument>('Story', storySchema);
export default Story;
