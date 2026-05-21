import { useState } from "react";
import { LEARNERS, ROLE_META } from "../data/learners.js";
import { MODULES, TRACKS } from "../data/modules.js";
import { getStatus, getProgress, learnerCompletion, requiredModules } from "../utils/stats.js";

const STATUS_STYLE = {
  passed:      "bg-green-500 text-white",
  failed:      "bg-red-500 text-white",
  in_progress: "bg-amber-400 text-white",
  not_started: "bg-slate-100 text-slate-300",
  n_a:         "bg-white text-slate-200",
};

const STATUS_LABEL = {
  passed:      "Passed",
  failed:      "Failed",
  in_progress: "In Progress",
  not_started: "Not Started",
  n_a:         "N/A",
};

function StatusCell({ learnerId, module, role }) {
  const required = module.required.includes(role);
  if (!required) return <td className="px-1 py-1 text-center"><span className="block w-7 h-7 rounded" title="Not required" /></td>;
  const status = getStatus(learnerId, module.id);
  const rec    = getProgress(learnerId, module.id);
  const tip = `${module.id}: ${module.title}\nStatus: ${STATUS_LABEL[status]}${rec?.attempts > 1 ? `\nAttempts: ${rec.attempts}` : ""}`;
  return (
    <td className="px-1 py-1 text-center">
      <span
        title={tip}
        className={`block w-7 h-7 rounded text-xs font-bold leading-7 cursor-default ${STATUS_STYLE[status]}`}
      >
        {status === "passed"      ? "✓" :
         status === "failed"      ? "✗" :
         status === "in_progress" ? "…" : ""}
      </span>
    </td>
  );
}

