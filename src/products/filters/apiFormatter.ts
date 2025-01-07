export function apiFormatter(
  priceRange: number[],
  selectedBrands: string[]
): string {
  const brandFilter =
    selectedBrands.length > 0
      ? selectedBrands.map((brand) => `vendor:'${brand}'`).join(" OR ")
      : "";

  const priceFilter = priceRange
    ? `variants.price:>=${priceRange[0]} AND variants.price:<=${priceRange[1]}`
    : "";

  return [brandFilter, priceFilter].filter(Boolean).join(" AND ");
}
