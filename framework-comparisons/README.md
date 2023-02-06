# Comparing Frameworks on Component Testing Capabilities

This example directory showcases shortcomings when testing components with different component testing frameworks. The goal is to identify the quality of tests being run. We are looking into the following set-ups:

- Vitest using JSDOM
- WebdriverIO using Chromedriver
- Cypress using proprietary automation
- Playwright using proprietary automation

## Use Cases

We are testing a simple [React component]('./src/components/Card.tsx') that introduces side effects which can represent arbitrary bugs.

| Side Effect | Vitest + JSDOM | WebdriverIO | Cypress | Playwright |
| Element is not visible due to `visibility: hidden` CSS attribute | ❌ test passes | ✔️ test fails | ✔️ test fails* | tbd |
| Element is not visible due to CSS attributes that set the element 0px height | ❌ test passes | ✔️ test fails | ✔️ test fails* | tbd |
| Element is not interactable due to another overlaying element | ❌ test passes | ✔️ test fails** | ✔️ test fails** | tbd |
| Element is not visible as it is positioned outside of the viewport | ❌ test passes | ✔️ test fails | ✔️ test fails* | tbd |

* the framework was still able to determine the element text which is impossible for a user because the element is not visible
** see *, however, elements can be transparent allowing users to see the elements that are behind them, in this case, the overlaying element had red background color and should theoretically not allow reading the text
