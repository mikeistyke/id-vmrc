import { summaryStats, trackStats, failuresNeedingFollowUp, learnerCompletion } from "../utils/stats.js";
import { LEARNERS, ROLE_META } from "../data/learners.js";

function StatCard({ label, value, sub, accent }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${accent} p-4`}>
      <div className="text-3xl font-bold text-slate-800">{value}</div>
      <div className="text-sm font-semibold text-slate-600 mt-0.5">{label}</div>
      {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
    </div>
  );
}

function TrackBar({ label, trackId, color }) {
  const { pct, passedCells, totalCells } = trackStats(trackId);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{passedCells}/{totalCells} module completions &mdash; <strong>{pct}%</strong></span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const stats    = summaryStats();
  const failures = failuresNeedingFollowUp();

  const topLearners = [...LEARNERS]
    .map(l => ({ learner: l, pct: learnerCompletion(l) }))
    .filter(x => x.pct > 0)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 5);

  return (
    <div className="space-y-6">

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Learners"       value={stats.total}      sub="All roles enrolled"           accent="border-navy" />
        <StatCard label="Avg Completion"       value={`${stats.avgPct}%`} sub="Across required modules"    accent="border-vmblue" />
        <StatCard label="Modules Passed"       value={stats.passed}     sub="Cumulative deliverables"      accent="border-vmgreen" />
        <StatCard label="Needs Follow-Up"      value={stats.failures}   sub="Failed — retry not scheduled" accent="border-red-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Track progress */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-base font-bold text-slate-700 mb-4">Track Completion (all eligible staff)</h2>
          <div className="space-y-4">
            <TrackBar label="Track W — Word"       trackId="W" color="bg-vmblue" />
            <TrackBar label="Track E — Excel"      trackId="E" color="bg-vmgreen" />
            <TrackBar label="Track P — PowerPoint" trackId="P" color="bg-vmorange" />
          </div>
          <p className="text-xs text-slate-400 mt-4">
            Counts every required module cell for all staff assigned to that track. Power User pilot completions included.
          </p>
        </div>

        {/* Completion by role */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-base font-bold text-slate-700 mb-4">Completion by Role</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b">
                <th className="pb-2">Role</th>
                <th className="pb-2 text-right">Learners</th>
                <th className="pb-2 text-right">Avg %</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ROLE_META).map(([role, meta]) => {
                const group = LEARNERS.filter(l => l.role === role);
                if (!group.length) return null;
                const avg = Math.round(group.reduce((s, l) => s + learnerCompletion(l), 0) / group.length);
                return (
                  <tr key={role} className="border-b border-slate-50">
                    <td className="py-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${meta.color}`}>{meta.label}</span>
                    </td>
                    <td className="py-2 text-right text-slate-600">{group.length}</td>
                    <td className="py-2 text-right">
                      <span className={`font-bold ${avg >= 75 ? "text-vmgreen" : avg >= 40 ? "text-vmblue" : "text-slate-400"}`}>
                        {avg}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Failures needing follow-up */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-base font-bold text-slate-700 mb-3">
            Needs Follow-Up
            {failures.length > 0 && (
              <span className="ml-2 bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">{failures.length}</span>
            )}
          </h2>
          {failures.length === 0 ? (
            <p className="text-sm text-slate-400">No outstanding failures. All retries cleared.</p>
          ) : (
            <ul className="space-y-2">
              {failures.map((f, i) => (
                <li key={i} className="flex items-center justify-between p-2 bg-red-50 rounded-lg border border-red-100">
                  <div>
                    <span className="font-medium text-slate-700 text-sm">{f.learner.name}</span>
                    <span className="text-xs text-slate-500 ml-2">{f.learner.dept}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-red-700">{f.module.id}: {f.module.title}</div>
                    <div className="text-xs text-slate-400">{f.attempts} attempt{f.attempts !== 1 ? "s" : ""} — retry needed</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Top performers */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-base font-bold text-slate-700 mb-3">Top Performers</h2>
          <ul className="space-y-2">
            {topLearners.map(({ learner, pct }) => {
              const meta = ROLE_META[learner.role];
              return (
                <li key={learner.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <span className="font-medium text-sm text-slate-700">{learner.name}</span>
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${meta.color}`}>{meta.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-vmgreen rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 text-right">{pct}%</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

      </div>

      {/* Context note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700">
        <strong>Snapshot:</strong> End of January 2026 &mdash; Month 2 of full rollout. Power User pilot (Sep&ndash;Oct 2025) fully certified.
        Clinical staff async-first to protect shift coverage. Robert Hawkins (W3 failure) scheduled for coached retry in February.
      </div>

    </div>
  );
}
