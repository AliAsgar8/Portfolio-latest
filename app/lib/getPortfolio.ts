import data from "@/app/data/portfolio.json";
import type { Portfolio } from "@/app/types/portfolio";

export function getPortfolio(): Portfolio {
  return data as Portfolio;
}
