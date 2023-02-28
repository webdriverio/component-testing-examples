# Comparing Frameworks on Component Testing Capabilities

This example directory showcases shortcomings when testing components with different component testing frameworks.
The goal is to identify the quality of tests being run.
We are looking into the following set-ups:

- Vitest using JSDOM
- WebdriverIO using Chromedriver
- Cypress using proprietary automation
- Playwright using proprietary automation

## User Behavior w/ Side Effects

We are testing a simple [React component](./src/components/Card.tsx) that introduces side effects that can represent arbitrary bugs.

### Click Scenario
In this scenario, we attempt to click on a button with different side effects.

| Side Effect | Vitest + JSDOM | WebdriverIO | Cypress | Playwright |
| ---------- | -------------- | ----------- | ------- | ---------- |
| Element is not visible due to `visibility: hidden` CSS attribute | ❌ test passes | ✔️ test fails | ✔️ test fails* | ✔️ test fails* |
| Element is not visible due to CSS attributes that set the element to have a height of 0px | ❌ test passes | ✔️ test fails | ✔️ test fails* | ✔️ test fails* |
| Element is not interactable due to another overlaying element | ❌ test passes | ✔️ test fails** | ✔️ test fails** | ✔️ test fails** |
| Element is not visible as it is positioned outside of the viewport | ❌ test passes | ✔️ test fails | ❌ test passes*** | ❌ test passes*** |

### Set Input Text
In this scenario, we set a value to an input text element.

| Side Effect | Vitest + JSDOM | WebdriverIO | Cypress | Playwright |
| ---------- | -------------- | ----------- | ------- | ---------- |
| Element is disabled | ❌ test passes | ✔️ test fails | ✔️ test fails | ✔️ test fails |
| Element is not visible due to `visibility: hidden` CSS attribute | ❌ test passes | ✔️ test fails | ✔️ test fails* | ✔️ test fails* |
| Element is not visible due to CSS attributes that set the element to have a height of 0px | ❌ test passes | ✔️ test fails | ✔️ test fails* | ✔️ test fails* |
| Element is not interactable due to another overlaying element | ❌ test passes | ❌ test passes | ✔️ test fails | ❌ test passes |
| Element is not visible as it is positioned outside of the viewport | ❌ test passes | ✔️ test fails | ✔️ test fails | ❌ test passes*** |

## User Capabilities
We are testing React components that require certain user interaction, e.g. through gestures.

### User Gestures
In this scenario, we attempt to use user gestures to zoom in and out of a component.

| Scenario | Vitest + JSDOM | WebdriverIO | Cypress | Playwright |
| -------- | -------------- | ----------- | ------- | ---------- |
| Zoom via scrolling | ❌ n/a**** | ✔️ test passes | ✔️ test passes | ✔️ test passes |
| Zoom via pinch gesture | ❌ n/a**** | ✔️ test passes | ❌ test fails | ❌ n/a**** |

## Framework Capabilities
We inspect features of frameworks that are useful for testing web components.

### Mocking
In this scenario, we are going through various mocking scenarios.

| Scenario | Vitest + JSDOM | WebdriverIO | Cypress | Playwright |
| -------- | -------------- | ----------- | ------- | ---------- |
| Mocking of dependencies: Algolia InstantSearch Client | ✔️ test passes | ✔️ test passes | ❌ not supported***** | ❌ not supported***** |

* https://github.com/microsoft/playwright/issues/14572

---

`*` The framework is still able to determine the element's text, which would be impossible for a user because the element is not visible<br />
`**` See *. Theoretically, elements can be transparent, which would allow users to see the elements that are behind them. In this case, however, the overlaying element has a red background color, so should not allow reading the text.<br />
`***` Some frameworks have magic hooks that ensure that elements are within the viewport. While this stabilizes tests, it can make them less reliable, as the attempt to move them into the viewport is not what users would do in reality.
`****` No general support for this interaction
`*****` Issues was filed, see [cypress-io/cypress#16741](https://github.com/cypress-io/cypress/discussions/16741) or [microsoft/playwright#14572](https://github.com/microsoft/playwright/issues/14572)
