import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Portfolio } from "@/routes/index";

describe("Project inquiry form", () => {
  it("allows a valid project inquiry without choosing a budget", () => {
    render(<Portfolio />);

    fireEvent.change(screen.getByLabelText("Your name *"), { target: { value: "A client" } });
    fireEvent.change(screen.getByLabelText("Email address *"), {
      target: { value: "client@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Project type *"), {
      target: { value: "Business Website" },
    });
    fireEvent.change(screen.getByLabelText("A little about your project *"), {
      target: { value: "I need a business website." },
    });

    const budget = screen.getByLabelText(/Budget range/);
    const form = screen.getByRole("button", { name: /Send project inquiry/ }).closest("form");

    expect(budget).not.toBeRequired();
    expect(form?.checkValidity()).toBe(true);
  });
});