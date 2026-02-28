# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],

// ---------- below this line added by dev ----------
// instructions for adding Google Maps place picker
]
}
])

---

## Google Maps place picker

The UI example you found in the Google docs is a set of
custom elements (`<gmpx-api-loader>` and `<gmpx-place-picker>`) that are
loaded from the extended component library.  The Vite template already
adds the `<script>` tag to `index.html`, so the elements are available in
JSX.

* Create a `.env` file in the project root with:

```

VITE_GOOGLE_MAPS_KEY=AIza…<your key>

```

(Vite exposes any `VITE_` prefixed variables on `import.meta.env`.)
`PlacePicker` will automatically read this key, so callers typically
don’t need to pass the value explicitly.  You can still override it by
providing an `apiKey` prop if you ever need to use a different key at
runtime.
normalises the `gmpx-place-picked` event.  The example component lives in
`src/components/PlacePicker.tsx` and is already imported by
`DestinationForm.tsx`.

* You can either keep the simple text input or replace it entirely with
the place picker; the form component contains both implementations as
commented code.

* When a place is selected the string passed back to `App` is the
`formatted_address` (or `name` as a fallback), which is what the existing
`fetchRoute` function expects.

This should give you the same behaviour as the standalone HTML snippet in
React/TypeScript.

  // Enable lint rules for React DOM
  reactDom.configs.recommended,
],
languageOptions: {
  parserOptions: {
    project: ['./tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: import.meta.dirname,
  },
  // other options...
},
},
])
```
