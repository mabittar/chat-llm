import http, { toTechnicalError } from '@/api/http'
import { buildThreadHeader, readThreadIdFromHeaders } from '@/utils/thread-id'

export async function sendChatMessage({ question, threadId }) {
  if (!question || !question.trim()) {
    throw new Error(
      `Invalid question value '${question}'. Expected a non-empty string.`
    )
  }

  if (!threadId || !threadId.trim()) {
    throw new Error(
      `Invalid threadId value '${threadId}'. Expected a non-empty string.`
    )
  }

  try {
    const response = await http.post(
      '/chat',
      { question: question.trim() },
      { headers: buildThreadHeader(threadId) }
    )

    return {
      answer: response?.data?.answer ?? '',
      threadId: readThreadIdFromHeaders(response?.headers) ?? threadId,
    }
  } catch (error) {
    throw toTechnicalError(error)
  }
}
