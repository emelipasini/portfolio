import { z } from "zod";

const ContactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(5, "Please enter a valid name and surname")
        .max(40, "Name must be less than 40 characters")
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "The name can only contain letters and spaces"),
    email: z.string().trim().email("Please enter a valid email"),
    message: z
        .string()
        .trim()
        .min(10, "Message must be at least 10 characters long")
        .max(1000, "Message must be less than 1000 characters")
        .refine((val) => /[a-zA-Z]/.test(val), {
            message: "Message must contain real text",
        }),
});

export type ContactData = z.infer<typeof ContactSchema>;

export default ContactSchema;
