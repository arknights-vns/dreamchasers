import antfu from "@antfu/eslint-config";
import nextjs from "@next/eslint-plugin-next";
import eslintParserTypeScript from "@typescript-eslint/parser";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";

export default antfu(
    // anthony fu
    {
        type: "app",
        stylistic: {
            indent: 4,
            quotes: "double",
            semi: true
        },
        typescript: true,
        react: true,
        jsx: true,
        yaml: false,
        jsonc: false,
        lessOpinionated: true,
        ignores: [
            ".next",
            "node_modules",
            "public",
            // let shadcn cook on his own.
            "components/ui/**/*.tsx",
            // generated
            "lib/supabase/terra.d.ts"
        ]
    },
    // Next.js
    {
        plugins: {
            "@next/next": nextjs
        },
        rules: {
            ...nextjs.configs.recommended.rules,
            ...nextjs.configs["core-web-vitals"].rules
        }
    },
    // TailwindCSS
    {
        files: ["**/*.{ts,tsx,cts,mts}"],
        languageOptions: {
            parser: eslintParserTypeScript,
            parserOptions: {
                project: true
            }
        }
    },
    {
        files: ["**/*.{jsx,tsx}"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            "better-tailwindcss": eslintPluginBetterTailwindcss
        },
        rules: {
            ...eslintPluginBetterTailwindcss.configs["recommended-warn"].rules,
            "better-tailwindcss/enforce-consistent-line-wrapping": ["warn", {
                group: "newLine",
                indent: 4
            }]
        },
        settings: {
            "better-tailwindcss": {
                entryPoint: "./app/globals.css"
            }
        }
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
            "style/comma-dangle": ["error", "never"],
            "style/jsx-sort-props": ["warn", {
                callbacksLast: true,
                reservedFirst: true
            }],
            "style/jsx-curly-brace-presence": ["warn", {
                props: "always",
                children: "never",
                propElementValues: "always"
            }],
            "no-restricted-syntax": [
                "error",
                {
                    selector: "JSXAttribute[name.name='className'] JSXExpressionContainer > TemplateLiteral[expressions.length > 0]",
                    message: "Haiya please use clsx bro..."
                }
            ],
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: ["./*", "../*"],
                            message: "Haiya please use @ import bro..."
                        }
                    ]
                }
            ]
        }
    }
);
