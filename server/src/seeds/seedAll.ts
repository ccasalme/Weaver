import db from '../config/connection.js';
import { User, Profile, Story, Comment, Prompt, Vote } from '../models/index.js';
import cleanDB from './cleanDB.js';

import userData from './userData.json' assert { type: 'json' };
import profileData from './profileData.json' assert { type: 'json' };
import storyData from './storyData.json' assert { type: 'json' };
import commentData from './commentData.json' assert { type: 'json' };
import promptData from './promptData.json' assert { type: 'json' };
import voteData from './voteData.json' assert { type: 'json' };

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    const users = await User.create(userData);
    const profiles = await Profile.insertMany(
      profileData.map((profile, i) => ({ ...profile, user: users[i]._id }))
    );

    const stories = await Story.insertMany(
      storyData.map((story, i) => ({ ...story, author: users[i % users.length]._id }))
    );

    await Comment.insertMany(
      commentData.map((comment, i) => ({
        ...comment,
        author: users[i % users.length]._id,
        story: stories[i % stories.length]._id
      }))
    );

    await Prompt.insertMany(promptData);

    await Vote.insertMany(
      voteData.map((vote, i) => ({
        ...vote,
        user: users[i % users.length]._id,
        story: stories[i % stories.length]._id
      }))
    );

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
