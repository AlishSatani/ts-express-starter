import zod from "zod";

export const dailySchema = zod.object({
  symbol: zod
    .string({
      required_error: "Symbol must be specified.",
    })
    .trim()
    .min(1, "Symbol cannot be empty"),
  outputsize: zod.enum(["compact", "full"]).optional(),
});

export const dailyAdjustedSchema = zod.object({
  symbol: zod
    .string({
      required_error: "Symbol must be specified.",
    })
    .trim()
    .min(1, "Symbol cannot be empty"),
  outputsize: zod.enum(["compact", "full"]).optional(),
});