import React from 'react';
import { BarChart2, BookOpen, Upload, Shield } from 'lucide-react';

export default function DashboardNextSteps({ demoMode, onQuickAction }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card
        title={demoMode ? 'Explore sample trades' : 'Import your trades'}
        description={
          demoMode
            ? 'Browse preloaded sample data to see metrics, tags, and journals in action.'
            : 'Bring in trades from your broker or CSV to unlock insights.'
        }
        icon={Upload}
        actionLabel={demoMode ? 'Open sample trades' : 'Import now'}
        onAction={() => onQuickAction('import')}
      />
      <Card
        title="Write your first journal entry"
        description="Add context: emotions, setups, screenshots — turn trades into lessons."
        icon={BookOpen}
        actionLabel="Add journal"
        onAction={() => onQuickAction('journal')}
      />
      <Card
        title="Set risk guardrails"
        description="Daily loss limit, max position size, and alerts keep you consistent."
        icon={Shield}
        actionLabel="Configure risk"
        onAction={() => onQuickAction('risk')}
      />
      <Card
        title="Review your performance"
        description="See win rate, expectancy, and tag breakdowns. Focus on what works."
        icon={BarChart2}
        actionLabel="Open review"
        onAction={() => onQuickAction('review')}
      />
    </section>
  );
}

function Card({ title, description, icon: Icon, actionLabel, onAction }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
