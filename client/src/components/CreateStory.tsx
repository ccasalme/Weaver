// src/components/CreateStory.tsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_STORY } from "../graphql/mutations";
import { GET_STORIES } from "../graphql/queries";

const CreateStory: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createStory, { error }] = useMutation(CREATE_STORY, {
    refetchQueries: [{ query: GET_STORIES }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please enter a title and content.");
      return;
    }

    try {
      await createStory({
        variables: {
          title,
          content,
        },
      });

      setTitle("");
      setContent("");
      alert("Story created successfully! 🎉");
    } catch (err) {
      console.error("Error creating story:", err);
    }
  };

  return (
    <div className="create-story-container">
      <h2>Create a New Story 📚</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Story Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Once upon a time..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Post Story ✨</button>
      </form>
      {error && <p>Error creating story: {error.message}</p>}
    </div>
  );
};

export default CreateStory;
