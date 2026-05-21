import { LEARNERS, ROLE_META } from "../data/learners.js";
import { puCandidates, learnerCompletion, requiredModules, getStatus } from "../utils/stats.js";
import { MODULES, TRACKS } from "../data/modules.js";

function PUCard({ learner }) {
  const req    = requiredModules(learner.role);
  const passed = req.filter(m => getStatus(learner.id, m.id) === "passed").length;
  const meta   = ROLE_META[learner.role];
  return (
    <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-slate-800">{learner.name}</h3>
          <div className="text-xs text-slate-500 mt-0.5">{learner.dept}</div>
        </div>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">Power User</span>
      </div>
      <div className="flex gap-2 mb-4 flex-wrap">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${meta.color}`}>{meta.label}</span>
        {learner.priorTraining && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Prior Training</span>}
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Pilot Cohort — Sep 2025</span>
      </div>
      {/* Module completion strip */}
      <div className="flex flex-wrap gap-1 mb-3">
        {MODULES.map(mod => {
          const status = getStatus(learner.id, mod.id);
          const track  = TRACKS[mod.track];
          return (
            <span key={mod.id} title={`${mod.id}: ${mod.title}`}
              className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                status === "passed" ? `${track.color} ${track.text}` : "bg-slate-100 text-slate-400"
              }`}>
              {mod.id}
            </span>
          );
        })}
      </div>
      <div className="text-xs text-slate-500">
        {passed}/{req.length} modules passed &mdash; Certified Train-the-Trainer
      </div>
    </div>
  );
}

function CandidateCard({ learner, pct, retries }) {
  const meta = ROLE_META[learner.role];
  const req  = requiredModules(learner.role);
  const remaining = req.filter(m => getStatus(learner.id, m.id) !== "passed").length;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="font-semibold text-sm text-slate-800">{learner.name}</div>
          <div className="text-xs text-slate-400">{learner.dept}</div>
        </div>
        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">Candidate</span>
      </div>
      <div className="flex gap-2 mb-3 flex-wrap">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${meta.color}`}>{meta.label}</span>
        {learner.priorTraining && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Prior Training</span>}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-vmgreen rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-xs text-slate-500 mt-1">{pct}% of required modules passed</div>
        </div>
        <div className="text-right text-xs text-slate-400">
          <div>{remaining} mod{remaining !== 1 ? "s" : ""} left</div>
          {retries > 0 && <div className="text-amber-600">{retries} retr{retries !== 1 ? "ies" : "y"}</div>}
        </div>
      </div>
      <div className="mt-2 text-xs text-slate-400">
        Eligible for Power User cohort after completing remaining modules with no failures.
      </div>
    </div>
  );
}

export default function PowerUserPanel() {
  const certified  = LEARNERS.filter(l => l.role === "PU");
  const candidates = puCandidates();

  return (
    <div className="space-y-6">

      {/* What is a Power User? */}
      <div className="bg-navy text-white rounded-xl p-5">
        <h2 className="font-bold text-lg mb-1">The Power User Cohort</h2>
        <p className="text-sm text-blue-200 max-w-2xl">
          Power Users are cross-role staff who complete all three tracks plus the capstone and become
          internal technology champions. They reduce helpdesk dependency by providing peer support on each
          shift. Eligibility criteria: zero module failures, &ge;75% required modules passed, self-nomination.
        </p>
      </div>

      {/* Certified Power Users */}
      <div>
        <h2 className="text-base font-bold text-slate-700 mb-3">
          Certified Power Users
          <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">{certified.length}</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {certified.map(l => <PUCard key={l.id} learner={l} />)}
        </div>
      </div>

      {/* Candidates */}
      <div>
        <h2 className="text-base font-bold text-slate-700 mb-1">
          Emerging Candidates
          <span className="ml-2 bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full">{candidates.length}</span>
        </h2>
        <p className="text-xs text-slate-400 mb-3">Staff with &ge;75% completion, zero current failures. Ranked by completion %.</p>
        {candidates.length === 0 ? (
          <p className="text-sm text-slate-400 bg-white rounded-xl p-6 text-center">No candidates yet meet the threshold. Check back after Month 3.</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {candidates.map(c => <CandidateCard key={c.learner.id} learner={c.learner} pct={c.pct} retries={c.retries} />)}
          </div>
        )}
      </div>

      {/* What candidates need */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700">
        <strong>Next step for candidates:</strong> Complete remaining required modules with no failures, then self-nominate
        for the Power User cohort via HR. Capstone is scheduled as a 4-hour live session (March 2026).
      </div>
    </div>
  );
}
