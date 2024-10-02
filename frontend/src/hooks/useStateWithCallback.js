import { useCallback, useEffect, useRef, useState } from "react";

export const useStateWithCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef();
  const updateState = useCallback(
    (newState, cb) => {
      cbRef.current = cb;
      setState((prev) => {
        return typeof newState === "function" ? newState(prev) : newState;
      });
    },
    [state]
  );

  useEffect(() => {
    setTimeout(() => {
      if (cbRef.current) {
        cbRef.current(state);
        cbRef.current = null;
      }
    }, 500);
  }, [state]);

  return [state, updateState];
};
