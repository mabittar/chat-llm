import { expect, test } from '@playwright/test'

test('uses returned x-thread-id for next message in same chat', async ({ page }) => {
  const capturedHeaders = []
  const serverThreadId = '8194191d-f5eb-44c6-9ca8-f6b8dbf3caf5'

  await page.route('**/chat', async (route) => {
    capturedHeaders.push(route.request().headers()['x-thread-id'])

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: {
        'x-thread-id': serverThreadId,
      },
      body: JSON.stringify({ answer: 'ok' }),
    })
  })

  await page.goto('/')

  await page.getByTestId('message-input').fill('Primeira')
  await page.getByTestId('send-button').click()

  await page.getByTestId('message-input').fill('Segunda')
  await page.getByTestId('send-button').click()

  await expect.poll(() => capturedHeaders.length).toBe(2)
  expect(capturedHeaders[1]).toBe(serverThreadId)
})
