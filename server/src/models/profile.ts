import { Schema, model, type Document } from 'mongoose';

export interface ProfileDocument extends Document {
  user: Schema.Types.ObjectId;
  bio: string;
  avatar: string;
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  sharedStories: Schema.Types.ObjectId[];
  branchedStories: Schema.Types.ObjectId[];
  likedStories: Schema.Types.ObjectId[];
}

const profileSchema = new Schema<ProfileDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
    },
    followers: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    following: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    sharedStories: [{
      type: Schema.Types.ObjectId,
      ref: 'Story',
    }],
    branchedStories: [{
      type: Schema.Types.ObjectId,
      ref: 'Story',
    }],
    likedStories: [{
      type: Schema.Types.ObjectId,
      ref: 'Story',
    }],
  },
  { timestamps: true }
);

const Profile = model<ProfileDocument>('Profile', profileSchema);
export default Profile;
