import { useState } from "react";
import Dashboard      from "./components/Dashboard.jsx";
import LearnerGrid    from "./components/LearnerGrid.jsx";
import PowerUserPanel from "./components/PowerUserPanel.jsx";

const TABS = [
  { id: "dashboard",  label: "Dashboard" },
  { id: "matrix",     label: "Learner Matrix" },
  { id: "powerusers", label: "Power Users" },
];

export default function App() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-navy text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <div className="font-bold text-lg leading-tight">VMRC Training Tracker</div>
            <div className="text-xs text-blue-300">Microsoft Office Power User Program &mdash; January 2026</div>
          </div>
          <div className="text-xs text-blue-200 hidden sm:block text-right">
            Designed by Michael Cirigliano, CTT+ &mdash; Proof of Concept
          </div>
        </div>
        {/* Nav tabs */}
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                tab === t.id
                  ? "bg-slate-100 text-navy"
                  : "text-blue-200 hover:text-white hover:bg-white/10"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {tab === "dashboard"  && <Dashboard />}
        {tab === "matrix"     && <LearnerGrid />}
        {tab === "powerusers" && <PowerUserPanel />}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-6 border-t border-slate-200 mt-8">
        Ideation &amp; Design: Michael Cirigliano, CTT+ &nbsp;|&nbsp; MOUS Master &nbsp;|&nbsp;
        Portfolio Proof of Concept &nbsp;|&nbsp; VMRC IT Applications Administrator Candidate
      </footer>
    </div>
  );
}
