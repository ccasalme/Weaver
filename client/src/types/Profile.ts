export interface UserLite {
	_id: string;
	username: string;
	email: string;
  }
  
  export interface StoryPreview {
	_id: string;
	title: string;
	content: string;
	likes: number;
	comments: {
	  _id: string;
	  author: {
		_id: string;
		username: string;
	  };
	}[];
	branches?: { _id: string; title: string }[];
	parentStory?: { _id: string; title: string } | null;
  }
  
  export interface MyProfile {
	_id: string;
	bio?: string;
	avatar?: string;
	user: UserLite;
	followers: UserLite[];
	following: UserLite[];
	sharedStories: StoryPreview[];
	likedStories: StoryPreview[];
	branchedStories: StoryPreview[];
  }
  
  export interface GetMyProfileData {
	myProfile: MyProfile;
  }
  