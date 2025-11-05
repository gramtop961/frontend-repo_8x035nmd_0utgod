import React from 'react';
import { Play, XCircle } from 'lucide-react';

export default function DemoModeSwitch({ enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(!enabled)}
      className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm border transition-colors ${
        enabled
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
      }`}
      aria-pressed={enabled}
      aria-label="Toggle demo mode"
    >
      {enabled ? (
        <>
          <XCircle className="h-4 w-4" />
          Exit Demo
        </>
      ) : (
        <>
          <Play className="h-4 w-4" />
          Try Demo
        </>
      )}
    </button>
  );
}
