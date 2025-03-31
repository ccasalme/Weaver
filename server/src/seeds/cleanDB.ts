import { User, Profile, Story, Comment, Prompt, Vote } from '../models/index.js';
import process from 'process';

// Clear the database of all data
const cleanDB = async (): Promise<void> => {
    try {
        await User.deleteMany({});
        await Profile.deleteMany({});
        await Story.deleteMany({});
        await Comment.deleteMany({});
        await Prompt.deleteMany({});
        await Vote.deleteMany({});
        console.log('Database cleared!');
        process.exit(0);
    }
}