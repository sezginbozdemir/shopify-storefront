import { Product } from "../types";

const getOptions = (products: Product[]) => {
  const result: { [key: string]: string[] } = {};

  products.forEach((product: any) => {
    const optionsMap: { [key: string]: Set<string> } = {};

    product.options.forEach((option: { name: string; values: string[] }) => {
      if (!optionsMap[option.name]) {
        optionsMap[option.name] = new Set();
      }
      option.values.forEach((value) => optionsMap[option.name].add(value));
    });

    for (const name in optionsMap) {
      if (!result[name]) {
        result[name] = [];
      }
      result[name] = Array.from(
        new Set([...result[name], ...optionsMap[name]])
      );
    }
  });

  return result;
};

export default getOptions;
