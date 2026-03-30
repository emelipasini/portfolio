import { describe, it, expect } from "vitest";

import ContactSchema from "../../schemas/contact";

describe("Contact Schema - Validations", () => {
    it.each([
        { data: { name: "", email: "test@test.com", message: "Valid message content" }, error: "name" },
        { data: { name: "Abc", email: "test@test.com", message: "Valid message content" }, error: "name" },
        { data: { name: "A".repeat(41), email: "test@test.com", message: "Valid message content" }, error: "name" },
        { data: { name: "Jane123", email: "test@test.com", message: "Valid message content" }, error: "name" },
        { data: { name: "Jane @ Doe", email: "test@test.com", message: "Valid message content" }, error: "name" },

        { data: { name: "Jane Doe", email: "", message: "Valid message content" }, error: "email" },
        { data: { name: "Jane Doe", email: "not-an-email", message: "Valid message content" }, error: "email" },
        { data: { name: "Jane Doe", email: "test@", message: "Valid message content" }, error: "email" },

        { data: { name: "Jane Doe", email: "test@test.com", message: "" }, error: "message" },
        { data: { name: "Jane Doe", email: "test@test.com", message: "Short" }, error: "message" },
        { data: { name: "Jane Doe", email: "test@test.com", message: "a".repeat(1001) }, error: "message" },
        { data: { name: "Jane Doe", email: "test@test.com", message: "1234567890!!!" }, error: "message" },

        { data: { email: "test@test.com", message: "Valid message content" }, error: "name" },
        { data: { name: "Jane Doe", message: "Valid message content" }, error: "email" },
        { data: { name: "Jane Doe", email: "test@test.com" }, error: "message" },
    ])("must fail if $error is invalid or missing", ({ data, error }) => {
        const result = ContactSchema.safeParse(data);

        expect(result.success).toBe(false);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            expect(fieldErrors).toHaveProperty(error);
        }
    });

    it("should pass with a perfectly valid payload", () => {
        const validPayload = {
            name: "Matias Pérez",
            email: "matias@example.com",
            message: "This is a valid message with more than ten characters.",
        };

        const result = ContactSchema.safeParse(validPayload);
        expect(result.success).toBe(true);
    });

    it("should pass and trim whitespace from fields", () => {
        const payloadWithSpaces = {
            name: "   Jane Doe   ",
            email: "  jane@doe.com  ",
            message: "   This message has leading/trailing spaces   ",
        };

        const result = ContactSchema.safeParse(payloadWithSpaces);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.name).toBe("Jane Doe");
            expect(result.data.email).toBe("jane@doe.com");
        }
    });
});
