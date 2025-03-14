import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import CountryCard from "../Countries/CountryCard";
import { Country } from "../../types/country";


// Mock the useNavigate hook
const mockNavigate = vi.fn();

// Properly mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the FavoriteButton component
vi.mock("../FavoriteButton", () => ({
  FavoriteButton: ({ country }: { country: Country }) => (
    <button data-testid="favorite-button">
      Favorite {country.name.common}
    </button>
  ),
}));

describe("CountryCard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockCountry: Country = {
    name: {
      common: "Finland",
      official: "Republic of Finland",
    },
    capital: ["Helsinki"],
    region: "Europe",
    subregion: "Northern Europe",
    population: 5530719,
    flags: {
      png: "https://flagcdn.com/w320/fi.png",
      svg: "https://flagcdn.com/fi.svg",
      alt: "The flag of Finland has a white field with a blue cross that extends to the edges of the flag.",
    },
    cca3: "FIN",
    currencies: {
      EUR: {
        name: "Euro",
        symbol: "€",
      },
    },
  };

  test("renders country information correctly", () => {
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );

    // Check if country name is rendered
    expect(screen.getByText("Finland")).toBeInTheDocument();

    // Check if region and subregion are rendered
    expect(screen.getByText("Europe (Northern Europe)")).toBeInTheDocument();

    // Check if capital is rendered
    expect(screen.getByText("Helsinki")).toBeInTheDocument();

    // Check if population is rendered
    expect(screen.getByText("5,530,719")).toBeInTheDocument();

    // Check if currency is rendered
    expect(screen.getByText("Euro (€)")).toBeInTheDocument();

    // Check if favorite button is rendered
    expect(screen.getByTestId("favorite-button")).toBeInTheDocument();
  });

  test("navigates to country detail page when clicked", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );

    // Click on the card
    await user.click(screen.getByText("Finland"));

    // Check if navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/countries/finland");
  });

  // Additional tests...
});