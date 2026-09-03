import { useState, useCallback } from 'react';
import type { FeatureSpec, GenerationStatus, ProviderConfig, SpecPromptInput, StoryStatus } from '../types/spec';
import { generateSpecification } from '../services/ai/aiService';
import { useLocalStorage } from './useLocalStorage';
import confetti from 'canvas-confetti';

export function useSpecGenerator() {
  const [currentSpec, setCurrentSpec] = useLocalStorage<FeatureSpec | null>('specforge_current_spec', null);
  const [specHistory, setSpecHistory] = useLocalStorage<FeatureSpec[]>('specforge_spec_history', []);
  const [providerConfig, setProviderConfig] = useLocalStorage<ProviderConfig>('specforge_provider_config', {
    provider: 'mock'
  });

  const [status, setStatus] = useState<GenerationStatus>({
    isLoading: false,
    stage: 'idle',
    error: null,
    usedFallback: false
  });

  const [notification, setNotification] = useState<{ message: string; type: 'info' | 'success' | 'warning' } | null>(null);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const generate = useCallback(async (input: SpecPromptInput) => {
    setStatus({
      isLoading: true,
      stage: 'analyzing',
      error: null,
      usedFallback: false
    });

    try {
      const result = await generateSpecification(input, providerConfig, (stage) => {
        setStatus((prev) => ({ ...prev, stage }));
      });

      setCurrentSpec(result.spec);
      setSpecHistory((prev) => [result.spec, ...prev.filter((s) => s.id !== result.spec.id).slice(0, 9)]);

      setStatus({
        isLoading: false,
        stage: 'idle',
        error: null,
        usedFallback: result.usedFallback
      });

      if (result.warningMessage) {
        setNotification({
          message: result.warningMessage,
          type: 'warning'
        });
      } else {
        setNotification({
          message: `Specification for "${result.spec.title}" generated successfully!`,
          type: 'success'
        });
      }

      // UX Delight: celebratory confetti on initial generation
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch {
        // Safe if in headless/testing environment
      }
    } catch (err: any) {
      setStatus({
        isLoading: false,
        stage: 'error',
        error: err.message || 'An unexpected error occurred.',
        usedFallback: false
      });
      setNotification({
        message: err.message || 'Failed to generate specification.',
        type: 'warning'
      });
    }
  }, [providerConfig, setCurrentSpec, setSpecHistory]);

  const toggleCriterion = useCallback((storyId: string, criterionId: string) => {
    setCurrentSpec((prev) => {
      if (!prev) return null;
      let allCompleted = false;

      const updatedStories = prev.userStories.map((story) => {
        if (story.id !== storyId) return story;
        const newCriteria = story.acceptanceCriteria.map((ac) => {
          if (ac.id !== criterionId) return ac;
          return { ...ac, completed: !ac.completed };
        });

        allCompleted = newCriteria.every((ac) => ac.completed);
        const newStatus: StoryStatus = allCompleted
          ? 'completed'
          : newCriteria.some((ac) => ac.completed)
          ? 'in_progress'
          : 'planned';

        return {
          ...story,
          acceptanceCriteria: newCriteria,
          status: newStatus
        };
      });

      if (allCompleted) {
        try {
          confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
        } catch {}
      }

      return {
        ...prev,
        userStories: updatedStories
      };
    });
  }, [setCurrentSpec]);

  const updateStoryStatus = useCallback((storyId: string, status: StoryStatus) => {
    setCurrentSpec((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        userStories: prev.userStories.map((story) =>
          story.id === storyId ? { ...story, status } : story
        )
      };
    });
  }, [setCurrentSpec]);

  const deleteSpecFromHistory = useCallback((specId: string) => {
    setSpecHistory((prev) => prev.filter((s) => s.id !== specId));
    setCurrentSpec((prev) => (prev?.id === specId ? null : prev));
  }, [setCurrentSpec, setSpecHistory]);

  const loadSpec = useCallback((spec: FeatureSpec) => {
    setCurrentSpec(spec);
    setNotification({
      message: `Loaded specification: ${spec.title}`,
      type: 'info'
    });
  }, [setCurrentSpec]);

  return {
    currentSpec,
    specHistory,
    providerConfig,
    setProviderConfig,
    status,
    notification,
    clearNotification,
    generate,
    toggleCriterion,
    updateStoryStatus,
    deleteSpecFromHistory,
    loadSpec,
    clearCurrentSpec: () => setCurrentSpec(null)
  };
}
