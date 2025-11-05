import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import DemoModeSwitch from './components/DemoModeSwitch.jsx';
import OnboardingProgress from './components/OnboardingProgress.jsx';
import DashboardNextSteps from './components/DashboardNextSteps.jsx';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}

export default function App() {
  const [demoMode, setDemoMode] = useLocalStorage('concentrade_demo', false);
  const [completedStepIds, setCompletedStepIds] = useLocalStorage('concentrade_steps', []);

  const steps = useMemo(
    () => [
      {
        id: 'import',
        kind: 'import',
        title: 'Import trades',
        description: 'Connect your broker or upload a CSV to populate your journal.',
        cta: 'Import',
      },
      {
        id: 'journal',
        kind: 'journal',
        title: 'Create your first journal entry',
        description: 'Capture emotions, setups, and screenshots for a recent trade.',
        cta: 'Add entry',
      },
      {
        id: 'risk',
        kind: 'risk',
        title: 'Set risk guardrails',
        description: 'Daily loss limit, max risk per trade, and alerts.',
        cta: 'Configure',
      },
      {
        id: 'review',
        kind: 'review',
        title: 'Run your first review',
        description: 'See win rate, expectancy, and tag breakdowns.',
        cta: 'Open review',
      },
    ],
    []
  );

  const enrichedSteps = steps.map((s) => ({ ...s, completed: completedStepIds.includes(s.id) }));

  const handleStepAction = (id) => {
    // Simulate completion for first-time tutorial purposes
    if (!completedStepIds.includes(id)) {
      const next = [...completedStepIds, id];
      setCompletedStepIds(next);
    }
  };

  const handleQuickAction = (kind) => {
    handleStepAction(kind);
    // If in demo, we can auto-complete import and review to showcase flow quickly
    if (demoMode && (kind === 'import' || kind === 'review')) {
      const bonus = ['import', 'review'];
      const merged = Array.from(new Set([...completedStepIds, kind, ...bonus]));
      setCompletedStepIds(merged);
    }
  };

  const allDone = enrichedSteps.every((s) => s.completed);

  useEffect(() => {
    // Automatically enable demo insights for brand-new users without any steps done
    if (completedStepIds.length === 0 && demoMode === false) {
      // keep off by default, but this is a good place for future logic
    }
  }, [completedStepIds.length, demoMode]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header
        rightSlot={<DemoModeSwitch enabled={demoMode} onToggle={setDemoMode} />}
        onHelp={() => alert('You\'re in the guided setup. Complete the steps to unlock the full dashboard. Use demo mode to explore without risk.')} 
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Welcome to Concentrade</h1>
          <p className="text-slate-600 mt-1">
            {allDone
              ? 'Nice! Your setup is complete. Keep journaling and reviewing to improve consistency.'
              : 'Follow the guided steps below. You can switch on demo mode anytime to explore with sample data.'}
          </p>
        </div>

        {!allDone && (
          <div className="mb-6">
            <OnboardingProgress steps={enrichedSteps} onAction={handleStepAction} />
          </div>
        )}

        <div className="mb-6">
          <DemoBanner enabled={demoMode} />
        </div>

        <DashboardNextSteps demoMode={demoMode} onQuickAction={handleQuickAction} />
      </main>
    </div>
  );
}

function DemoBanner({ enabled }) {
  if (!enabled) return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
      Want to explore without connecting anything? Toggle demo mode to preload sample trades.
    </div>
  );
  return (
    <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 flex items-start gap-3">
      <div className="h-8 w-8 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">D</div>
      <div>
        <div className="text-sm font-semibold text-emerald-800">Demo mode is ON</div>
        <p className="text-sm text-emerald-700/90 mt-0.5">Sample trades, tags, and metrics are loaded so you can see the full experience. You can turn this off anytime.</p>
      </div>
    </div>
  );
}
