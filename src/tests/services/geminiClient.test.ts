import { describe, it, expect, vi, beforeEach } from 'vitest';
import { callGeminiApi } from '../../services/ai/geminiClient';
import { generateMockSpec } from '../../services/ai/mockGenerator';

describe('geminiClient Service', () => {
  const dummySpec = generateMockSpec({
    featureName: 'Gemini Feature',
    targetAudience: 'Product teams',
    coreProblem: 'Testing gemini',
    techStack: 'React',
    complexity: 'standard'
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('successfully parses valid JSON response from Gemini API', async () => {
    const mockJson = {
      candidates: [
        {
          content: {
            parts: [{ text: JSON.stringify(dummySpec) }]
          }
        }
      ]
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockJson)
    } as any);

    const result = await callGeminiApi(
      {
        featureName: 'Gemini Feature',
        targetAudience: 'Product teams',
        coreProblem: 'Testing gemini',
        techStack: 'React',
        complexity: 'standard'
      },
      'fake-gemini-key'
    );

    expect(result.sourceProvider).toBe('gemini');
    expect(result.title).toBe(dummySpec.title);
  });

  it('throws an error when Gemini API returns a non-200 status', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      text: vi.fn().mockResolvedValue('API key invalid')
    } as any);

    await expect(
      callGeminiApi(
        {
          featureName: 'Gemini Feature',
          targetAudience: 'Product teams',
          coreProblem: 'Testing gemini',
          techStack: 'React',
          complexity: 'standard'
        },
        'invalid-key'
      )
    ).rejects.toThrow(/Gemini API error \(403\)/);
  });
});
