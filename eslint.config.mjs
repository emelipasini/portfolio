import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
    {
        ignores: ["build/**", "eslint.config.mjs", "dist/**"],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            import: importPlugin,
            n: nodePlugin,
            promise: promisePlugin,
            "@stylistic": stylistic,
        },
        rules: {
            ...nodePlugin.configs.recommended.rules,
            ...promisePlugin.configs.recommended.rules,
            semi: "off",
            quotes: "off",
            "@typescript-eslint/semi": "off",
            "@/quotes": ["error", "double"],
            "@/indent": ["error", 4],
            "import/order": ["error", { "newlines-between": "always" }],
            "@typescript-eslint/space-before-function-paren": "off",
            "@/comma-dangle": ["error", "only-multiline"],
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "@stylistic/member-delimiter-style": [
                "error",
                {
                    multiline: { delimiter: "semi", requireLast: true },
                    singleline: { delimiter: "semi", requireLast: false },
                },
            ],
            "import/order": [
                "error",
                {
                    groups: ["builtin", "external", "internal", "parent", "sibling", "index", "type"],
                    alphabetize: { order: "asc", caseInsensitive: true },
                    "newlines-between": "always",
                },
            ],
            "import/no-unresolved": "off",
            "import/named": "off",
            "import/namespace": "off",
            "import/default": "off",
            "import/no-named-as-default": "off",
            "import/no-named-as-default-member": "off",
            "import/no-duplicates": "off",
            "n/no-missing-import": "off",
        },
    },
    {
        files: ["**/tests/**/*.ts", "**/*.test.ts", "**/*.spec.ts"],
        rules: {
            "@typescript-eslint/unbound-method": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "n/no-unpublished-import": "off",
        },
    }
);
