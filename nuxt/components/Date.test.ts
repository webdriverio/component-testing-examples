import { $, expect } from '@wdio/globals'
import { render } from '@testing-library/vue'

import DateComponent from './Date.vue'

describe('Date Component', () => {
    it.only('should display date correctly', async () => {
        const date = new Date('2043')
        const localTime = date.toLocaleString("en-US", {
          timeZone: "America/New_York"
        })
        render(DateComponent, { props: { date: localTime } })
        const component = await $('span')
        await expect(component).toBePresent()
        await expect(component).toHaveText(
          process.env.CI
            ? '12/31/2042, 7:00:00 PM'
            : '31/12/2042, 19:00:00'
        )
    })
})
