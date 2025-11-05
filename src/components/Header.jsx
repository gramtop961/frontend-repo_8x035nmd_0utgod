import React from 'react';
import { Rocket, HelpCircle } from 'lucide-react';

export default function Header({ onHelp, rightSlot }) {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 via-sky-500 to-teal-400 flex items-center justify-center text-white">
            <Rocket className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold text-slate-900 leading-tight">Concentrade</div>
            <div className="text-xs text-slate-500 -mt-0.5">Trading Journal</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {rightSlot}
          <button
            type="button"
            onClick={onHelp}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 active:bg-slate-100"
          >
            <HelpCircle className="h-4 w-4" />
            Help
          </button>
        </div>
      </div>
    </header>
  );
}
