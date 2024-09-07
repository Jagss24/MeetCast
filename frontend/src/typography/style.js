export const VIEW = {
  lg: `@media (min-width: 1024px)`,
  md: `@media (min-width: 768px)`,
  sm: `@media (min-width: 640px)`,
  xs: `@media (min-width: 360px)`,
};

// Invert the above property
export const MAX = {
  lg: `@media not all and (min-width: 1024px)`,
  md: `@media not all and (min-width: 768px)`,
  sm: `@media not all and (min-width: 640px)`,
  xs: `@media not all and (min-width: 360px)`,
};
