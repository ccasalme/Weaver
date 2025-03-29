import User from '../models/user.js';
import { signToken } from '../utils/auth.js';

const resolvers = {
    Query: {

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
            // First we create the user in the database
          const user = await User.create({ username, email, password });
          if (!user) {
            throw new Error("Something is wrong!");
          }
          console.log('addedUser')
          // Sign a token for the new user.
          const token = signToken(user.username, user.email, user._id);
          return { token, user };
        },
    },
};

export default resolvers;