import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CartComponent from "./CartComponent";

describe("cart component", () => {
  it("says empty cart if no items passed", () => {
    render(<CartComponent customerId="bob" cartItems={[]} />);
    expect(screen.getByText("No items in cart.")).toBeDefined();
  });
  //
  // it("displays total cost", () => {
  //   render(<CartComponent customerId="bob" cartItems={[]} />);
  //   expect(screen.getByText("€33")).toBeDefined();
  // });

  // attributes, discountAllocations, estimatedCost, merchandise [2322]
  //   it("lists items and their amount times individual costs", () => {
  //     render(<CartComponent customerId="bob" cartItems={[]} />);
  //
  //     items.forEach((item) => {
  //       expect(
  //         screen.getByText(
  //           `${item.name} (${currency}${item.cost} x ${item.amount})`,
  //         ),
  //       ).toBeDefined();
  //     });
  //   });
});
