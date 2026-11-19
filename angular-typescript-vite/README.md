# Testing an Angular component with WebdriverIO

Use Node.js 24.22.1 or later in the 24.x series and run these commands from this directory:

```sh
npm ci
npm run wdio
```

WebdriverIO launches headless Chrome. The test imports a standalone Angular counter, renders it with `TestBed.createComponent`, and clicks its button to check the updated count. The component uses an inline template. Angular's JIT compiler loads in the test and Vite handles the TypeScript decorators, so this example needs no Angular-specific WebdriverIO preset.

Run `npm run typecheck` to check the config, component, and test with TypeScript.
