// motionConfig.js
export const pageVariant = {
  hidden: { opacity: 0, y: 8, scale: 0.995 },
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: -6, scale: 0.995, transition: { duration: 0.35, ease: "easeIn" } },
};

export const container = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
      when: "beforeChildren",
    },
  },
};

export const item = {
  hidden: { opacity: 0, y: 10, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};
