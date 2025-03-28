import { Schema, model, type Document } from 'mongoose';

export interface VoteDocument extends Document {
  story: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  voteType: 'upvote' | 'downvote';
}

const voteSchema = new Schema<VoteDocument>(
  {
    story: {
      type: Schema.Types.ObjectId,
      ref: 'Story',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    voteType: {
      type: String,
      enum: ['upvote', 'downvote'],
      required: true,
    },
  },
  { timestamps: true }
);

const Vote = model<VoteDocument>('Vote', voteSchema);
export default Vote;
