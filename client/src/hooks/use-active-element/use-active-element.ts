import { useEffect, useState } from "react";

const useActiveElement = <T extends Element>() => {
  const [activeElement, setActiveElement] = useState<T | null>(null);

  useEffect(() => {
    const handleFocus = () => {
      setActiveElement(document.activeElement as T);
    };
    const handleBlur = () => {
      setActiveElement(null);
    };
    document.addEventListener("focus", handleFocus, true);
    document.addEventListener("blur", handleBlur, true);

    return () => {
      document.removeEventListener("focus", handleFocus);
      document.removeEventListener("blur", handleBlur);
    };
  }, []);

  return activeElement;
};

export default useActiveElement;
