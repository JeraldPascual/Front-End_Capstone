import type { FeatureSpec, SpecPromptInput } from '../../types/spec';
import { SPEC_SYSTEM_PROMPT, buildSpecPrompt } from './prompts';

export async function callClaudeApi(input: SpecPromptInput, apiKey: string): Promise<FeatureSpec> {
  const userPrompt = buildSpecPrompt(input);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      system: SPEC_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Claude API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const textContent = data.content?.[0]?.text;
  if (!textContent) {
    throw new Error('No text content returned from Claude API');
  }

  const cleanJson = textContent.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
  const parsed = JSON.parse(cleanJson);

  return {
    id: `spec-${Date.now()}`,
    ...parsed,
    createdAt: new Date().toISOString(),
    sourceProvider: 'claude'
  };
}
