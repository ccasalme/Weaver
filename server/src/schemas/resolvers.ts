import User from '../models/user.js';
import { signToken } from '../utils/auth.js';

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

    myProfile: async (_: any, _args: any, context: any) => {
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }
      const profile = await Profile.findOne({ user: context.user._id })
        .populate('followers')
        .populate('sharedStories')
        .populate('branchedStories')
        .populate('likedStories');
      return profile;
    },

    getPrompts: async () => {
      return await Prompt.find();
    },

    getStories: async () => {
      return await Story.find().populate('author').populate('comments');
    },
  },


    Mutation: {
        login: async (_parent: any, { email, password }: { email: string; password: string }) => {
         
          const user = await User.findOne({ email });
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
    
        // Creates a new user, signs a token for them, and returns both.
        addUser: async (_: any, { username, email, password }: { username: string; email: string; password: string }) => {

          const user = await User.create({ username, email, password });
          if (!user) {
            throw new Error("Something is wrong!");
          }

          console.log('addedUser')

          const token = signToken(user.username, user.email, user._id);
          return { token, user };
        },

        createStory: async (_: any, { title, content }: { title: string; content: string }, context: any) => {
          if (!context.user) throw new Error("You need to be logged in!");

          const story = await Story.create({ title, content, author: context.user._id });
          await Profile.findOneAndUpdate(
            { user: context.user._id },
            { $push: { sharedStories: story._id } }
          );
          return story;
        },

        branchStory: async (_: any, { storyId, title, content }: { storyId: string; title: string; content: string }, context: any) => {
          if (!context.user) throw new Error("You need to be logged in!");

          const originalStory = await Story.findById(storyId);
          if (!originalStory) throw new Error("Original story not found");
    
          const branchedStory = await Story.create({
            title,
            content,
            author: context.user._id,
            parentStory: originalStory._id,
          });
    
          originalStory.branches.push(branchedStory._id);
          await originalStory.save();
    
          await Profile.findOneAndUpdate(
            { user: context.user._id },
            { $push: { branchedStories: branchedStory._id } }
          );
    
          return branchedStory;
        },

        likeStory: async (_: any, { storyId }: { storyId: string }, context: any) => {
          if (!context.user) throw new Error("You need to be logged in!");
          
          const story = await Story.findById(storyId);
          if (!story) throw new Error("Story not found");
    
          story.likes++;
          await story.save();
    
          await Profile.findOneAndUpdate(
            { user: context.user._id },
            { $addToSet: { likedStories: story._id } }
          );
    
          return story;
        },
    
    },
};

export default resolvers;