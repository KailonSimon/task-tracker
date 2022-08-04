/**
 * @jest-environment jsdom
 */

import "expect-puppeteer";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";
import { cleanup, screen } from "@testing-library/react";
import { render } from "../../../test-utils";

afterEach(cleanup);

jest.mock("next-auth/react");

describe("Navbar", () => {
  it("shows a log out button when session is authenticated", async () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: {},
      status: "authenticated",
    });
    render(<Navbar />);
    expect(
      screen.getByRole("button", {
        name: /Log out/i,
      })
    );
  });

  it("shows a log in link when session is unauthenticated", async () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: {},
      status: "unauthenticated",
    });
    render(<Navbar />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/api/auth/signin");
  });
});
