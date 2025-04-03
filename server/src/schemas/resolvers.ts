import { signToken } from "../utils/auth.js";
import mongoose from "mongoose";
import { User, Story, Profile, Comment, Vote, Prompt } from "../models/index.js";



const resolvers = {
  Query: {
    // This resolver returns the currently logged-in user's info.
    me: async (_: any, _args: any, context: any) => {
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      const foundUser = await User.findOne({ _id: context.user._id });
      if (!foundUser) {
        throw new Error("Cannot find a user with this id!");
      }
      return foundUser;
    },

    // Get the profile of the currently logged-in user, with relationships populated
    myProfile: async (_: any, _args: any, context: any) => {
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }
      const profile = await Profile.findOne({ user: context.user._id })
        .populate("user")
        .populate("followers")
        .populate("sharedStories")
        .populate("branchedStories")
        .populate("likedStories");
      return profile;
    },

    // Retrieve all writing prompts
    getPrompts: async () => {
      return await Prompt.find();
    },

///////////////////////////////////
//Cyrl's notes: this addition prevents the negative count
//prevents crazy re-rendering upon retrieval of stories in real time
//limits the number of stories loaded at a time to prevent crashing
//this is a good practice for performance and safeguard additional feature
///////////////////////////////////


    // Retrieve all stories, including author and comments
    getStories: async (_: any, { offset = 0, limit = 10 }: { offset: number; limit: number }) => {
      return await Story.find()
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .populate("author")
        .populate({
          path: "comments",
          populate: { path: "author" }, // populates comment authors
        })
        .populate({
          path: "branches",
          populate: [
            { path: "author" }, // populates branch authors
            {
              path: "comments",
              populate: { path: "author" }, // populates branch comment authors
            },
          ],
        }) // populates branched stories
        .populate({
          path: "parentStory",
          populate: [
            { path: "author" }, // populates parent story author
            {
              path: "comments",
              populate: { path: "author" }, // populates parent story comment authors
            },
          ],
        }); // populates parent stories
    },
  },
  
  Mutation: {
    // Login an existing user and return a JWT token
    login: async (
      _parent: any,
      { username, password }: { username: string; password: string }
    ) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error("Wrong password!");
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // Register a new user and create an associated profile
    addUser: async (
      _: any,
      {
        fullName,
        username,
        email,
        password,
      }: { fullName: string; username: string; email: string; password: string }
    ) => {
      const user = await User.create({ fullName, username, email, password });
      await Profile.create({ user: user._id });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // Create a new story and associate it with the user's profile
    createStory: async (
      _: any,
      { title, content }: { title: string; content: string },
      context: any
    ) => {
      if (!context.user) throw new Error("You need to be logged in!");

      const story = await Story.create({
        title,
        content,
        author: context.user._id,
      });
      await Profile.findOneAndUpdate(
        { user: context.user._id },
        { $push: { sharedStories: story._id } }
      );
      return story;
    },

    // Branch an existing story into a new one and link them
    branchStory: async (
      _: any,
      {
        storyId,
        title,
        content,
      }: { storyId: string; title: string; content: string },
      context: any
    ) => {
      if (!context.user) throw new Error("You need to be logged in!");

      const originalStory = await Story.findById(storyId);
      if (!originalStory) throw new Error("Original story not found");

      const branchedStory = await Story.create({
        title,
        content,
        author: context.user._id,
        parentStory: originalStory._id,
      });

      originalStory.branches.push(branchedStory._id as typeof originalStory.branches[0]);
      await originalStory.save();

      await Profile.findOneAndUpdate(
        { user: context.user._id },
        { $push: { branchedStories: branchedStory._id } }
      );

      return branchedStory;
    },


//////////////////////////////////////////
//Cyrl's notes: this change prevents the negative count
  //prevents spam likes
  //ensures that the user can only like a story once
  //ensures that the user can unlike a story
  //ensures that it gets saved to the database and profile
  //if the user already liked the story, it will be unliked
  //if the user has not liked the story, it will be liked
  //if not logged in, it will throw an error
//////////////////////////////////////////

  // Like a story and add/remove it from the user's liked stories
  likeStory: async (
    _: any,
    { storyId }: { storyId: string },
    context: any
  ) => {
    if (!context.user) throw new Error("You need to be logged in!");
  
    const story = await Story.findById(storyId);
    if (!story) throw new Error("Story not found");
  
    const profile = await Profile.findOne({ user: context.user._id });
    if (!profile) throw new Error("Profile not found");
  
    const hasLiked = profile.likedStories.some(
      (likedId) => likedId.toString() === (story._id as mongoose.Types.ObjectId).toString()
    );
  
    if (hasLiked) {
      // ✅ Unlike logic
      story.likes = Math.max(0, (story.likes || 0) - 1);
      await story.save();
  
      await Profile.updateOne(
        { user: context.user._id },
        { $pull: { likedStories: story._id } }
      );
    } else {
      // ✅ Like logic
      story.likes = (story.likes || 0) + 1;
      await story.save();
  
      await Profile.updateOne(
        { user: context.user._id },
        { $addToSet: { likedStories: story._id } }
      );
    }
  
    return story;
  },
  
    // Add a comment to a story
    addComment: async (
      _: any,
      { storyId, content }: { storyId: string; content: string },
      context: any
    ) => {
      if (!context.user) throw new Error("You need to be logged in!");

      const comment = await Comment.create({
        content,
        story: storyId,
        author: context.user._id,
      });

      await Story.findByIdAndUpdate(storyId, {
        $push: { comments: comment._id },
      });

      const populatedComment = await comment.populate({path: "author", select: "_id username"});

      return populatedComment;
    },

     // Delete a story and related comments (but not branched stories)
     deleteStory: async (
      _: any,
      { storyId }: { storyId: string },
      context: any
    ) => {
      if (!context.user) throw new Error("You need to be logged in!");

      const story = await Story.findOne({ _id: storyId, author: context.user._id });
      if (!story) throw new Error("Story not found or you're not authorized to delete it");

      // Delete associated comments
      await Comment.deleteMany({ story: storyId });

      // Remove from any profiles (shared, liked only)
      await Profile.updateMany(
        {},
        {
          $pull: {
            sharedStories: storyId,
            likedStories: storyId,
          },
        }
      );

      // Remove story from any parent story's branches
      await Story.updateMany(
        { branches: storyId },
        { $pull: { branches: storyId } }
      );

      // Delete the story itself
      await story.deleteOne();

      return story;
    },

    // Vote for a story (upvote/downvote)
    voteStory: async (
      _: any,
      { storyId, voteType }: { storyId: string; voteType: "upvote" | "downvote" },
      context: any
    ) => {
      if (!context.user) throw new Error("You need to be logged in!");

      const existingVote = await Vote.findOne({
        user: context.user._id,
        story: storyId,
      });

      if (existingVote) {
        existingVote.voteType = voteType;
        await existingVote.save();
        return existingVote;
      }

      const newVote = await Vote.create({
        user: context.user._id,
        story: storyId,
        voteType,
      });

      return newVote;
    },
  },
};

export default resolvers;
