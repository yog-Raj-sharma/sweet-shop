const sweetService = require("../services/sweet.service");
const Sweet = require("../models/Sweet");

jest.mock("../models/Sweet");

describe("Sweet Service - TDD", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should throw error if sweet already exists", async () => {
    Sweet.findOne.mockResolvedValue({ name: "Ladoo", category: "Indian" });

    await expect(
      sweetService.addSweet({
        name: "Ladoo",
        category: "Indian"
      })
    ).rejects.toThrow("Sweet already exists");
  });

  test("should decrease quantity when purchased", async () => {
    const sweet = { quantity: 5, save: jest.fn() };
    Sweet.findById.mockResolvedValue(sweet);

    await sweetService.purchaseSweet("123");

    expect(sweet.quantity).toBe(4);
  });

  test("should not allow purchase if quantity is zero", async () => {
    Sweet.findById.mockResolvedValue({ quantity: 0 });

    await expect(
      sweetService.purchaseSweet("123")
    ).rejects.toThrow("Out of stock");
  });
});
