import { useEffect, useState } from "react";

const SHADOW_ON = "rgba(0, 0, 0, 0.4) 0px 4px 12px -1px, rgba(0, 0, 0, 0.3) 0px 2px 6px -1px";
const SHADOW_OFF = "none";

const useHeaderShadow = () => {
  const [headerShadow, setHeaderShadow] = useState(SHADOW_OFF);

  useEffect(() => {
    function handleScroll() {
      setHeaderShadow(window.scrollY > 0 ? SHADOW_ON : SHADOW_OFF);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return headerShadow;
};

export default useHeaderShadow;
