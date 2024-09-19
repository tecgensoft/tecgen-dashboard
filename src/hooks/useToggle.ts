import useToggle from "./useTg";

// Define a TypeScript type for the hook
function useToggleModal(): [boolean, () => void, () => void] {
  const [isOpen, toggle] = useToggle(); // Rename setShow to toggle

  // Functions to explicitly set the state
  function setClose() {
    if (isOpen) toggle(); // Use the toggle function to change to false
  }

  function setOpen() {
    if (!isOpen) toggle(); // Use the toggle function to change to true
  }

  return [isOpen, setOpen, setClose];
}

export default useToggleModal;