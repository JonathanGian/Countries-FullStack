
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { DynamicTable } from "../DynamicTable";


describe("DynamicTable Component", () => {
  it("should render the table with no data", () => {
    const data: [] = []
   render(<DynamicTable data={data} />);
   expect(screen.queryByRole("table")).not.toBeInTheDocument();
  })
});
describe("DynamicTable Tests", () => {
  it("renders nothing when data array is empty", () => {
    const { container } = render(<DynamicTable data={[]} />);
    expect(container.firstChild).toBeNull();
  });

  test("renders table headers and rows correctly", () => {
    // Sample data with various types including Date, boolean, and null
    const data = [
      {
        id: 1,
        name: "Alice",
        active: true,
        joined: new Date("2020-01-01T00:00:00Z"),
        comment: null,
      },
      {
        id: 2,
        name: "Bob",
        active: false,
        joined: new Date("2021-01-01T00:00:00Z"),
        comment: "Hello",
      },
    ];

    render(<DynamicTable data={data} />);

    // Headers are derived from the keys of the first object:
    // Expected headers: "Id", "Name", "Active", "Joined", "Comment"
    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Joined")).toBeInTheDocument();
    expect(screen.getByText("Comment")).toBeInTheDocument();

    // Verify that row data is rendered correctly:
    // For numbers and strings
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();

    // Booleans are formatted to "Yes" or "No"
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();

    // Dates: We use toLocaleString() for formatting.
    const joinedValue1 = new Date("2020-01-01T00:00:00Z").toLocaleString();
    const joinedValue2 = new Date("2021-01-01T00:00:00Z").toLocaleString();
    expect(screen.getByText(joinedValue1)).toBeInTheDocument();
    expect(screen.getByText(joinedValue2)).toBeInTheDocument();

    // Null values are formatted as "-"
    // Note: Since both header and one row might display "-", check both "comment" cells
    // One is "-" for null and one is "Hello" for the string value.
    expect(screen.getAllByText("-").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});