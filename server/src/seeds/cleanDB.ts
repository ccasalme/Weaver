import { User, Profile, Story, Comment, Prompt, Vote } from '../models/index.js';
import process from 'process';

// Clear the database of all data
const cleanDB = async (): Promise<void> => {
    try {
        await User.deleteMany({});
        console.log('User collection cleaned!');
        await Profile.deleteMany({});
        console.log('Profile collection cleaned!');
        await Story.deleteMany({});
        console.log('Story collection cleaned!');
        await Comment.deleteMany({});
        console.log('Comment collection cleaned!');
        await Prompt.deleteMany({});
        console.log('Prompt collection cleaned!');
        await Vote.deleteMany({});
        console.log('Vote collection cleaned!');
    } catch (err) {
       console.error('Error cleaning database:', err);
       process.exit(1);
    }
};

export default cleanDB;