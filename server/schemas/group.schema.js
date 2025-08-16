import { z } from 'zod';

export const groupSchema = z.object({
    name: z.string().min(1, 'Group name is required'),
    description: z.string().optional(),
})