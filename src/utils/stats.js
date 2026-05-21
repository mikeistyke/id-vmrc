import { MODULES } from "../data/modules.js";
import { LEARNERS } from "../data/learners.js";
import { PROGRESS } from "../data/progress.js";

// Returns progress record for a given learner+module, or null if not started.
export function getProgress(learnerId, moduleId) {
  return PROGRESS.find(p => p.learnerId === learnerId && p.moduleId === moduleId) || null;
}

// Returns the effective status for a learner+module.
export function getStatus(learnerId, moduleId) {
  const rec = getProgress(learnerId, moduleId);
  return rec ? rec.status : "not_started";
}

// Returns the modules a given role is required to complete.
export function requiredModules(role) {
  return MODULES.filter(m => m.required.includes(role));
}

// Returns completion percentage for a learner across their required modules.
export function learnerCompletion(learner) {
  const req = requiredModules(learner.role);
  if (!req.length) return 0;
  const passed = req.filter(m => getStatus(learner.id, m.id) === "passed").length;
  return Math.round((passed / req.length) * 100);
}

// Returns track-level completion % across all learners who are required to take that track.
export function trackStats(trackId) {
  const trackMods = MODULES.filter(m => m.track === trackId);
  if (!trackMods.length) return { pct: 0, passedCells: 0, totalCells: 0 };
  let passedCells = 0, totalCells = 0;
  for (const learner of LEARNERS) {
    for (const mod of trackMods) {
      if (mod.required.includes(learner.role)) {
        totalCells++;
        if (getStatus(learner.id, mod.id) === "passed") passedCells++;
      }
    }
  }
  return { pct: totalCells ? Math.round((passedCells / totalCells) * 100) : 0, passedCells, totalCells };
}

// Returns learners who have failed at least one module and haven't yet passed it.
export function failuresNeedingFollowUp() {
  return PROGRESS
    .filter(p => p.status === "failed")
    .map(p => ({
      learner: LEARNERS.find(l => l.id === p.learnerId),
      module:  MODULES.find(m => m.id === p.moduleId),
      attempts: p.attempts,
    }))
    .filter(x => x.learner && x.module);
}

// Returns "Power User candidate" learners: non-PU learners with ≥75% completion and ≤1 failure.
export function puCandidates() {
  return LEARNERS
    .filter(l => l.role !== "PU")
    .map(l => {
      const req    = requiredModules(l.role);
      const passed = req.filter(m => getStatus(l.id, m.id) === "passed").length;
      const failed = req.filter(m => getStatus(l.id, m.id) === "failed").length;
      const retries = PROGRESS.filter(p => p.learnerId === l.id && p.attempts > 1).length;
      const pct    = req.length ? Math.round((passed / req.length) * 100) : 0;
      return { learner: l, pct, failed, retries, req: req.length };
    })
    .filter(x => x.pct >= 75 && x.failed === 0)
    .sort((a, b) => b.pct - a.pct);
}

// Summary stats for the dashboard header cards.
export function summaryStats() {
  const total    = LEARNERS.length;
  const avgPct   = Math.round(LEARNERS.reduce((s, l) => s + learnerCompletion(l), 0) / total);
  const passed   = PROGRESS.filter(p => p.status === "passed").length;
  const failures = failuresNeedingFollowUp().length;
  const pus      = LEARNERS.filter(l => l.role === "PU").length;
  const candidates = puCandidates().length;
  return { total, avgPct, passed, failures, pus, candidates };
}
