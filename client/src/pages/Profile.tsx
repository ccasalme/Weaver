import React from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../graphql/queries";
import "./Wireframe.css"; // Import the CSS for styling

const Profile: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MY_PROFILE);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile!</p>;

  const { bio, avatar, followers, sharedStories, likedStories } =
    data.myProfile;

  return (
    <div className="profile-container">
      <img src={avatar} alt="Profile Avatar" className="profile-avatar" />
      <h2>My Profile</h2>
      <p>{bio}</p>

      <h3>Followers: {followers.length}</h3>

      <h3>My Stories:</h3>
      <ul>
        {sharedStories.map((story: { _id: string; title: string }) => (
          <li key={story._id}>{story.title}</li>
        ))}
      </ul>

      <h3>Liked Stories:</h3>
      <ul>
        {likedStories.map((story: { _id: string; title: string }) => (
          <li key={story._id}>{story.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
