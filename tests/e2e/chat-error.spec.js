import { expect, test } from '@playwright/test'

test('shows friendly error when backend fails', async ({ page }) => {
  await page.route('**/chat', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'internal' }),
    })
  })

  await page.goto('/')
  await page.getByTestId('message-input').fill('Teste erro')
  await page.getByTestId('send-button').click()

  await expect(page.getByTestId('request-error')).toBeVisible()
})
