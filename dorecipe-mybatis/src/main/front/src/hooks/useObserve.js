import { useEffect, useCallback, useRef, useState } from "react";

const useObServe = (observeTarget, isLoading = false) => {
  let observer = useRef(null);
  const [page, setPage] = useState(0);

  const obsHandler = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    if (observeTarget.current && !isLoading) {
      observer.current = new IntersectionObserver(obsHandler, {
        rootMargin: "80px",
        threshold: 1,
      });
      observer.current.observe(observeTarget.current);
    }
    return () => {
      if (!isLoading) {
        observeTarget.current &&
          observer.current.unobserve(observeTarget.current);
      }
    };
  }, [page, isLoading]);

  return page;
};
export default useObServe;
