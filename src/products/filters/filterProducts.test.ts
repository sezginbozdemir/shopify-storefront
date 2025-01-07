import { describe, expect, it } from "vitest";
import { Product } from "../types";
import filterProducts from "./filterProducts";

describe("filterProducts", () => {
  it("returns only the filtered products", () => {
    const products: Product[] = [
      {
        id: "1",
        title: "black shirt 1",
        vendor: "",
        totalInventory: 0,
        options: [
          { name: "color", values: ["black"] },
          { name: "size", values: ["S", "L"] },
        ],
        images: { edges: [] },
        collections: { edges: [] },
        variants: { edges: [] },
      },
      {
        id: "2",
        title: "white shirt 1",
        vendor: "",
        totalInventory: 0,
        options: [
          { name: "color", values: ["white"] },
          { name: "size", values: ["M", "L"] },
        ],
        images: { edges: [] },
        collections: { edges: [] },
        variants: { edges: [] },
      },
      {
        id: "3",
        title: "white shirt 1",
        vendor: "",
        totalInventory: 0,
        options: [
          { name: "color", values: ["white"] },
          { name: "size", values: ["S"] },
        ],
        images: { edges: [] },
        collections: { edges: [] },
        variants: { edges: [] },
      },
    ];
    const options = { size: ["L"], color: ["white"] };

    const result = filterProducts(products, options);

    expect(result).not.toContain(products[0]);
    expect(result).toContain(products[1]);
    expect(result).not.toContain(products[2]);
  });
});
