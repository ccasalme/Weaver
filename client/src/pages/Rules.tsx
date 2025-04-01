import React from "react";

const Rules: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Rules & Guidelines</h1>

      <p>
        Welcome to <strong>Weaver</strong> — a space where creativity thrives
        and stories grow together. To keep our platform safe, respectful, and
        inspiring, we ask all Weavers to follow these rules and guidelines.
      </p>

      <section className="rules-section">
        <h2>1. Be Kind and Respectful</h2>
        <p>
          Treat all Weavers with respect. Hate speech, harassment, bullying, or
          targeted attacks of any kind will not be tolerated. We’re here to
          create, not tear each other down.
        </p>
      </section>

      <section className="rules-section">
        <h2>2. Keep Content Appropriate</h2>
        <p>
          Do not post explicit, graphic, or NSFW content. Weaver is a
          storytelling app for a wide audience — keep it friendly, fun, and
          creative for all users.
        </p>
      </section>

      <section className="rules-section">
        <h2>3. Respect Creative Ownership</h2>
        <p>
          You are responsible for what you write. Don’t copy or repost someone
          else’s work from outside Weaver without permission. Within the app,
          collaboration is encouraged — but don’t claim others’ ideas as your
          own.
        </p>
      </section>

      <section className="rules-section">
        <h2>4. No Spam or Disruptive Behavior</h2>
        <p>
          Avoid flooding threads, abusing branching, or posting irrelevant
          content. Help keep story spaces meaningful and enjoyable to read.
        </p>
      </section>

      <section className="rules-section">
        <h2>5. Choose Branches Wisely</h2>
        <p>
          When you branch a story, you’re creating a new timeline. Respect the
          original tone, characters, and intent — or clearly take it in a new,
          creative direction. Don’t use branches to troll or derail the work of
          others.
        </p>
      </section>

      <section className="rules-section">
        <h2>6. Use the Report System if Needed</h2>
        <p>
          If you see content that violates these rules or feels unsafe, use the
          report feature. Our team (and our Architects) will review flagged
          content to keep the community safe.
        </p>
      </section>

      <section className="rules-section">
        <h2>7. Weavers Who Break the Rules</h2>
        <p>
          Repeated or serious rule violations may result in warnings, content
          removal, or account suspension. We want everyone to have a good
          experience here — please help make Weaver a welcoming space.
        </p>
      </section>

      <p className="closing-message">
        💬 Questions? Concerns? Ideas to improve these rules? Reach out to our
        team — we’re listening.
      </p>
    </div>
  );
};

export default Rules;
