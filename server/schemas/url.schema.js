import {z} from "zod";

export const createLinkSchema = z.object({
    target : z.string().url().toLowerCase(),
    domain : z.string().optional(),
    customSlug: z.string().optional().refine(value => /^[a-zA-Z0-9-_]*$/.test(value ?? ""), 'Custom Slug contains only alpha num').default(''),
    clickLimit : z.number().int().min(0).default(10000),
    expiryDate: z.date().optional(),
    burnOnClick: z.boolean().default(false),
    isProtected: z.boolean().default(false),
    password: z.string().optional(),
    notifyOnExpiry: z.boolean().default(false),
    notifyOnClickLimit: z.boolean().default(false),
    groupId : z.string().default('68a07820a30e73956992a3d2'),
})