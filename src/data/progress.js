// Scenario: end of January 2026 (Month 2 of full rollout after Sep 2025 pilot).
// Status values: "passed" | "failed" | "in_progress" | "not_started"
// attempts: total tries. completedAt: ISO date string or null.

function p(learnerId, moduleId, status, attempts, completedAt = null) {
  return { learnerId, moduleId, status, attempts, completedAt };
}

export const PROGRESS = [
  // ── Power Users (Sep–Oct 2025 pilot — all complete) ─────────────────────────
  p("L17","F0","passed",1,"2025-09-08"), p("L17","W1","passed",1,"2025-09-10"),
  p("L17","W2","passed",1,"2025-09-15"), p("L17","W3","passed",1,"2025-09-17"),
  p("L17","W4","passed",1,"2025-09-22"), p("L17","E1","passed",1,"2025-09-24"),
  p("L17","E2","passed",1,"2025-09-29"), p("L17","E3","passed",1,"2025-10-06"),
  p("L17","E4","passed",1,"2025-10-13"), p("L17","P1","passed",1,"2025-10-15"),
  p("L17","P2","passed",1,"2025-10-17"), p("L17","P3","passed",1,"2025-10-20"),
  p("L17","P4","passed",1,"2025-10-22"), p("L17","CAP","passed",1,"2025-10-29"),

  p("L18","F0","passed",1,"2025-09-08"), p("L18","W1","passed",1,"2025-09-10"),
  p("L18","W2","passed",1,"2025-09-15"), p("L18","W3","passed",1,"2025-09-17"),
  p("L18","W4","passed",1,"2025-09-22"), p("L18","E1","passed",1,"2025-09-24"),
  p("L18","E2","passed",2,"2025-09-30"), // needed a retry on E2
  p("L18","E3","passed",1,"2025-10-06"), p("L18","E4","passed",1,"2025-10-13"),
  p("L18","P1","passed",1,"2025-10-15"), p("L18","P2","passed",1,"2025-10-17"),
  p("L18","P3","passed",1,"2025-10-20"), p("L18","P4","passed",1,"2025-10-22"),
  p("L18","CAP","passed",1,"2025-10-29"),

  // ── CNAs ────────────────────────────────────────────────────────────────────
  // L01 Maria Gonzalez — completed both required modules (W1 took 2 tries)
  p("L01","F0","passed",1,"2026-01-08"),
  p("L01","W1","passed",2,"2026-01-16"), // failed first attempt Jan 12

  // L02 Deja Williams — Foundation done, W1 in progress
  p("L02","F0","passed",1,"2026-01-08"),
  p("L02","W1","in_progress",0,null),

  // L03 Patricia Huff — prior training, sailed through both quickly
  p("L03","F0","passed",1,"2026-01-07"),
  p("L03","W1","passed",1,"2026-01-09"),

  // L04 Tamika Johnson — completed both
  p("L04","F0","passed",1,"2026-01-10"),
  p("L04","W1","passed",1,"2026-01-14"),

  // L05 Rosa Menendez — hasn't started (shift conflicts, scheduled for Feb)
  // no entries → not_started

  // ── RNs ─────────────────────────────────────────────────────────────────────
  // L06 James Whitfield — prior training, ahead of peers
  p("L06","F0","passed",1,"2026-01-06"),
  p("L06","W1","passed",1,"2026-01-08"),
  p("L06","W2","passed",1,"2026-01-13"),
  p("L06","E1","passed",1,"2026-01-15"),
  p("L06","E2","in_progress",0,null),

  // L07 Sandra Patel — W1 failed first attempt, now on track
  p("L07","F0","passed",1,"2026-01-07"),
  p("L07","W1","passed",2,"2026-01-17"), // failed Jan 10, passed retry Jan 17
  p("L07","W2","passed",1,"2026-01-21"),
  p("L07","E1","in_progress",0,null),

  // L08 Kevin O'Brien — prior training, furthest along of the RNs
  p("L08","F0","passed",1,"2026-01-06"),
  p("L08","W1","passed",1,"2026-01-08"),
  p("L08","W2","passed",1,"2026-01-10"),
  p("L08","E1","passed",1,"2026-01-14"),
  p("L08","E2","passed",1,"2026-01-20"),

  // L09 Latoya Simmons — just getting started
  p("L09","F0","passed",1,"2026-01-13"),
  p("L09","W1","in_progress",0,null),

  // ── Admin Staff ─────────────────────────────────────────────────────────────
  // L10 Carol Erickson — prior training, furthest ahead of admin group
  p("L10","F0","passed",1,"2026-01-05"),
  p("L10","W1","passed",1,"2026-01-07"),
  p("L10","W2","passed",1,"2026-01-09"),
  p("L10","W3","passed",1,"2026-01-12"),
  p("L10","W4","passed",1,"2026-01-14"),
  p("L10","E1","passed",1,"2026-01-16"),
  p("L10","E2","passed",1,"2026-01-19"),
  p("L10","E3","passed",1,"2026-01-22"),
  p("L10","E4","in_progress",0,null),
  p("L10","P1","passed",1,"2026-01-24"),

  // L11 Brian Kessler — no prior training, steady pace
  p("L11","F0","passed",1,"2026-01-06"),
  p("L11","W1","passed",1,"2026-01-09"),
  p("L11","W2","passed",1,"2026-01-13"),
  p("L11","W3","passed",1,"2026-01-16"),
  p("L11","W4","in_progress",0,null),
  p("L11","E1","passed",1,"2026-01-20"),

  // L12 Angela Torres — W2 failed once, now back on track
  p("L12","F0","passed",1,"2026-01-07"),
  p("L12","W1","passed",1,"2026-01-10"),
  p("L12","W2","passed",2,"2026-01-20"), // failed Jan 14, passed retry Jan 20
  p("L12","W3","in_progress",0,null),
  p("L12","E1","passed",1,"2026-01-23"),

  // L13 Michelle Ford — prior training, star performer
  p("L13","F0","passed",1,"2026-01-05"),
  p("L13","W1","passed",1,"2026-01-07"),
  p("L13","W2","passed",1,"2026-01-09"),
  p("L13","W3","passed",1,"2026-01-12"),
  p("L13","W4","passed",2,"2026-01-18"), // failed Jan 14, passed Jan 18
  p("L13","E1","passed",1,"2026-01-20"),
  p("L13","E2","passed",1,"2026-01-22"),
  p("L13","E3","passed",1,"2026-01-24"),
  p("L13","E4","passed",1,"2026-01-27"),
  p("L13","P1","passed",1,"2026-01-29"),
  p("L13","P2","passed",1,"2026-01-31"),
  p("L13","P3","in_progress",0,null),

  // ── DON / Dept Heads ────────────────────────────────────────────────────────
  // L14 Dr. Paula Nkosi — prior training, moving fast
  p("L14","F0","passed",1,"2026-01-05"),
  p("L14","W1","passed",1,"2026-01-07"),
  p("L14","W2","passed",1,"2026-01-09"),
  p("L14","W3","passed",1,"2026-01-12"),
  p("L14","E1","passed",1,"2026-01-14"),
  p("L14","E2","passed",1,"2026-01-16"),
  p("L14","E3","in_progress",0,null),
  p("L14","P1","passed",1,"2026-01-20"),
  p("L14","P2","passed",1,"2026-01-22"),

  // L15 Robert Hawkins — W3 failed, needs retry (flagged for follow-up)
  p("L15","F0","passed",1,"2026-01-08"),
  p("L15","W1","passed",1,"2026-01-12"),
  p("L15","W2","passed",1,"2026-01-16"),
  p("L15","W3","failed",1,null),         // ← failed, retry not yet scheduled
  p("L15","E1","passed",1,"2026-01-21"),

  // L16 Deborah Quinn — prior training, strong progress
  p("L16","F0","passed",1,"2026-01-06"),
  p("L16","W1","passed",1,"2026-01-08"),
  p("L16","W2","passed",1,"2026-01-10"),
  p("L16","W3","passed",1,"2026-01-13"),
  p("L16","E1","passed",1,"2026-01-15"),
  p("L16","E2","passed",1,"2026-01-17"),
  p("L16","E3","passed",1,"2026-01-21"),
  p("L16","P1","passed",1,"2026-01-23"),
  p("L16","P2","passed",1,"2026-01-25"),
  p("L16","P3","in_progress",0,null),
];
