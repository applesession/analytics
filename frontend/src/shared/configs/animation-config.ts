import type { Variants } from 'framer-motion';

export const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const listItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
