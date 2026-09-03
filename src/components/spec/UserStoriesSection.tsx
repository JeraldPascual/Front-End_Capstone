import React from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import type { UserStory, StoryStatus } from '../../types/spec';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';

export interface UserStoriesSectionProps {
  stories: UserStory[];
  onToggleCriterion: (storyId: string, criterionId: string) => void;
  onUpdateStatus: (storyId: string, status: StoryStatus) => void;
}

export const UserStoriesSection: React.FC<UserStoriesSectionProps> = ({
  stories,
  onToggleCriterion,
  onUpdateStatus
}) => {
  const [collapsedStories, setCollapsedStories] = React.useState<Record<string, boolean>>({});

  const toggleCollapse = (id: string) => {
    setCollapsedStories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalCriteria = stories.reduce((acc, s) => acc + s.acceptanceCriteria.length, 0);
  const completedCriteria = stories.reduce(
    (acc, s) => acc + s.acceptanceCriteria.filter((c) => c.completed).length,
    0
  );
  const completionPercentage = totalCriteria === 0 ? 0 : Math.round((completedCriteria / totalCriteria) * 100);

  return (
    <Card
      title="User Stories & Acceptance Criteria"
      subtitle="Gherkin-style Given/When/Then scenarios. Check off criteria to update sprint readiness and status."
      headerAction={
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-300">
              {completedCriteria} / {totalCriteria} Criteria Done
            </span>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden mt-1 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
                role="progressbar"
                aria-valuenow={completionPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Acceptance criteria completion progress"
              />
            </div>
          </div>
          <span className="text-xs font-bold px-2 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
            {completionPercentage}%
          </span>
        </div>
      }
      className="mb-8"
      id="user-stories"
    >
      <div className="space-y-4">
        {stories.map((story) => {
          const isCollapsed = !!collapsedStories[story.id];
          const storyCompleted = story.acceptanceCriteria.every((c) => c.completed);

          return (
            <div
              key={story.id}
              className={`border rounded-xl transition-all ${
                storyCompleted
                  ? 'border-emerald-700/60 bg-emerald-950/20'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              {/* Story Header */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700">
                    {story.id}
                  </span>
                  <h3 className="text-base font-semibold text-slate-100">{story.title}</h3>
                  <Badge variant={story.priority}>{story.priority}</Badge>
                  <Badge variant={story.status}>{story.status.replace('_', ' ')}</Badge>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <label htmlFor={`status-select-${story.id}`} className="sr-only">
                    Change status for {story.id}
                  </label>
                  <select
                    id={`status-select-${story.id}`}
                    value={story.status}
                    onChange={(e) => onUpdateStatus(story.id, e.target.value as StoryStatus)}
                    className="text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 cursor-pointer"
                  >
                    <option value="planned">Planned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button
                    onClick={() => toggleCollapse(story.id)}
                    aria-expanded={!isCollapsed}
                    aria-controls={`story-body-${story.id}`}
                    aria-label={`${isCollapsed ? 'Expand' : 'Collapse'} ${story.id}`}
                    className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
                  >
                    {isCollapsed ? (
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <ChevronUp className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {/* Story Narrative & Criteria Body */}
              {!isCollapsed && (
                <div id={`story-body-${story.id}`} className="p-4 space-y-4">
                  {/* Persona Narrative */}
                  <div className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 space-y-1">
                    <p>
                      <strong className="text-indigo-400">As a</strong> {story.asA}
                    </p>
                    <p>
                      <strong className="text-indigo-400">I want</strong> {story.iWant}
                    </p>
                    <p>
                      <strong className="text-indigo-400">So that</strong> {story.soThat}
                    </p>
                  </div>

                  {/* Acceptance Criteria */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Gherkin Acceptance Criteria
                    </h4>
                    <div className="space-y-2">
                      {story.acceptanceCriteria.map((ac) => {
                        const inputId = `ac-${ac.id}`;
                        return (
                          <div
                            key={ac.id}
                            onClick={() => onToggleCriterion(story.id, ac.id)}
                            className={`flex items-start gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                              ac.completed
                                ? 'bg-emerald-950/30 border-emerald-600/40 text-slate-300'
                                : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              id={inputId}
                              checked={!!ac.completed}
                              onChange={() => {}} // handled by container onClick
                              className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4 shrink-0"
                              aria-labelledby={`ac-text-${ac.id}`}
                            />
                            <div id={`ac-text-${ac.id}`} className="space-y-0.5 flex-1">
                              <p className={ac.completed ? 'line-through text-slate-400' : ''}>
                                <strong className="text-emerald-400">Given</strong> {ac.given}
                              </p>
                              <p className={ac.completed ? 'line-through text-slate-400' : ''}>
                                <strong className="text-amber-400">When</strong> {ac.when}
                              </p>
                              <p className={ac.completed ? 'line-through text-slate-400' : ''}>
                                <strong className="text-sky-400">Then</strong> {ac.then}
                              </p>
                            </div>
                            {ac.completed && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
