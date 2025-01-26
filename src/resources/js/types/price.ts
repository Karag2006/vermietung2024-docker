import { z } from "zod";

export const priceSchema = z.object({
    id: z.number().optional().nullable(),
    name: z.string(),
    stunden5: z.number().optional().nullable(),
    tag1: z.number().optional().nullable(),
    wochenende: z.number().optional().nullable(),
    wochen1: z.number().optional().nullable(),
    wochen2: z.number().optional().nullable(),
    wochen3: z.number().optional().nullable(),
});

export const trailerPriceSchema = z.object({
    id: z.number().optional().nullable(),
    title: z.string().optional().nullable(),
    platenumber: z.string().optional().nullable(),
    totalWeight: z.number().optional().nullable(),
    usableWeight: z.number().optional().nullable(),
    loading_size: z.string().optional().nullable(),
    price: priceSchema.optional().nullable(),
});

export const priceSelectorSchema = z.object({
    id: z.number(),
    selector: z.string(),
});

export type Price = z.infer<typeof priceSchema>;

export type PriceSelector = z.infer<typeof priceSelectorSchema>;

export type TrailerPrice = z.infer<typeof trailerPriceSchema>;
