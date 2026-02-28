// allow the Google Maps eXtended components to be used in JSX
// without TypeScript complaining.  Adjust types later if you want
// more precision.

export { };

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "gmpx-api-loader": any;
            "gmpx-place-picker": any;
        }
