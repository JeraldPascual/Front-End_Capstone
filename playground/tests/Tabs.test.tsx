import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ScratchTabs } from '../components/scratch/Tabs';
import type { TabItem } from '../components/scratch/Tabs';

const testTabs: TabItem[] = [
  { id: 'tab-a', label: 'Alpha', content: <p>Alpha content</p> },
  { id: 'tab-b', label: 'Beta', content: <p>Beta content</p> },
  { id: 'tab-c', label: 'Gamma', content: <p>Gamma content</p> },
  { id: 'tab-d', label: 'Disabled', content: <p>Disabled content</p>, disabled: true },
];

describe('ScratchTabs (W3C APG Tabs Pattern)', () => {
  it('renders tablist with correct roles', () => {
    render(<ScratchTabs tabs={testTabs} />);
    expect(screen.getByRole('tablist')).toBeTruthy();
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(4);
  });

  it('first tab is selected and its panel is visible by default', () => {
    render(<ScratchTabs tabs={testTabs} />);
    const firstTab = screen.getAllByRole('tab')[0];
    expect(firstTab.getAttribute('aria-selected')).toBe('true');
    expect(screen.getByText('Alpha content')).toBeTruthy();
  });

  it('uses roving tabindex: selected tab has tabIndex=0, others have -1', () => {
    render(<ScratchTabs tabs={testTabs} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0].getAttribute('tabindex')).toBe('0');
    expect(tabs[1].getAttribute('tabindex')).toBe('-1');
    expect(tabs[2].getAttribute('tabindex')).toBe('-1');
  });

  it('clicking a tab activates it and displays its panel', () => {
    render(<ScratchTabs tabs={testTabs} />);
    fireEvent.click(screen.getAllByRole('tab')[1]);
    expect(screen.getByText('Beta content')).toBeTruthy();
    expect(screen.getAllByRole('tab')[1].getAttribute('aria-selected')).toBe('true');
  });

  it('ArrowRight moves focus to next tab and activates it', () => {
    render(<ScratchTabs tabs={testTabs} />);
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(screen.getByText('Beta content')).toBeTruthy();
  });

  it('ArrowLeft from first tab wraps to last enabled tab', () => {
    render(<ScratchTabs tabs={testTabs} />);
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: 'ArrowLeft' });
    // Should wrap. Last is disabled so it goes to Gamma
    expect(screen.getByText('Gamma content')).toBeTruthy();
  });

  it('Home key moves focus to first tab', () => {
    render(<ScratchTabs tabs={testTabs} defaultTabId="tab-c" />);
    const tabs = screen.getAllByRole('tab');
    tabs[2].focus();
    fireEvent.keyDown(tabs[2], { key: 'Home' });
    expect(screen.getByText('Alpha content')).toBeTruthy();
  });

  it('End key moves focus to last enabled tab', () => {
    render(<ScratchTabs tabs={testTabs} />);
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: 'End' });
    expect(screen.getByText('Gamma content')).toBeTruthy();
  });

  it('tab panel has role="tabpanel" with aria-labelledby and tabIndex=0', () => {
    render(<ScratchTabs tabs={testTabs} />);
    const panel = screen.getByRole('tabpanel');
    expect(panel.getAttribute('aria-labelledby')).toBe('scratch-tab-tab-a');
    expect(panel.getAttribute('tabindex')).toBe('0');
  });

  it('aria-controls on tab matches panel id', () => {
    render(<ScratchTabs tabs={testTabs} />);
    const firstTab = screen.getAllByRole('tab')[0];
    const panel = screen.getByRole('tabpanel');
    expect(firstTab.getAttribute('aria-controls')).toBe(panel.getAttribute('id'));
  });

  it('calls onChange callback when tab is selected', () => {
    const onChange = vi.fn();
    render(<ScratchTabs tabs={testTabs} onChange={onChange} />);
    fireEvent.click(screen.getAllByRole('tab')[2]);
    expect(onChange).toHaveBeenCalledWith('tab-c');
  });
});
