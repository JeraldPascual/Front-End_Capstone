import React, { useState } from 'react';
import { Copy, Check, Download, Printer, Share2 } from 'lucide-react';
import type { FeatureSpec } from '../../types/spec';
import { specToMarkdown } from '../../services/export/markdownExport';
import { Button } from '../common/Button';

export interface ExportBarProps {
  spec: FeatureSpec;
  onNotification: (message: string, type: 'info' | 'success' | 'warning') => void;
}

export const ExportBar: React.FC<ExportBarProps> = ({ spec, onNotification }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = async () => {
    try {
      const md = specToMarkdown(spec);
      await navigator.clipboard.writeText(md);
      setCopied(true);
      onNotification('Markdown copied to clipboard! Ready to paste into GitHub/Linear.', 'success');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      onNotification('Failed to copy to clipboard automatically. Try selecting the text.', 'warning');
    }
  };

  const handleDownloadJson = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(spec, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `${spec.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-spec.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      onNotification('Downloaded JSON specification successfully.', 'success');
    } catch {
      onNotification('Failed to generate JSON file download.', 'warning');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md mb-8">
      <div className="flex items-center gap-2">
        <Share2 className="w-4 h-4 text-indigo-400" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          Export & Share PRD
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyMarkdown}
          leftIcon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          className="text-xs"
          aria-label="Copy specification as Markdown"
        >
          {copied ? 'Copied Markdown' : 'Copy as Markdown'}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadJson}
          leftIcon={<Download className="w-4 h-4" />}
          className="text-xs"
          aria-label="Download specification as JSON"
        >
          Download JSON
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          leftIcon={<Printer className="w-4 h-4" />}
          className="text-xs"
          aria-label="Print or save as PDF"
        >
          Print / PDF
        </Button>
      </div>
    </div>
  );
};
