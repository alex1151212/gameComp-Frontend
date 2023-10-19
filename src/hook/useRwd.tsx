import { useEffect, useState } from "react";

const useRwd = () => {
  const [isMobile, setIsMobile] = useState(false);
  const onPageResize = () => {
    setIsMobile(window.innerWidth < Number(480));
  };
  useEffect(() => {
    setIsMobile(window.innerWidth < Number(480));
    window.addEventListener("resize", onPageResize);
    return () => {
      window.removeEventListener("resize", onPageResize);
    };
  }, []);

  return { isMobile };
};

export default useRwd;
