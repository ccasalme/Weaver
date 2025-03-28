import { Schema, model, type Document } from 'mongoose';

export interface CommentDocument extends Document {
  content: string;
  author: Schema.Types.ObjectId;
  story: Schema.Types.ObjectId;
}

const commentSchema = new Schema<CommentDocument>(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    story: {
      type: Schema.Types.ObjectId,
      ref: 'Story',
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = model<CommentDocument>('Comment', commentSchema);
export default Comment;
