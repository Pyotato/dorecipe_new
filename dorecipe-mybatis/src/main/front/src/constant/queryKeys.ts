export const recipeKeys = {
  all: ["recipes"] as const,
  lists: () => [...recipeKeys.all, "list"] as const,
  list: (filters: string) => [...recipeKeys.all, "detail"] as const,
  details: () => [...recipeKeys.all, "detail"] as const,
  detail: (id: number) => [...recipeKeys.details(), id] as const,
};
