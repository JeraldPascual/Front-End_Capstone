import type { FeatureSpec, SpecPromptInput } from '../../types/spec';
import { SPEC_SYSTEM_PROMPT, buildSpecPrompt } from './prompts';

export async function callGeminiApi(input: SpecPromptInput, apiKey: string): Promise<FeatureSpec> {
  const userPrompt = buildSpecPrompt(input);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SPEC_SYSTEM_PROMPT }]
      },
      contents: [
        {
          parts: [{ text: userPrompt }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textContent) {
    throw new Error('No candidate content returned from Gemini API');
  }

  const cleanJson = textContent.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
  const parsed = JSON.parse(cleanJson);

  return {
    id: `spec-${Date.now()}`,
    ...parsed,
    createdAt: new Date().toISOString(),
    sourceProvider: 'gemini'
  };
}
