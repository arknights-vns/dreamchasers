import antfu from "@antfu/eslint-config";
import nextjs from "@next/eslint-plugin-next";
import eslintParserTypeScript from "@typescript-eslint/parser";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";

export default antfu(
    {
        type: "app",
        stylistic: {
            indent: 4,
            quotes: "double",
            semi: true,
            trailingComma: "true",
            arrowParens: "always",
        },
        formatters: true,
        typescript: true,
        react: true,
        imports: true,
    },
    {
        ignores: [
            ".next",
            "node_modules",
            "components/ui/*.tsx",
            "components/svg/*.tsx",
            "lib/utils.ts",
            "lib/supabase/terra.d.ts",
        ],
    },
    // Next.js
    {
        plugins: {
            "@next/next": nextjs,
        },
        rules: {
            ...nextjs.configs.recommended.rules,
            ...nextjs.configs["core-web-vitals"].rules,
        },
    },
    // TailwindCSS
    {
        files: ["**/*.{ts,tsx,cts,mts}"],
        languageOptions: {
            parser: eslintParserTypeScript,
            parserOptions: {
                project: true,
            },
        },
    },
    {
        files: ["**/*.{jsx,tsx}"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            "better-tailwindcss": eslintPluginBetterTailwindcss,
        },
        rules: {
            "better-tailwindcss/enforce-consistent-class-order": ["error", { order: "improved" }],
            "better-tailwindcss/enforce-consistent-important-position": ["error", { position: "recommended" }],
            "better-tailwindcss/enforce-consistent-variable-syntax": "error",
            "better-tailwindcss/enforce-shorthand-classes": "error",
            "better-tailwindcss/no-deprecated-classes": "error",
            "better-tailwindcss/no-duplicate-classes": "error",
            "better-tailwindcss/no-unnecessary-whitespace": ["error", { allowMultiline: true }],
        },
        settings: {
            "better-tailwindcss": {
                entryPoint: "./app/globals.css",
            },
        },
    },
    // Custom rules for antfu.
    {
        rules: {
            "no-console": ["warn", { allow: ["warn", "error", "info"] }],
            "ts/consistent-type-definitions": ["error", "type"],
            "node/prefer-global/process": ["error", "always"],
            "react-hooks-extra/no-direct-set-state-in-use-effect": "off",
            "@eslint-react/prefer-shorthand-fragment": "error",
            "@eslint-react/prefer-shorthand-boolean": "error",
            "style/brace-style": ["error", "1tbs"],
            "style/jsx-sort-props": ["warn", {
                callbacksLast: true,
                reservedFirst: true,
            }],
            "style/jsx-curly-brace-presence": ["warn", {
                props: "always",
                children: "never",
                propElementValues: "always",
            }],
        },
    },
);
