import Constants from 'expo-constants';

const DEEPSEEK_API_KEY = 'sk-e6f03c3385de4449b6e9576d9c90b945';
const BASE_URL = 'https://api.deepseek.ai/v1';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface DeepSeekError {
  error: {
    message: string;
    type: string;
    code: number;
  };
}

export async function sendChatMessage(messages: ChatMessage[]) {
  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData: DeepSeekError = await response.json();
      throw new Error(
        errorData.error?.message || 
        `API error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('402')) {
        throw new Error('API key validation failed. Please check your API key or account status.');
      }
    }
    console.error('DeepSeek API error:', error);
    throw error;
  }
} 