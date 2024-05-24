import { debounce } from "@mui/material";
import { useMemo } from "react";
import useLatest from "./useLatest";

const useDebounce = (callback, ms) => {
  const latestCallback = useLatest(callback);

  return useMemo(
    () =>
      debounce((...args) => {
        latestCallback.current(...args);
      }, ms),
    [ms, latestCallback]
  );
};

export default useDebounce;
