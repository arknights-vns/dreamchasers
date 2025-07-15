import antfu from "@antfu/eslint-config";
import nextjs from "@next/eslint-plugin-next";

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
        plugins: {
            "@next/next": nextjs,
        },
        rules: {
            ...nextjs.configs.recommended.rules,
            ...nextjs.configs["core-web-vitals"].rules,
        },
    },
    // Custom rules.
    {
        rules: {
            "no-console": ["error", { allow: ["warn", "error", "info"] }],
            "style/brace-style": ["error", "1tbs"],
            "ts/consistent-type-definitions": ["error", "type"],
            "node/prefer-global/process": ["error", "always"],
            "react-hooks-extra/no-direct-set-state-in-use-effect": "off",
            "@eslint-react/prefer-shorthand-fragment": "error",
            "@eslint-react/prefer-shorthand-boolean": "error",
            // "@stylistic/max-len": ["error", { code: 100 }],
            "@stylistic/jsx-curly-brace-presence": [
                "warn",
                {
                    props: "always",
                    children: "never",
                    propElementValues: "always",
                },
            ],
        },
    },
);
