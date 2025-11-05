import React from 'react';
import { CheckCircle2, Upload, Shield, BookOpen, BarChart2 } from 'lucide-react';

function ProgressBar({ percent }) {
  return (
    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-teal-400 transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

const iconMap = {
  import: Upload,
  risk: Shield,
  journal: BookOpen,
  review: BarChart2,
};

export default function OnboardingProgress({ steps, onAction }) {
  const completed = steps.filter((s) => s.completed).length;
  const percent = Math.round((completed / steps.length) * 100);

  return (
    <section className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Getting started</h3>
          <p className="text-xs text-slate-500">Complete these steps to personalize your journal.</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-xs font-medium">{completed} / {steps.length} done</span>
        </div>
      </div>

      <ProgressBar percent={percent} />

      <ul className="mt-4 space-y-2">
        {steps.map((step) => {
          const Icon = iconMap[step.kind] || CheckCircle2;
          return (
            <li
              key={step.id}
              className={`flex items-start justify-between gap-3 rounded-lg border p-3 sm:p-4 ${
                step.completed
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 h-8 w-8 rounded-md flex items-center justify-center border ${
                  step.completed
                    ? 'bg-emerald-100 border-emerald-200 text-emerald-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">{step.title}</div>
                  <div className="text-xs text-slate-500">{step.description}</div>
                </div>
              </div>
              <div>
                {step.completed ? (
                  <span className="inline-flex items-center text-xs font-medium text-emerald-700 gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Done
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onAction(step.id)}
                    className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm bg-slate-900 text-white hover:bg-slate-800"
                  >
                    {step.cta}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
