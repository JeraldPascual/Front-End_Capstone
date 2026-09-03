import { describe, it, expect, vi } from 'vitest';
import { generateSpecification } from '../../services/ai/aiService';

describe('aiService Orchestrator', () => {
  it('validates feature name and rejects empty or short names', async () => {
    await expect(
      generateSpecification(
        {
          featureName: '',
          targetAudience: 'Test',
          coreProblem: 'Test',
          techStack: 'React',
          complexity: 'standard'
        },
        { provider: 'mock' }
      )
    ).rejects.toThrow('Feature name is required.');

    await expect(
      generateSpecification(
        {
          featureName: 'ab',
          targetAudience: 'Test',
          coreProblem: 'Test',
          techStack: 'React',
          complexity: 'standard'
        },
        { provider: 'mock' }
      )
    ).rejects.toThrow('Feature name must be at least 3 characters.');
  });

  it('runs mock generation when provider is mock', async () => {
    const progressSpy = vi.fn();
    const result = await generateSpecification(
      {
        featureName: 'Valid Feature Name',
        targetAudience: 'Developers',
        coreProblem: 'Testing orchestrator',
        techStack: 'React',
        complexity: 'standard'
      },
      { provider: 'mock' },
      progressSpy
    );

    expect(result.spec.title).toBe('Valid Feature Name');
    expect(result.usedFallback).toBe(false);
    expect(progressSpy).toHaveBeenCalledWith('analyzing');
    expect(progressSpy).toHaveBeenCalledWith('finalizing');
  });

  it('gracefully activates fallback when external API fails (FE-07 resilience)', async () => {
    // Force Claude API call with invalid endpoint/error
    const result = await generateSpecification(
      {
        featureName: 'Resilient Failure Feature',
        targetAudience: 'Developers',
        coreProblem: 'Network outage handling',
        techStack: 'React',
        complexity: 'standard'
      },
      { provider: 'claude', apiKey: 'invalid-key' }
    );

    expect(result.usedFallback).toBe(true);
    expect(result.warningMessage).toContain('Live AI generation failed');
    expect(result.spec).toBeDefined();
    expect(result.spec.title).toBe('Resilient Failure Feature');
  });
});