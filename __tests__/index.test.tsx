import "@testing-library/jest-dom";
import { filterList } from "../pages";
import { Task } from "../features/tasks/taskSlice";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

describe("Search filter function", () => {
  it("should filter by a search term (lorem)", () => {
    const input: Task[] = [
      {
        id: "1",
        name: "Lorem",
        description: "Ipsum",
        priorityLevel: "1",
        dateAdded: "1",
        isCompleted: false,
      },
      {
        id: "2",
        name: "Dolor",
        description: "lorem",
        priorityLevel: "1",
        dateAdded: "1",
        isCompleted: false,
      },
      {
        id: "3",
        name: "Sit",
        description: "Amer",
        priorityLevel: "1",
        dateAdded: "1",
        isCompleted: false,
      },
    ];

    const output: Task[] = [
      {
        id: "1",
        name: "Lorem",
        description: "Ipsum",
        priorityLevel: "1",
        dateAdded: "1",
        isCompleted: false,
      },
      {
        id: "2",
        name: "Dolor",
        description: "lorem",
        priorityLevel: "1",
        dateAdded: "1",
        isCompleted: false,
      },
    ];

    expect(filterList(input, "lorem")).toEqual(output);
  });
});
