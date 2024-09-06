import { useRef } from "react";

const useFilterSlide = () => {
  // 훅으로 뺄 예정
  const scrollRef = useRef<HTMLUListElement>(null);
  const scrollValue = useRef<number>(0);

  const handleClickPrev = () => {
    if (scrollRef.current) {
      if (scrollValue.current === 0) return;
      scrollValue.current += scrollRef.current.clientWidth - 70;
      scrollRef.current.style.transform = `translateX(${scrollValue.current}px)`;
    }
  };

  const handleClickNext = () => {
    if (scrollRef.current) {
      scrollValue.current -= scrollRef.current.clientWidth - 70;
      if (scrollValue.current < -scrollRef.current.scrollWidth) return;

      scrollRef.current.style.transform = `translateX(${scrollValue.current}px)`;
    }
  };

  return { scrollRef, scrollValue, handleClickPrev, handleClickNext };
};

export default useFilterSlide;
