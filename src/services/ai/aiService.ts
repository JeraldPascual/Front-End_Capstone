import type { FeatureSpec, ProviderConfig, SpecPromptInput } from '../../types/spec';
import { callClaudeApi } from './claudeClient';
import { callGeminiApi } from './geminiClient';
import { generateMockSpec } from './mockGenerator';

export interface GenerationResult {
  spec: FeatureSpec;
  usedFallback: boolean;
  warningMessage?: string;
}

export async function generateSpecification(
  input: SpecPromptInput,
  config: ProviderConfig,
  onProgress?: (stage: 'analyzing' | 'drafting_stories' | 'evaluating_edge_cases' | 'finalizing') => void
): Promise<GenerationResult> {
  // Input validation
  if (!input.featureName.trim()) {
    throw new Error('Feature name is required.');
  }

  if (input.featureName.trim().length < 3) {
    throw new Error('Feature name must be at least 3 characters.');
  }

  // If user selected demo/mock provider
  if (config.provider === 'mock' || !config.apiKey) {
    if (onProgress) {
      onProgress('analyzing');
      await delay(300);
      onProgress('drafting_stories');
      await delay(400);
      onProgress('evaluating_edge_cases');
      await delay(300);
      onProgress('finalizing');
      await delay(200);
    }
    const spec = generateMockSpec(input);
    return { spec, usedFallback: config.provider !== 'mock' };
  }

  // Attempt live LLM generation with fallback
  try {
    if (onProgress) onProgress('analyzing');

    let spec: FeatureSpec;
    if (config.provider === 'claude') {
      if (onProgress) onProgress('drafting_stories');
      spec = await callClaudeApi(input, config.apiKey);
    } else if (config.provider === 'gemini') {
      if (onProgress) onProgress('drafting_stories');
      spec = await callGeminiApi(input, config.apiKey);
    } else {
      // Unknown provider fallback
      spec = generateMockSpec(input);
    }

    if (onProgress) {
      onProgress('evaluating_edge_cases');
      await delay(200);
      onProgress('finalizing');
    }

    return { spec, usedFallback: false };
  } catch (err: any) {
    console.warn('Live API request encountered an error, activating resilient fallback:', err);
    // Graceful FE-07 fallback
    if (onProgress) onProgress('finalizing');
    const fallbackSpec = generateMockSpec(input);
    return {
      spec: fallbackSpec,
      usedFallback: true,
      warningMessage: `Live AI generation failed (${err.message || 'Network error'}). Rendered high-fidelity fallback specification.`
    };
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
