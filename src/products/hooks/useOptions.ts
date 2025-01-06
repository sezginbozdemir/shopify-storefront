import { useEffect, useState } from "react";
import { fetchAllOptions } from "../ProductApi";

export const useOptions = () => {
  const [options, setOptions] = useState<Record<string, any> | null>(null);
  const [optionsError, setOptionsError] = useState<string | null>(null);
  const [optionsLoading, setOptionsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadOptions = async () => {
      setOptionsLoading(true);
      try {
        const allOptions = await fetchAllOptions();
        setOptions(allOptions);
      } catch (err) {
        console.error("Error fetching options:", err);
        setOptionsError("An error occurred while fetching options.");
      } finally {
        setOptionsLoading(false);
      }
    };
    loadOptions();
  }, []);
  return { options, optionsError, optionsLoading };
};
