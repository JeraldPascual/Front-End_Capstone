import React, { useRef, useState, useEffect } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface ScratchTabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  ariaLabel?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export const ScratchTabs: React.FC<ScratchTabsProps> = ({
  tabs,
  defaultTabId,
  ariaLabel = 'Interactive Tabs',
  onChange,
  className = ''
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(() => {
    return defaultTabId || tabs[0]?.id || '';
  });

  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const activeIndex = tabs.findIndex((t) => t.id === activeTabId);

  const handleSelectTab = (tabId: string) => {
    setActiveTabId(tabId);
    onChange?.(tabId);
  };

  // Keyboard navigation per W3C APG Tabs Pattern
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const enabledTabs = tabs.filter((t) => !t.disabled);
    if (enabledTabs.length === 0) return;

    let targetTab: TabItem | undefined;

    switch (e.key) {
      case 'ArrowRight': {
        e.preventDefault();
        // Move to next tab or wrap to first
        let nextIndex = (currentIndex + 1) % tabs.length;
        while (tabs[nextIndex].disabled && nextIndex !== currentIndex) {
          nextIndex = (nextIndex + 1) % tabs.length;
        }
        targetTab = tabs[nextIndex];
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        // Move to prev tab or wrap to last
        let prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        while (tabs[prevIndex].disabled && prevIndex !== currentIndex) {
          prevIndex = (prevIndex - 1 + tabs.length) % tabs.length;
        }
        targetTab = tabs[prevIndex];
        break;
      }
      case 'Home': {
        e.preventDefault();
        targetTab = tabs.find((t) => !t.disabled);
        break;
      }
      case 'End': {
        e.preventDefault();
        targetTab = [...tabs].reverse().find((t) => !t.disabled);
        break;
      }
      default:
        return;
    }

    if (targetTab && !targetTab.disabled) {
      handleSelectTab(targetTab.id);
      const buttonEl = tabRefs.current.get(targetTab.id);
      buttonEl?.focus();
    }
  };

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Tab List */}
      <div
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        className="flex border-b border-slate-700 bg-slate-900/80 p-1 rounded-t-xl gap-1"
      >
        {tabs.map((tab, idx) => {
          const isSelected = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
                else tabRefs.current.delete(tab.id);
              }}
              role="tab"
              id={`scratch-tab-${tab.id}`}
              aria-controls={`scratch-tabpanel-${tab.id}`}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1} // Roving tabindex per APG
              disabled={tab.disabled}
              onClick={() => handleSelectTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panel */}
      {activeTab && (
        <div
          role="tabpanel"
          id={`scratch-tabpanel-${activeTab.id}`}
          aria-labelledby={`scratch-tab-${activeTab.id}`}
          tabIndex={0} // APG: tabpanel has tabIndex 0 to be reachable by keyboard
          className="p-6 bg-slate-900 border border-slate-800 rounded-b-xl text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
};