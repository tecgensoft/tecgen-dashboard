import { useCallback, useState } from "react";

// Define a TypeScript type for the hook
const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState);

  // Define and memorize toggler function
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

export default useToggle;