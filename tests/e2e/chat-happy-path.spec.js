import { expect, test } from '@playwright/test'

test('sends a message and renders assistant response', async ({ page }) => {
  await page.route('**/chat', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: {
        'x-thread-id': '0c9b7754-0d20-49de-a30b-0bf95f6fc4f0',
      },
      body: JSON.stringify({ answer: 'Resposta do backend' }),
    })
  })

  await page.goto('/')
  await page.getByTestId('message-input').fill('Qual meu saldo?')
  await page.getByTestId('send-button').click()

  await expect(page.getByText('Qual meu saldo?')).toBeVisible()
  await expect(page.getByText('Resposta do backend')).toBeVisible()
})
