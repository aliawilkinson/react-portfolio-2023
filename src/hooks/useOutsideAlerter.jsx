import { useEffect } from "react";

export default function useOutsideAlerter({ menuRef, setMenuOpened }) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Read viewport width inside the handler so it's always current
        if (document.documentElement.clientWidth <= 640) {
          setMenuOpened(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, setMenuOpened]);
}
