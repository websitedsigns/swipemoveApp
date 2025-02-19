//types.ts
export interface Property {
  title: string | undefined;
  id: string;
  image: string;
  price: number;
  bedrooms: number;
  type: string;
  address: string;
  url: string;
}

export const theme = {
  primary: "#7AFFF6",
  secondary: "#5DC2BB",
  accent: "#6200ea",
  text: "#333333",
  background: "#f7f7f7",
};
