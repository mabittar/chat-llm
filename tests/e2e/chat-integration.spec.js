import { expect, test } from '@playwright/test'

test('integrated chat request against banking-llm backend', async ({ page }) => {
  test.setTimeout(180000)

  const prompt = 'quais sao minhas chaves pix ativas?'

  await page.goto('/')
  await page.getByTestId('message-input').fill(prompt)
  await page.getByTestId('send-button').click()

  await expect(page.getByText(prompt)).toBeVisible()

  const assistantReply = page.locator('.message.assistant .message-content').last()
  const requestError = page.getByTestId('request-error')

  await Promise.race([
    assistantReply.waitFor({ state: 'visible', timeout: 120000 }),
    requestError.waitFor({ state: 'visible', timeout: 120000 }),
  ])

  await expect(requestError).toHaveCount(0)

  const replyText = (await assistantReply.textContent())?.trim() ?? ''
  expect(replyText.length).toBeGreaterThan(3)
})
