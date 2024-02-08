import { RefObject } from "react";

type DirectionType = 'start' | 'end';
type ScrollType = 'instant' | 'smooth';

export const useScroll = <T extends HTMLElement>(
  ref: RefObject<T>,
  direction: DirectionType,
  callback?: () => void,
  type?: ScrollType,
) => {
  if (!ref.current) return;

  switch (direction) {
    case 'start':
      ref.current.scrollIntoView({ behavior: type ?? "instant", block: direction });
      break;
    case 'end':
      ref.current.scrollIntoView({ behavior: type ?? "instant", block: direction });
      break;
  }
  if (callback) {
    callback();
  }
};