function LearnerRow({ learner, onSelect, selected }) {
  const pct  = learnerCompletion(learner);
  const meta = ROLE_META[learner.role];
  return (
    <tr
      onClick={() => onSelect(learner)}
      className={`cursor-pointer hover:bg-blue-50 border-b border-slate-100 transition-colors ${selected ? "bg-blue-50 ring-1 ring-inset ring-vmblue" : ""}`}
    >
      <td className="px-3 py-2 min-w-[160px]">
        <div className="font-medium text-sm text-slate-800">{learner.name}</div>
        <div className="text-xs text-slate-400">{learner.dept}</div>
      </td>
      <td className="px-2 py-2 text-center">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${meta.color}`}>{meta.label}</span>
      </td>
      <td className="px-2 py-2 text-center">
        {learner.priorTraining
          ? <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">Yes</span>
          : <span className="text-xs text-slate-300">—</span>}
      </td>
      <td className="px-2 py-2 text-center w-16">
        <span className={`text-sm font-bold ${pct >= 80 ? "text-vmgreen" : pct >= 40 ? "text-vmblue" : "text-slate-400"}`}>{pct}%</span>
      </td>
      {MODULES.map(mod => (
        <StatusCell key={mod.id} learnerId={learner.id} module={mod} role={learner.role} />
      ))}
    </tr>
  );
}

function LearnerDetail({ learner, onClose }) {
  if (!learner) return null;
  const meta = ROLE_META[learner.role];
  const req  = requiredModules(learner.role);
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-5 sticky top-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-slate-800">{learner.name}</h3>
          <div className="text-xs text-slate-500 mt-0.5">{learner.dept}</div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg leading-none">&times;</button>
      </div>
      <div className="flex gap-2 mb-4 flex-wrap">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${meta.color}`}>{meta.label}</span>
        {learner.priorTraining && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Prior Training</span>}
      </div>
      <div className="space-y-2">
        {req.map(mod => {
          const status = getStatus(learner.id, mod.id);
          const rec    = getProgress(learner.id, mod.id);
          const track  = TRACKS[mod.track];
          return (
            <div key={mod.id} className={`flex items-center justify-between p-2 rounded-lg border ${
              status === "passed"      ? "bg-green-50  border-green-200" :
              status === "failed"      ? "bg-red-50    border-red-200"   :
              status === "in_progress" ? "bg-amber-50  border-amber-200" :
                                         "bg-slate-50  border-slate-200"
            }`}>
              <div>
                <span className={`text-xs font-semibold px-1.5 py-0.5 rounded mr-2 ${track.color} ${track.text}`}>{mod.id}</span>
                <span className="text-xs text-slate-700">{mod.title}</span>
              </div>
              <div className="text-right shrink-0 ml-2">
                <div className={`text-xs font-bold ${
                  status === "passed" ? "text-vmgreen" :
                  status === "failed" ? "text-red-600" :
                  status === "in_progress" ? "text-amber-600" : "text-slate-400"
                }`}>{STATUS_LABEL[status]}</div>
                {rec?.attempts > 0 && <div className="text-xs text-slate-400">{rec.attempts} attempt{rec.attempts !== 1 ? "s" : ""}</div>}
                {rec?.completedAt && <div className="text-xs text-slate-400">{rec.completedAt}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function LearnerGrid() {
  const [roleFilter, setRoleFilter]   = useState("All");
  const [priorFilter, setPriorFilter] = useState("All");
  const [selected, setSelected]       = useState(null);

  const roles = ["All", "CNA", "RN", "Admin", "DON", "PU"];

  const filtered = LEARNERS.filter(l => {
    if (roleFilter  !== "All" && l.role !== roleFilter)       return false;
    if (priorFilter === "Yes" && !l.priorTraining)             return false;
    if (priorFilter === "No"  &&  l.priorTraining)             return false;
    return true;
  });

  // Group module headers by track
  const trackGroups = ["F","W","E","P","CAP"].map(t => ({
    track: t,
    mods:  MODULES.filter(m => m.track === t),
    meta:  TRACKS[t],
  }));

  return (
    <div className="flex gap-4 items-start">
      <div className="flex-1 min-w-0">

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-3 mb-4 flex flex-wrap gap-3 items-center">
          <div className="flex gap-1 flex-wrap">
            <span className="text-xs text-slate-500 self-center mr-1">Role:</span>
            {roles.map(r => (
              <button key={r} onClick={() => setRoleFilter(r)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${roleFilter === r ? "bg-navy text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {r === "All" ? "All Roles" : ROLE_META[r]?.label || r}
              </button>
            ))}
          </div>
          <div className="flex gap-1 flex-wrap ml-auto">
            <span className="text-xs text-slate-500 self-center mr-1">Prior Training:</span>
            {["All","Yes","No"].map(v => (
              <button key={v} onClick={() => setPriorFilter(v)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${priorFilter === v ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-3 flex-wrap">
          {[["bg-green-500","Passed"],["bg-amber-400","In Progress"],["bg-red-500","Failed"],["bg-slate-100 border border-slate-200","Not Started"]].map(([cls, lbl]) => (
            <div key={lbl} className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className={`w-4 h-4 rounded ${cls} inline-block`} />
              {lbl}
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-4 h-4 rounded bg-white border border-dashed border-slate-200 inline-block" />
            Not Required
          </div>
        </div>

        {/* Matrix table */}
        <div className="bg-white rounded-xl shadow-sm overflow-auto">
          <table className="text-xs border-collapse w-full">
            <thead>
              {/* Track header row */}
              <tr>
                <th colSpan={4} className="bg-navy text-white text-left px-3 py-2 text-xs font-semibold sticky left-0">Learner</th>
                {trackGroups.map(({ track, mods, meta }) => (
                  <th key={track} colSpan={mods.length} className={`${meta.color} ${meta.text} text-center py-1.5 text-xs font-semibold whitespace-nowrap px-1`}>
                    {meta.label}
                  </th>
                ))}
              </tr>
              {/* Module ID row */}
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-1.5 text-left text-slate-600 sticky left-0 bg-slate-50">Name</th>
                <th className="px-2 py-1.5 text-slate-600">Role</th>
                <th className="px-2 py-1.5 text-slate-600">Prior</th>
                <th className="px-2 py-1.5 text-slate-600">Done</th>
                {MODULES.map(mod => (
                  <th key={mod.id} className="px-1 py-1.5 text-center text-slate-500 font-mono font-medium" title={mod.title}>
                    {mod.id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(learner => (
                <LearnerRow key={learner.id} learner={learner} onSelect={setSelected}
                  selected={selected?.id === learner.id} />
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-8">No learners match the current filters.</p>
          )}
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="w-72 shrink-0">
          <LearnerDetail learner={selected} onClose={() => setSelected(null)} />
        </div>
      )}
    </div>
  );
}
