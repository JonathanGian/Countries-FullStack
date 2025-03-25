import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi,  } from "vitest";
import type { Mock } from "vitest";
import { Navigation } from "../Navigation";
import { useAuth } from "../../context/AuthContext";




// Remove the custom MockedUseAuth type and use vi.Mock directly
// type MockedUseAuth = {
//   mockReturnValue: (value: AuthContextValue) => void;
// };

// Mock the useAuth hook so we can control its return value in tests
vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("Navigation Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders navigation links when user is not logged in", () => {
    (useAuth as Mock).mockReturnValue({
      user: null,
      signOut: vi.fn(),
    });

    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    // Assert basic navigation links are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Countries")).toBeInTheDocument();
    expect(screen.getByText("Protected Data")).toBeInTheDocument();

    // Check that the Login button is visible
    expect(screen.getByText("Login")).toBeInTheDocument();

    // Ensure that the Favorites link is not shown for guests
    expect(screen.queryByText("Favorites")).not.toBeInTheDocument();
  });

  test("renders navigation links when user is logged in", () => {
    const mockSignOut = vi.fn();

    // When the user is logged in, include avatar and favorites link
    (useAuth as Mock).mockReturnValue({
      user: { email: "test@example.com", user_metadata: { avatar_url: "" } },
      signOut: mockSignOut,
    });

    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    // Assert navigation links for logged in user are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Countries")).toBeInTheDocument();
    expect(screen.getByText("Protected Data")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();

    // Assert that the avatar is rendered (using its title as identifier)
    expect(screen.getByTitle("PROFILE")).toBeInTheDocument();

    // The logout option is hidden until the menu is opened
    expect(screen.queryByText("Logout (test@example.com)")).not.toBeInTheDocument();
  });

  test("calls signOut when logout is clicked", async () => {
    const mockSignOut = vi.fn();

    // Set up the auth hook with a logged in user
    (useAuth as Mock).mockReturnValue({
      user: { email: "test@example.com", user_metadata: { avatar_url: "" } },
      signOut: mockSignOut,
    });

    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    // Open the profile menu by clicking the avatar
    const avatar = screen.getByTitle("PROFILE");
    avatar.click();

    // Wait for the logout menu item to appear and click it
    const logoutItem = await screen.findByText("Logout (test@example.com)");
    logoutItem.click();

    // Verify that the signOut function was called
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});