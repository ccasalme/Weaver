/// <reference types="vitest" />
import { render, screen, fireEvent } from "@testing-library/react";
import CollapsibleSection from "./CollapsibleSection";
import { describe, it, expect } from "vitest";

describe("<CollapsibleSection />", () => {
  it("renders the title and is collapsed by default", () => {
    render(
      <CollapsibleSection
        title="Test Section"
        content={<p>Hidden content</p>}
      />
    );

    // The title should be visible
    expect(screen.getByText(/test section/i)).toBeInTheDocument();

    // The content should not be visible yet
    expect(screen.queryByText(/hidden content/i)).not.toBeInTheDocument();
  });

  it("expands when title is clicked", () => {
    render(
      <CollapsibleSection title="Expandable" content={<p>Now visible</p>} />
    );

    // Click the header to expand
    fireEvent.click(screen.getByText(/expandable/i));

    // Now the content should be visible
    expect(screen.getByText(/now visible/i)).toBeInTheDocument();
  });

  it("collapses again when title is clicked twice", () => {
    render(
      <CollapsibleSection title="Toggle" content={<p>Toggle content</p>} />
    );

    const header = screen.getByText(/toggle/i);

    // First click - expand
    fireEvent.click(header);
    expect(screen.getByText(/toggle content/i)).toBeInTheDocument();

    // Second click - collapse
    fireEvent.click(header);
    expect(screen.queryByText(/toggle content/i)).not.toBeInTheDocument();
  });

  it("renders default title and content if none provided", () => {
    render(
      <CollapsibleSection title={undefined as any} content={undefined as any} />
    );

    expect(screen.getByText(/default title/i)).toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText(/default title/i));

    expect(
      screen.getByText(/default content if none is provided/i)
    ).toBeInTheDocument();
  });
});
