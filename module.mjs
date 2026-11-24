// @ts-check
import { appRoot } from "@prisma/composer";
import portfolioNextService from "./service.mjs";

export default appRoot("portfolio", ({ provision }) => {
  provision(portfolioNextService, { id: "portfolionext" });
});
