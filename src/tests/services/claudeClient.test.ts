import { describe, it, expect, vi, beforeEach } from 'vitest';
import { callClaudeApi } from '../../services/ai/claudeClient';
import { generateMockSpec } from '../../services/ai/mockGenerator';

describe('claudeClient Service', () => {
  const dummySpec = generateMockSpec({
    featureName: 'Claude Feature',
    targetAudience: 'Product teams',
    coreProblem: 'Testing claude',
    techStack: 'React',
    complexity: 'standard'
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('successfully parses valid JSON response from Claude Messages API', async () => {
    const mockResponse = {
      content: [
        {
          type: 'text',
          text: JSON.stringify(dummySpec)
        }
      ]
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    } as any);

    const result = await callClaudeApi(
      {
        featureName: 'Claude Feature',
        targetAudience: 'Product teams',
        coreProblem: 'Testing claude',
        techStack: 'React',
        complexity: 'standard'
      },
      'sk-ant-test-key'
    );

    expect(result.sourceProvider).toBe('claude');
    expect(result.title).toBe(dummySpec.title);
  });

  it('throws an error when Claude API returns a non-200 status', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: vi.fn().mockResolvedValue('Authentication failed')
    } as any);

    await expect(
      callClaudeApi(
        {
          featureName: 'Claude Feature',
          targetAudience: 'Product teams',
          coreProblem: 'Testing claude',
          techStack: 'React',
          complexity: 'standard'
        },
        'bad-key'
      )
    ).rejects.toThrow(/Claude API error \(401\)/);
  });
});
