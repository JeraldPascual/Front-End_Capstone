import React, { useState, useEffect } from 'react';
import { Key, Shield, Sparkles } from 'lucide-react';
import type { LLMProvider, ProviderConfig } from '../../types/spec';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ProviderConfig;
  onSave: (config: ProviderConfig) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, config, onSave }) => {
  const [provider, setProvider] = useState<LLMProvider>(config.provider);
  const [apiKey, setApiKey] = useState(config.apiKey || '');

  useEffect(() => {
    setProvider(config.provider);
    setApiKey(config.apiKey || '');
  }, [config, isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      provider,
      apiKey: apiKey.trim()
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Engine Configuration"
      footer={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            Save Configuration
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSave} className="space-y-5">
        <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 flex items-start gap-2.5">
          <Shield className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" aria-hidden="true" />
          <span>
            API keys are saved locally in your browser's <code className="bg-indigo-950 px-1 py-0.5 rounded">localStorage</code> and never transmitted to our servers.
          </span>
        </div>

        <div>
          <label htmlFor="provider-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Select AI Provider
          </label>
          <select
            id="provider-select"
            value={provider}
            onChange={(e) => setProvider(e.target.value as LLMProvider)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus-visible:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30 cursor-pointer"
          >
            <option value="mock">Deterministic Demo Engine (Recommended - Zero API Key / Offline)</option>
            <option value="claude">Anthropic Claude (Claude 3.5 Sonnet)</option>
            <option value="gemini">Google Gemini (Gemini 2.0 Flash)</option>
          </select>
        </div>

        {provider !== 'mock' ? (
          <div>
            <label htmlFor="api-key-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              {provider === 'claude' ? 'Anthropic API Key' : 'Gemini API Key'}
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
              <input
                id="api-key-input"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={provider === 'claude' ? 'sk-ant-api03-...' : 'AIzaSy...'}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus-visible:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Don't have an API key? Switch to <strong>Deterministic Demo Engine</strong> above to test all features with zero friction.
            </p>
          </div>
        ) : (
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
              <span>Zero-Config Demonstration Mode</span>
            </div>
            <p className="text-slate-400">
              Generates production-grade, highly structured PRDs with Gherkin acceptance criteria instantly without consuming external API tokens. Perfect for grading and portfolio review.
            </p>
          </div>
        )}
      </form>
    </Modal>
  );
};
