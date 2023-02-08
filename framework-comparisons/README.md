# Comparing Frameworks on Component Testing Capabilities

This example directory showcases shortcomings when testing components with different component testing frameworks.
The goal is to identify the quality of tests being run.
We are looking into the following set-ups:

- Vitest using JSDOM
- WebdriverIO using Chromedriver
- Cypress using proprietary automation
- Playwright using proprietary automation

## Use Cases

We are testing a simple [React component](./src/components/Card.tsx) that introduces side effects which can represent arbitrary bugs.

| Side Effect | Vitest + JSDOM | WebdriverIO | Cypress | Playwright |
| ----------- | -------------- | ----------- | ------- | ---------- |
| Element is not visible due to `visibility: hidden` CSS attribute | ❌ test passes | ✔️ test fails | ✔️ test fails* | ✔️ test fails* |
| Element is not visible due to CSS attributes that set the element to have a height of 0px | ❌ test passes | ✔️ test fails | ✔️ test fails* | ✔️ test fails* |
| Element is not interactable due to another overlaying element | ❌ test passes | ✔️ test fails** | ✔️ test fails** | ✔️ test fails** |
| Element is not visible as it is positioned outside of the viewport | ❌ test passes | ✔️ test fails | ❌ test passes*** | ❌ test passes*** |

`*` The framework is still able to determine the element's text, which would be impossible for a user because the element is not visible<br />
`**` See *. Theoretically, elements can be transparent, which would allow users to see the elements that are behind them. In this case, however, the overlaying element has a red background color, so should not allow reading the text.<br />
`***` Some frameworks have magic hooks that ensure that elements are within the viewport. While this stabilizes tests, it can make them less reliable, as the attempt to move them into the viewport is not what users would do in reality.
