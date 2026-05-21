"use strict";
const pptxgen = require("pptxgenjs");

// ── Colors (no # prefix) ──────────────────────────────────────
const NAVY   = "1F4E79";
const BLUE   = "2E75B6";
const GREEN  = "37864B";
const ORANGE = "C55A11";
const GOLD   = "7F6000";
const WHITE  = "FFFFFF";
const LT_BLU = "D6E4F0";
const LT_GRN = "E2EFDA";
const LT_ORG = "FCE4D6";
const LT_GLD = "FFF2CC";
const LT_GRY = "F5F5F5";
const MED_GRY= "808080";
const DK_GRY = "404040";
const RED    = "C00000";
const AMBER  = "ED7D31";
const LT_RED = "FEE8E8";
const LT_AMB = "FFF3E0";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" × 5.625"
pres.author  = "Michael Cirigliano";
pres.title   = "VMRC Microsoft Office Power User Training — ID Curriculum Map";

const FOOTER_TEXT =
  "Ideation & Design: Michael Cirigliano, CTT+  |  Proof of Concept — Portfolio Credential Demonstration";

// ── Helpers ───────────────────────────────────────────────────
const makeShadow = () => ({
  type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.12
});

function addMaster(slide) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.5,
    fill: { color: NAVY }, line: { color: NAVY, width: 0 }
  });
  slide.addText("VMRC", {
    x: 0.18, y: 0.02, w: 1.2, h: 0.46,
    fontSize: 15, bold: true, color: WHITE,
    fontFace: "Calibri", valign: "middle", margin: 0
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.26, w: 10, h: 0.365,
    fill: { color: "EBEBEB" }, line: { color: "EBEBEB", width: 0 }
  });
  slide.addText(FOOTER_TEXT, {
    x: 0.2, y: 5.28, w: 9.2, h: 0.32,
    fontSize: 7.5, color: MED_GRY, fontFace: "Calibri", valign: "middle"
  });
}

function addTitle(slide, text, color = NAVY, fs = 26) {
  slide.addText(text, {
    x: 0.4, y: 0.52, w: 9.2, h: 0.52,
    fontSize: fs, bold: true, color,
    fontFace: "Calibri", valign: "middle"
  });
}

function rect(slide, x, y, w, h, fill, lineColor, lineW = 0) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: fill },
    line: { color: lineColor || fill, width: lineW }
  });
}

function oval(slide, x, y, w, h, fill) {
  slide.addShape(pres.shapes.OVAL, {
    x, y, w, h, fill: { color: fill }, line: { color: fill, width: 0 }
  });
}

function txt(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h, fontFace: "Calibri",
    valign: opts.valign || "middle",
    align:  opts.align  || "left",
    fontSize: opts.fs   || 11,
    color:    opts.color || DK_GRY,
    bold:     opts.bold  || false,
    italic:   opts.italic || false,
    margin:   opts.margin !== undefined ? opts.margin : 2,
    charSpacing: opts.spacing || 0,
    ...opts.extra
  });
}

// Track deep-dive cards (slides 7-9)
function addTrackSlide(slideNum, trackLabel, trackColor, trackLight, modules, bottomNote, notes) {
  const slide = pres.addSlide();
  addMaster(slide);
  addTitle(slide, `Track ${trackLabel.split(":")[0]}: ${trackLabel.split(":")[1]}`, trackColor);

  // Color accent bar under title
  rect(slide, 0.4, 1.04, 9.2, 0.04, trackColor);

  const cardW = 2.2, cardH = 3.45;
  const gap   = 0.13;
  const startX = 0.35;
  const startY = 1.15;

  modules.forEach(([id, title, dur, quote], i) => {
    const x = startX + i * (cardW + gap);
    // Card body
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cardW, h: cardH,
      fill: { color: WHITE }, line: { color: "DDDDDD", width: 0.75 },
      shadow: makeShadow()
    });
    // Colored top strip
    rect(slide, x, startY, cardW, 0.65, trackColor);
    // Module ID
    txt(slide, id, x + 0.1, startY + 0.08, 0.55, 0.3,
        { fs: 14, bold: true, color: WHITE, margin: 0 });
    // Duration badge
    rect(slide, x + cardW - 0.82, startY + 0.1, 0.72, 0.26, WHITE);
    txt(slide, dur, x + cardW - 0.82, startY + 0.1, 0.72, 0.26,
        { fs: 8.5, bold: true, color: trackColor, align: "center", margin: 0 });
    // Module title
    txt(slide, title, x + 0.1, startY + 0.68, cardW - 0.2, 0.5,
        { fs: 10, bold: true, color: trackColor, valign: "top" });
    // Quote accent bar
    rect(slide, x + 0.1, startY + 1.22, 0.04, 1.35, trackColor);
    // Quote text
    slide.addText(`"${quote}"`, {
      x: x + 0.22, y: startY + 1.2, w: cardW - 0.35, h: 1.4,
      fontSize: 9, italic: true, color: DK_GRY, fontFace: "Calibri", valign: "top"
    });
    // Bottom rule — solid track color for readability
    rect(slide, x, startY + cardH - 0.32, cardW, 0.32, trackColor);
    txt(slide, "Hands-on deliverable required", x + 0.08, startY + cardH - 0.3,
        cardW - 0.16, 0.28, { fs: 7.5, color: WHITE, italic: true, margin: 0 });
  });

  // Bottom note
  rect(slide, 0.35, 4.73, 9.3, 0.3, LT_GLD, GOLD, 0.5);
  txt(slide, bottomNote, 0.5, 4.74, 9.1, 0.28,
      { fs: 9, bold: true, italic: true, color: GOLD, margin: 0 });

  slide.addNotes(notes);
  return slide;
}

// ============================================================
// SLIDE 1 — COVER
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  rect(s, 0, 0, 0.08, 5.625, BLUE);
  rect(s, 0, 0, 10, 0.07, BLUE);

  txt(s, "Microsoft Office Power User\nTraining Program",
      0.6, 0.75, 8.8, 1.65,
      { fs: 40, bold: true, color: WHITE, valign: "middle",
        extra: { align: "left", lineSpacingMultiple: 1.1 } });

  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 2.55, w: 8.8, h: 0,
    line: { color: BLUE, width: 2 }
  });

  txt(s, "Instructional Design Curriculum Map & Deployment Strategy",
      0.6, 2.65, 8.8, 0.55,
      { fs: 18, italic: true, color: LT_BLU, valign: "middle" });

  txt(s, "Virginia Mennonite Retirement Community  |  Harrisonburg, VA",
      0.6, 3.28, 8.8, 0.42,
      { fs: 14, color: "AACCE0", valign: "middle" });

  rect(s, 0, 4.68, 10, 0.945, "162F4B");
  s.addText([
    { text: "Designed by:  ", options: { color: "AACCE0", fontSize: 11 } },
    { text: "Michael Cirigliano, CTT+  |  MOUS Master  |  IT Applications Administrator  |  January 2026",
      options: { color: WHITE, fontSize: 11, bold: true } }
  ], { x: 0.5, y: 4.73, w: 9, h: 0.85, fontFace: "Calibri", valign: "middle" });

  s.addNotes("This presentation is simultaneously a curriculum deliverable AND a live demonstration of the PowerPoint master slide and executive presentation skills taught in Track P of this curriculum. The design of this deck is itself a credential.");
}

// ============================================================
// SLIDE 2 — THE DIRECTIVE
// ============================================================
{
  const s = pres.addSlide();
  addMaster(s);
  addTitle(s, "The Assignment");

  // Memo card
  slide_addMemoCard(s);

  s.addNotes("Frame for the audience: this is not hypothetical. This is a response to a real organizational need. Every design decision in this deck connects to a real operational constraint at a senior living community.");
}

function slide_addMemoCard(s) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.12, w: 9, h: 3.45,
    fill: { color: LT_GRY }, line: { color: "DDDDDD", width: 0.75 }, shadow: makeShadow()
  });
  rect(s, 0.5, 1.12, 0.07, 3.45, NAVY);

  txt(s, "INTERNAL DIRECTIVE", 0.75, 1.17, 3.5, 0.32,
      { fs: 8.5, bold: true, color: MED_GRY, spacing: 3 });

  s.addShape(pres.shapes.LINE, {
    x: 0.65, y: 1.5, w: 8.7, h: 0,
    line: { color: "CCCCCC", width: 0.5 }
  });

  const fields = [
    ["TO:",   "Michael Cirigliano, IT Applications Administrator"],
    ["FROM:", "Director of IT Operations / VP of Operations, VMRC"],
    ["RE:",   "Design & Deployment of Microsoft Office Power User Training Curriculum"],
  ];
  fields.forEach(([lbl, val], i) => {
    txt(s, lbl, 0.75, 1.56 + i * 0.4, 0.75, 0.38,
        { fs: 10, bold: true, color: NAVY, margin: 0 });
    txt(s, val, 1.55, 1.56 + i * 0.4, 7.7, 0.38,
        { fs: 10, color: DK_GRY, margin: 0 });
  });

  s.addShape(pres.shapes.LINE, {
    x: 0.65, y: 2.77, w: 8.7, h: 0, line: { color: "CCCCCC", width: 0.5 }
  });

  s.addText(
    "“You are directed to design a Microsoft Office Power User training curriculum for VMRC clinical and administrative staff — reducing helpdesk burden, standardizing documentation, and building an internal technology champion cohort.”",
    { x: 0.75, y: 2.82, w: 8.55, h: 1.2, fontSize: 12.5, italic: true,
      color: DK_GRY, fontFace: "Calibri", valign: "top" }
  );

  rect(s, 0.5, 4.65, 9, 0.4, NAVY);
  txt(s, "This deck is the response to that directive.", 0.65, 4.67, 8.7, 0.36,
      { fs: 12, bold: true, color: WHITE, align: "center", margin: 0 });
}

// ============================================================
// SLIDE 3 — AUDIENCE ANALYSIS
// ============================================================
{
  const s = pres.addSlide();
  addMaster(s);
  addTitle(s, "Who We’re Training");

  const personas = [
    { role: "CNA / Med Aide",        comfort: "Low",          need: "Word basics only",           fmt: "10-min micro-modules",  col: "4472C4", lt: "D6E4F0" },
    { role: "RN / LPN (Charge)",     comfort: "Low–Medium", need: "Word + basic Excel",         fmt: "20-min LMS modules",    col: GREEN,    lt: LT_GRN  },
    { role: "Administrative Staff",  comfort: "Medium–High", need: "All three apps",           fmt: "60-min workshops",      col: ORANGE,   lt: LT_ORG  },
    { role: "Dept Head / DON",       comfort: "Medium",       need: "Excel dashboards + PPT",     fmt: "Blended",               col: "7030A0", lt: "EAD1DC" },
  ];

  const cW = 4.3, cH = 1.68, gapX = 0.6, gapY = 0.28;
  personas.forEach((p, i) => {
    const x = 0.4 + (i % 2) * (cW + gapX);
    const y = 1.18 + Math.floor(i / 2) * (cH + gapY);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cW, h: cH,
      fill: { color: WHITE }, line: { color: "DDDDDD", width: 0.75 }, shadow: makeShadow()
    });
    rect(s, x, y, cW, 0.5, p.col);
    txt(s, p.role, x + 0.15, y + 0.08, cW - 0.3, 0.36,
        { fs: 13, bold: true, color: WHITE, margin: 0 });

    const rows = [
      ["Tech Comfort:", p.comfort],
      ["Office Need:",  p.need],
      ["Format:",       p.fmt],
    ];
    rows.forEach(([lbl, val], ri) => {
      txt(s, lbl, x + 0.15, y + 0.57 + ri * 0.38, 1.25, 0.32,
          { fs: 9, bold: true, color: MED_GRY, margin: 0 });
      if (ri === 2) {
        rect(s, x + 1.48, y + 0.59 + ri * 0.38, 2.5, 0.25, p.col);
        txt(s, val, x + 1.48, y + 0.59 + ri * 0.38, 2.5, 0.25,
            { fs: 8.5, bold: true, color: WHITE, align: "center", margin: 0 });
      } else {
        txt(s, val, x + 1.48, y + 0.57 + ri * 0.38, 2.65, 0.32,
            { fs: 9.5, color: DK_GRY, margin: 0 });
      }
    });
  });

  rect(s, 0.4, 4.88, 9.2, 0.32, LT_GLD, GOLD, 0.5);
  txt(s, "One-size-fits-all training fails in a 24/7 care environment.  Role differentiation is non-negotiable.",
      0.55, 4.89, 9.0, 0.28,
      { fs: 9.5, bold: true, italic: true, color: GOLD, margin: 0 });

  s.addNotes("The CNA on a 12-hour rotating shift cannot attend a 2-hour workshop. The DON needs pivot tables, not basic data entry. Designing for the average learner means designing for nobody.");
}

// ============================================================
// SLIDE 4 — THE GAP
// ============================================================
{
  const s = pres.addSlide();
  addMaster(s);
  addTitle(s, "The Problem We’re Solving");

  const col = { w: 4.2, h: 3.3, hdr: 0.5 };

  // TODAY
  rect(s, 0.4, 1.12, col.w, col.hdr, RED);
  txt(s, "TODAY", 0.4, 1.12, col.w, col.hdr,
      { fs: 15, bold: true, color: WHITE, align: "center", spacing: 4, margin: 0 });
  rect(s, 0.4, 1.62, col.w, col.h, "FEF2F2", "FFCCCC", 0.5);

  ["Staff reformat the same document every time",
   "Excel used only as a glorified list",
   "Presentations inconsistent and unbranded",
   "Helpdesk tickets for basic formatting"].forEach((item, i) => {
    oval(s, 0.58, 1.82 + i * 0.72, 0.3, 0.3, RED);
    txt(s, "✕", 0.58, 1.82 + i * 0.72, 0.3, 0.3,
        { fs: 10, bold: true, color: WHITE, align: "center", margin: 0 });
    txt(s, item, 0.98, 1.8 + i * 0.72, 3.45, 0.38, { fs: 10.5, margin: 0 });
  });

  // Arrow
  txt(s, "▶", 4.7, 2.8, 0.6, 0.45,
      { fs: 22, color: MED_GRY, align: "center", margin: 0 });
  txt(s, "Training", 4.58, 3.22, 0.84, 0.28,
      { fs: 8, italic: true, color: MED_GRY, align: "center", margin: 0 });

  // AFTER
  rect(s, 5.4, 1.12, col.w, col.hdr, GREEN);
  txt(s, "AFTER TRAINING", 5.4, 1.12, col.w, col.hdr,
      { fs: 15, bold: true, color: WHITE, align: "center", spacing: 2, margin: 0 });
  rect(s, 5.4, 1.62, col.w, col.h, "F0FFF4", "BBD9CC", 0.5);

  ["Templates and styles applied automatically",
   "Pivot tables, dashboards, census analysis",
   "Branded, data-driven executive decks",
   "Self-sufficient staff + internal Power User coaches"].forEach((item, i) => {
    oval(s, 5.58, 1.82 + i * 0.72, 0.3, 0.3, GREEN);
    txt(s, "✓", 5.58, 1.82 + i * 0.72, 0.3, 0.3,
        { fs: 10, bold: true, color: WHITE, align: "center", margin: 0 });
    txt(s, item, 5.98, 1.8 + i * 0.72, 3.45, 0.38, { fs: 10.5, margin: 0 });
  });

  s.addNotes("The gap analysis is what justifies the investment. Connect every training decision back to one of these four pain points.");
}

// ============================================================
// SLIDE 5 — ID MAP (HERO)
// ============================================================
{
  const s = pres.addSlide();
  addMaster(s);
  addTitle(s, "The Curriculum Architecture — ID Map", NAVY, 24);

  // Foundation
  rect(s, 0.1, 1.1, 9.8, 0.42, NAVY);
  txt(s, "FOUNDATION LAYER — Microsoft 365 Orientation  ●  All Staff  ●  30 min  ●  Asynchronous",
      0.1, 1.1, 9.8, 0.42,
      { fs: 10, bold: true, color: WHITE, align: "center", margin: 0 });

  // Swimlane rows
  const lanes = [
    { label: "W\nWord",  color: BLUE,   lt: LT_BLU, y: 1.6,
      mods: [["W1","Document Architecture\n& Templates","30 min"],
             ["W2","Styles & Professional\nDocuments","45 min"],
             ["W3","Track Changes\n& Collaboration","30 min"],
             ["W4","Mail Merge\n& Automation","45 min"]] },
    { label: "E\nExcel", color: GREEN,  lt: LT_GRN, y: 2.52,
      mods: [["E1","Clean Data\nEntry & Structure","30 min"],
             ["E2","IF / VLOOKUP\n/ SUMIF","45 min"],
             ["E3","Pivot Tables for\nCensus & Staffing","60 min"],
             ["E4","Dashboard Building\n& Visual Reporting","60 min"]] },
    { label: "P\nPPT",   color: ORANGE, lt: LT_ORG, y: 3.44,
      mods: [["P1","Slide Design\nPrinciples","30 min"],
             ["P2","Master Slides\n& Templates","30 min"],
             ["P3","Link Excel Data\nto Presentations","45 min"],
             ["P4","Executive &\nFamily Presentations","45 min"]] },
  ];

  const laneH = 0.84;
  const labelW = 0.72;
  const boxW   = 2.13;
  const boxGap = 0.08;
  const boxStartX = 0.1 + labelW + 0.07;

  lanes.forEach(({ label, color, lt, y, mods }) => {
    // Lane label
    rect(s, 0.1, y, labelW, laneH, color);
    txt(s, label, 0.1, y, labelW, laneH,
        { fs: 10, bold: true, color: WHITE, align: "center", margin: 0 });

    mods.forEach(([id, title, dur], mi) => {
      const bx = boxStartX + mi * (boxW + boxGap);
      // Box bg
      rect(s, bx, y, boxW, laneH, lt, color, 0.5);
      // Top color strip
      rect(s, bx, y, boxW, 0.22, color);
      // ID + duration in strip
      txt(s, id, bx + 0.06, y + 0.02, 0.5, 0.18,
          { fs: 9.5, bold: true, color: WHITE, margin: 0 });
      txt(s, dur, bx + boxW - 0.72, y + 0.02, 0.66, 0.18,
          { fs: 8, color: WHITE, align: "center", margin: 0 });
      // Title
      txt(s, title, bx + 0.06, y + 0.24, boxW - 0.12, laneH - 0.28,
          { fs: 9, color: color, bold: false, valign: "top", margin: 0 });
    });
  });

  // Capstone
  rect(s, 0.1, 4.36, 9.8, 0.42, "7F6000");
  txt(s, "POWER USER CAPSTONE  ●  Competency Demo + Train-the-Trainer Certification  ●  All 3 Tracks  ●  4 Hours",
      0.1, 4.36, 9.8, 0.42,
      { fs: 10, bold: true, color: WHITE, align: "center", margin: 0 });

  // Arrow labels
  txt(s, "► Prerequisites flow left to right within each track",
      0.4, 4.83, 5, 0.3, { fs: 8.5, italic: true, color: MED_GRY, margin: 0 });
  txt(s, "Color coding maps to job aids and LMS course structure ►",
      5.0, 4.83, 4.6, 0.3, { fs: 8.5, italic: true, color: MED_GRY, align: "right", margin: 0 });

  s.addNotes("This is the ID Map. Three parallel tracks, one foundation, one capstone. Prerequisites flow left to right within each track. Role assignments determine which tracks each staff group completes. The color coding is not decorative — it maps to the job aids and LMS course structure.");
}

// ============================================================
// SLIDE 6 — ROLE ASSIGNMENT MATRIX
// ============================================================
{
  const s = pres.addSlide();
  addMaster(s);
  addTitle(s, "Who Takes What");

  const colW = [2.2, 1.6, 1.6, 1.6, 1.6];
  const startX = 0.35;
  const startY = 1.12;
  const hdrH   = 0.45;
  const rowH   = 0.62;

  const headers = ["Staff Role", "Track W\nWord", "Track E\nExcel", "Track P\nPPT", "Power User?"];
  const hColors = [NAVY, BLUE, GREEN, ORANGE, "7030A0"];

  let cx = startX;
  headers.forEach((h, i) => {
    rect(s, cx, startY, colW[i], hdrH, hColors[i]);
    txt(s, h, cx, startY, colW[i], hdrH,
        { fs: 10, bold: true, color: WHITE, align: "center", margin: 2 });
    cx += colW[i];
  });

  const rows = [
    ["CNA / Med Aide",          "W1 only",  "—",       "—",       "No"],
    ["RN / LPN (Charge)",       "W1–W3", "E1–E2", "—",       "By application"],
    ["Administrative Staff",    "W1–W4", "E1–E3", "P1–P3",   "★ Yes"],
    ["Department Head / DON",   "W1–W3", "E1–E4", "P1–P4",   "★ Yes"],
    ["Power User Cohort",       "W1–W4", "E1–E4", "P1–P4",   "★ Required"],
  ];
  const rowBg = ["FFFFFF", LT_GRY, "FFFFFF", LT_GRY, LT_GLD];

  rows.forEach((row, ri) => {
    let cx2 = startX;
    row.forEach((cell, ci) => {
      const bg = ri === 4 && ci > 0 ? LT_GLD : rowBg[ri];
      rect(s, cx2, startY + hdrH + ri * rowH, colW[ci], rowH, bg, "DDDDDD", 0.5);
      const isYes = cell.includes("★");
      const isNo  = cell === "No";
      txt(s, cell, cx2 + 0.05, startY + hdrH + ri * rowH, colW[ci] - 0.1, rowH,
          { fs: ci === 0 ? 10.5 : 11,
            bold: ci === 0 || isYes,
            color: isYes ? GREEN : (isNo ? MED_GRY : DK_GRY),
            align: ci === 0 ? "left" : "center",
            margin: 0 });
      cx2 += colW[ci];
    });
  });

  // Callout box
  rect(s, 0.35, 4.82, 9.3, 0.35, LT_BLU, BLUE, 0.5);
  txt(s, "The Power User cohort is self-selected and cross-role — they become the internal technology champions who reduce helpdesk dependency.",
      0.5, 4.83, 9.1, 0.32, { fs: 9, color: NAVY, italic: true, margin: 0 });

  s.addNotes("A CNA only takes W1. A DON takes almost everything. The role matrix is what you hand to HR to embed this in onboarding and annual competency requirements.");
}

// ============================================================
// SLIDES 7–9 — TRACK DEEP DIVES
// ============================================================
addTrackSlide(7, "W: Microsoft Word", BLUE, LT_BLU, [
  ["W1","Document Architecture & Templates","30 min",
   "Every time I open a new care plan I have to fix the margins and redo the heading."],
  ["W2","Styles, Formatting & Professional Documents","45 min",
   "The nursing handbook looks different every time depending on who edited it last."],
  ["W3","Track Changes & Collaborative Review","30 min",
   "Three people edited the fall prevention policy and now no one knows what changed."],
  ["W4","Mail Merge & Automation","45 min",
   "I spend two hours manually filling in the same information into individual family letters."],
], "Each module ends with a hands-on deliverable — not a quiz.",
"The scenario framing is a deliberate instructional design technique. Adults learn when content solves a problem they already recognize. These are verbatim complaints from healthcare admin environments.");

addTrackSlide(8, "E: Microsoft Excel", GREEN, LT_GRN, [
  ["E1","Clean Data Entry & Structure","30 min",
   "Our census spreadsheet has merged cells everywhere and the formulas break when someone adds a row."],
  ["E2","IF / VLOOKUP / SUMIF Functions","45 min",
   "I need to know how many residents are on Medicare A this week without counting by hand."],
  ["E3","Pivot Tables for Census & Staffing","60 min",
   "The DON wants a census breakdown by wing, level of care, and payor — by Monday morning."],
  ["E4","Dashboard Building & Visual Reporting","60 min",
   "Leadership wants a one-page dashboard showing census, staffing ratios, and incidents at a glance."],
], "E3 and E4 are the modules that move staff from competent to strategic.",
"Excel is where the operational leverage lives in a SNF. A charge nurse who can build a pivot table in 10 minutes is more valuable than one who takes 2 hours manually counting cells.");

addTrackSlide(9, "P: Microsoft PowerPoint", ORANGE, LT_ORG, [
  ["P1","Slide Design Principles","30 min",
   "Our staff meeting slides have 12-point text in paragraph form and every slide is a different color."],
  ["P2","Master Slides & Brand Templates","30 min",
   "Every department uses different fonts and colors. Can we just have one VMRC template everyone uses?"],
  ["P3","Data Visualization — Linking Excel","45 min",
   "Our census chart in the board presentation is always out of date because someone manually updates it."],
  ["P4","Executive & Family Communication","45 min",
   "We have a family night next month and the administrator wants a polished presentation, not a slide dump."],
], "This deck was built using the exact skills taught in P2 (Master Slides) and P4 (Executive Presentations) — it is itself the proof of concept.",
"The meta-point: this deck demonstrates P2 (Master Slides, brand consistency) and P4 (executive communication, family-facing design) simultaneously. When the hiring manager looks at this presentation, they are looking at the output of Track P.");

// ============================================================
// SLIDE 10 — DELIVERY STRATEGY
// ============================================================
{
  const s = pres.addSlide();
  addMaster(s);
  addTitle(s, "How It Gets Delivered");

  // Donut chart
  s.addChart(pres.charts.DOUGHNUT,
    [{ name: "Delivery Mix", labels: ["Async (LMS)", "Instructor-Led"], values: [60, 40] }],
    {
      x: 0.35, y: 1.12, w: 3.8, h: 3.4,
      chartColors: [BLUE, ORANGE],
      holeSize: 55,
      showLegend: true, legendPos: "b", legendFontSize: 10,
      showLabel: false,
      chartArea: { fill: { color: WHITE } },
      dataLabelColor: WHITE, showValue: true,
      dataLabelFontSize: 14, dataLabelFontBold: true
    }
  );

  // % labels inside donut visually via text boxes
  txt(s, "60%", 1.55, 2.45, 1.4, 0.45,
      { fs: 22, bold: true, color: BLUE, align: "center", margin: 0 });
  txt(s, "Async", 1.55, 2.85, 1.4, 0.28,
      { fs: 10, color: MED_GRY, align: "center", margin: 0 });

  // Format cards (right side)
  const fmts = [
    { label: "LMS Module",         sub: "15–30 min  •  Any device  •  Self-paced",         col: BLUE },
    { label: "Workshop",           sub: "60–90 min  •  Computer lab  •  8–12 learners", col: ORANGE },
    { label: "Job Aid Card",       sub: "Laminated  •  Workstation  •  Always-on reference",    col: GREEN },
    { label: "Power User Capstone",sub: "4 hours  •  Live demo + teach-back  •  Cohort only",   col: "7F6000" },
  ];

  fmts.forEach((f, i) => {
    const x = 4.4, y = 1.12 + i * 0.88;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 5.25, h: 0.78,
      fill: { color: WHITE }, line: { color: "DDDDDD", width: 0.75 }, shadow: makeShadow()
    });
    rect(s, x, y, 0.06, 0.78, f.col);
    txt(s, f.label, x + 0.15, y + 0.06, 4.8, 0.32, { fs: 11, bold: true, color: f.col, margin: 0 });
    txt(s, f.sub,   x + 0.15, y + 0.38, 4.8, 0.32, { fs: 9, color: MED_GRY, margin: 0 });
  });

  rect(s, 0.35, 4.82, 9.3, 0.35, "FFF2CC", AMBER, 0.5);
  txt(s, "⚠  Never schedule clinical workshops during peak care hours: 7–9 AM, 11 AM–1 PM, or 5–7 PM",
      0.5, 4.83, 9.1, 0.32, { fs: 9.5, bold: true, color: "7F6000", margin: 0 });

  s.addNotes("The blended ratio is not arbitrary. 60% async protects patient care operations. 40% instructor-led ensures the complex skills get practiced with a coach in the room. The scheduling rule about peak care hours is the most operationally important line in this entire deck.");
}

// ============================================================
// SLIDE 11 — ASSESSMENT PHILOSOPHY
// ============================================================
{
  const s = pres.addSlide();
  addMaster(s);
  addTitle(s, "We Measure What They Can DO");

  const steps = [
    { label: "Pre-Assessment", sub: "10-question skill audit before any training\nEstablishes baseline and guides track placement", color: NAVY },
    { label: "Module\nDeliverable", sub: "Hands-on task using a real practice file\nSubmitted via LMS for review", color: BLUE },
    { label: "Transfer\nCheck", sub: "Manager observation checklist at 30 days\nDid behavior actually change on the job?", color: GREEN },
  ];

  const boxW = 2.6, boxH = 2.3, startX = 0.55, y = 1.5;

  steps.forEach((st, i) => {
    const x = startX + i * (boxW + 0.6);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: boxW, h: boxH,
      fill: { color: WHITE }, line: { color: "DDDDDD", width: 0.75 }, shadow: makeShadow()
    });
    rect(s, x, y, boxW, 0.58, st.color);
    txt(s, `${i + 1}`, x + 0.12, y + 0.1, 0.38, 0.38,
        { fs: 18, bold: true, color: WHITE, align: "center", margin: 0 });
    txt(s, st.label, x + 0.55, y + 0.1, boxW - 0.65, 0.38,
        { fs: 12, bold: true, color: WHITE, margin: 0, valign: "middle" });
    txt(s, st.sub, x + 0.15, y + 0.68, boxW - 0.3, boxH - 0.78,
        { fs: 10, color: DK_GRY, valign: "top" });

    // Arrow
    if (i < 2) {
      txt(s, "▶", x + boxW + 0.15, y + boxH / 2 - 0.15, 0.28, 0.3,
          { fs: 16, color: MED_GRY, align: "center", margin: 0 });
    }
  });

  // Central callout
  rect(s, 1.5, 4.05, 7, 0.52, NAVY);
  txt(s, "Performance-based assessment — not recall-based",
      1.5, 4.05, 7, 0.52,
      { fs: 14, bold: true, color: WHITE, align: "center", margin: 0 });

  rect(s, 0.35, 4.63, 9.3, 0.35, LT_BLU, BLUE, 0.5);
  txt(s, "The deliverable IS the assessment. Watching a video and clicking ‘Next’ proves nothing about job performance.",
      0.5, 4.64, 9.1, 0.32, { fs: 9, italic: true, color: NAVY, margin: 0 });

  s.addNotes("The CTT+ framework distinguishes between knowledge assessment and performance assessment. Watching a video and passing a 5-question quiz proves nothing about whether a nurse can actually reformat a care plan. The deliverable IS the assessment.");
}

// ============================================================
// SLIDE 12 — DEPLOYMENT TIMING
// ============================================================
{
  const s = pres.addSlide();
  addMaster(s);
  addTitle(s, "Timing Is Everything");

  const months = [
    { m: "Jan", status: "LAUNCH",  color: GREEN,  bg: LT_GRN },
    { m: "Feb", status: "LAUNCH",  color: GREEN,  bg: LT_GRN },
    { m: "Mar", status: "CAUTION", color: AMBER,  bg: LT_AMB },
    { m: "Apr", status: "CAUTION", color: AMBER,  bg: LT_AMB },
    { m: "May", status: "CAUTION", color: AMBER,  bg: LT_AMB },
    { m: "Jun", status: "AVOID",   color: ORANGE, bg: LT_ORG },
    { m: "Jul", status: "AVOID",   color: ORANGE, bg: LT_ORG },
    { m: "Aug", status: "AVOID",   color: ORANGE, bg: LT_ORG },
    { m: "Sep", status: "PILOT",   color: "00897B", bg: "E0F2F1" },
    { m: "Oct", status: "PILOT",   color: "00897B", bg: "E0F2F1" },
    { m: "Nov", status: "NO",      color: RED,    bg: LT_RED },
    { m: "Dec", status: "NO",      color: RED,    bg: LT_RED },
  ];

  const mW = 0.745, startX = 0.4, y = 1.2;
  months.forEach((mo, i) => {
    const x = startX + i * mW;
    rect(s, x, y, mW - 0.04, 0.35, mo.color);
    txt(s, mo.m, x, y, mW - 0.04, 0.35,
        { fs: 9, bold: true, color: WHITE, align: "center", margin: 0 });
    rect(s, x, y + 0.35, mW - 0.04, 0.75, mo.bg, mo.color, 0.5);
    txt(s, mo.status, x, y + 0.37, mW - 0.04, 0.71,
        { fs: 7.5, bold: true, color: mo.color, align: "center", margin: 0 });
  });

  // Legend
  const legend = [
    { label: "LAUNCH WINDOW", color: GREEN },
    { label: "CAUTION — Survey Season", color: AMBER },
    { label: "AVOID FOR PILOTS", color: ORANGE },
    { label: "DO NOT LAUNCH", color: RED },
    { label: "PILOT WINDOW", color: GREEN },
  ];

  const groups = [
    { range: "Jan–Feb",  desc: "Post-holiday, pre-survey, full staff complement. Best new-year mindset.", color: GREEN },
    { range: "Mar–May",  desc: "Virginia state survey season. Avoid competing with compliance preparation.", color: AMBER },
    { range: "Jun–Aug",  desc: "Summer turnover and vacation gaps. Async-only completions acceptable.", color: ORANGE },
    { range: "Sep–Oct",  desc: "Power User cohort pilot. 90 days to iterate before January full launch.", color: "00897B" },
    { range: "Nov–Dec",  desc: "Holiday season. High emotional load. Mandatory training here creates resentment.", color: RED },
  ];

  groups.forEach((g, i) => {
    const gy = 2.45 + i * 0.5;
    oval(s, 0.4, gy + 0.1, 0.15, 0.15, g.color);
    txt(s, g.range, 0.62, gy, 1.3, 0.38, { fs: 9.5, bold: true, color: g.color, margin: 0 });
    txt(s, g.desc,  1.95, gy, 7.7, 0.38, { fs: 9.5, color: DK_GRY, margin: 0 });
  });

  rect(s, 0.35, 4.82, 9.3, 0.35, "1F4E79", "1F4E79", 0);
  txt(s, "The #1 reason training programs fail is bad timing — not bad content.",
      0.5, 4.83, 9.1, 0.32, { fs: 10.5, bold: true, color: WHITE, align: "center", margin: 0 });

  s.addNotes("Virginia state surveys typically run March through May. Launching a mandatory training initiative in November guarantees resentment. The September pilot / January launch sequence gives you 90 days to iterate before the full rollout — and positions the training as a new year initiative, not a compliance burden.");
}

// ============================================================
// SLIDE 13 — 4-PHASE ROLLOUT (GANTT)
// ============================================================
{
  const s = pres.addSlide();
  addMaster(s);
  addTitle(s, "The Rollout Plan");

  // Month axis: Sep through May = 9 months
  const months = ["Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"];
  const axisX = 2.1, axisW = 7.7, mW = axisW / months.length;

  months.forEach((m, i) => {
    const x = axisX + i * mW;
    rect(s, x, 1.12, mW - 0.04, 0.32, i < 2 ? LT_GRN : i < 4 ? LT_RED : i < 6 ? LT_GLD : i < 7 ? LT_ORG : "E8F5E9", "DDDDDD", 0.3);
    txt(s, m, x, 1.12, mW - 0.04, 0.32, { fs: 9, color: DK_GRY, align: "center", margin: 0 });
  });

  const phases = [
    { label: "Phase 1: Power User Pilot",          color: GREEN,  start: 0, span: 2,
      bullets: ["Recruit 4–8 volunteers across roles","Run all 12 modules","Certify Train-the-Trainers"] },
    { label: "Phase 2: Administrative Launch",     color: BLUE,   start: 4, span: 2,
      bullets: ["Full admin staff launch","2×/week instructor workshops","Power Users as peer coaches"] },
    { label: "Phase 3: Clinical Rollout",          color: ORANGE, start: 5, span: 2,
      bullets: ["Async LMS push to all nurses","Mid-shift micro-workshops","Power Users on each shift"] },
    { label: "Phase 4: Evaluate & Certify",        color: "7F6000", start: 7, span: 2,
      bullets: ["Kirkpatrick assessments","Helpdesk ticket analysis","Issue digital badges"] },
  ];

  phases.forEach((ph, i) => {
    const gy = 1.55 + i * 0.72;
    const barX = axisX + ph.start * mW;
    // Clamp bar width so it never exceeds the slide
    const barW = Math.min(ph.span * mW - 0.06, axisX + axisW - barX - 0.05);

    // Phase label (left column)
    rect(s, 0.1, gy, 1.95, 0.65, ph.color);
    txt(s, ph.label, 0.15, gy, 1.85, 0.65,
        { fs: 8.5, bold: true, color: WHITE, margin: 2, valign: "middle" });

    // Gantt bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: barX, y: gy + 0.05, w: barW, h: 0.56,
      fill: { color: ph.color }, line: { color: ph.color, width: 0 },
      shadow: makeShadow()
    });

    // Bullets always inside the bar as white text (avoids off-slide overflow)
    const bText = ph.bullets.join("   •   ");
    txt(s, bText, barX + 0.1, gy + 0.05, Math.max(barW - 0.2, 0.5), 0.56,
        { fs: 7.5, color: WHITE, valign: "middle", margin: 0 });
  });

  rect(s, 0.35, 4.82, 9.3, 0.35, LT_BLU, BLUE, 0.5);
  txt(s, "Power Users first — they become the faces of the training, not IT. Clinical staff async-first to protect the floor.",
      0.5, 4.83, 9.1, 0.32, { fs: 9, italic: true, color: NAVY, margin: 0 });

  s.addNotes("The sequencing is intentional. Power Users first — they become the faces of the training program, not IT. Admin staff second — they have the most schedule flexibility and create early success stories. Clinical staff third — async-first to protect the floor.");
}

// ============================================================
// SLIDE 14 — KIRKPATRICK MODEL
// ============================================================
{
  const s = pres.addSlide();
  addMaster(s);
  addTitle(s, "How We Know It Worked — Kirkpatrick Model");

  // Traditional Kirkpatrick: L1 at base (widest), L4 at apex (narrowest)
  const levels = [
    { n: "L4", name: "Results",   color: "7F6000", y: 1.15, pW: 4.5,
      q: "Did it move the needle for VMRC?",
      m: "Documentation quality + helpdesk tickets. 6-month target: ≥25%." },
    { n: "L3", name: "Behavior",  color: GREEN,    y: 2.0,  pW: 6.0,
      q: "Are they using skills on the job?",
      m: "Manager observation at 30/60 days. Target: 25% helpdesk ticket reduction within 90 days." },
    { n: "L2", name: "Learning",  color: BLUE,     y: 2.85, pW: 7.5,
      q: "Did they acquire the skills?",
      m: "Module deliverable scores. Target: ≥80% of learners pass on first attempt." },
    { n: "L1", name: "Reaction",  color: "4472C4", y: 3.7,  pW: 9.0,
      q: "Did staff find it relevant?",
      m: "End-of-module satisfaction survey (5 items, 5-point scale). Target: ≥4.0/5.0." },
  ];

  // Pyramid bars (centered at x=5)
  const cx = 5.0;
  levels.forEach((lv) => {
    const bx = cx - lv.pW / 2;
    const textW = Math.min(2.8, lv.pW - 2.3);
    rect(s, bx, lv.y, lv.pW, 0.72, lv.color);
    txt(s, lv.n, bx + 0.12, lv.y, 0.45, 0.72,
        { fs: 11, bold: true, color: WHITE, align: "center", margin: 0 });
    txt(s, lv.name, bx + 0.62, lv.y, 1.5, 0.72,
        { fs: 12, bold: true, color: WHITE, margin: 0 });
    if (textW < 2.5) {
      s.addText([
        { text: lv.q, options: { italic: true, breakLine: true } },
        { text: lv.m }
      ], { x: bx + 2.2, y: lv.y, w: textW, h: 0.72,
           fontSize: 7.5, color: WHITE, fontFace: "Calibri", margin: 2, valign: "middle" });
    } else {
      txt(s, lv.q, bx + 2.2, lv.y, textW, 0.35,
          { fs: 9, italic: true, color: WHITE, margin: 0, valign: "bottom" });
      txt(s, lv.m, bx + 2.2, lv.y + 0.37, textW, 0.35,
          { fs: 8.5, color: WHITE, margin: 0, valign: "top" });
    }
  });

  rect(s, 0.35, 4.52, 9.3, 0.38, LT_GLD, GOLD, 0.5);
  txt(s, "Most programs only measure Level 1. Levels 3 and 4 are where ROI lives.",
      0.5, 4.53, 9.1, 0.35, { fs: 10.5, bold: true, color: GOLD, align: "center", margin: 0 });

  s.addNotes("Most training programs only measure Level 1 — did people like it. That's the least important metric. Level 3 and 4 are where ROI lives. The 25% helpdesk ticket target is the specific, measurable business outcome that makes this worth leadership's investment.");
}

// ============================================================
// SLIDE 15 — POWER USER COHORT
// ============================================================
{
  const s = pres.addSlide();
  addMaster(s);
  addTitle(s, "Building Internal Technology Champions");

  const steps = [
    { label: "Self-Selected\nVolunteers",         sub: "4–8 staff, cross-role, cross-shift", color: BLUE   },
    { label: "Complete All\n12 Modules",          sub: "Submit every module deliverable",        color: GREEN  },
    { label: "Capstone:\nDemo + Teach-Back",      sub: "4-hour live competency session",         color: ORANGE },
    { label: "Certified\nPower User",             sub: "Digital badge issued",                   color: "7F6000" },
    { label: "Embedded\nUnit Coach",              sub: "Peer support on their shift",            color: NAVY   },
  ];

  const bW = 1.6, bH = 1.7, startX = 0.25, y = 1.55;
  steps.forEach((st, i) => {
    const x = startX + i * (bW + 0.35);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: bW, h: bH,
      fill: { color: WHITE }, line: { color: "DDDDDD", width: 0.75 }, shadow: makeShadow()
    });
    rect(s, x, y, bW, 0.5, st.color);
    txt(s, `${i + 1}`, x + 0.1, y + 0.1, 0.3, 0.3,
        { fs: 13, bold: true, color: WHITE, align: "center", margin: 0 });
    txt(s, st.label, x + 0.05, y + 0.54, bW - 0.1, 0.72,
        { fs: 10, bold: true, color: st.color, valign: "top", margin: 2 });
    txt(s, st.sub, x + 0.05, y + 1.3, bW - 0.1, 0.35,
        { fs: 8.5, color: MED_GRY, valign: "top", margin: 2 });
    if (i < 4) {
      txt(s, "▶", x + bW + 0.07, y + bH / 2 - 0.15, 0.2, 0.3,
          { fs: 14, color: MED_GRY, align: "center", margin: 0 });
    }
  });

  // Key callouts
  const callouts = [
    { text: "They are the faces of the training — not IT" },
    { text: "Each unit gets a go-to person who is not the helpdesk" },
    { text: "Train-the-Trainer model scales the program beyond the initial rollout" },
  ];
  callouts.forEach((c, i) => {
    oval(s, 0.42, 3.48 + i * 0.38, 0.15, 0.15, NAVY);
    txt(s, c.text, 0.65, 3.45 + i * 0.38, 8.9, 0.36,
        { fs: 10.5, color: DK_GRY, margin: 0 });
  });

  rect(s, 0.35, 4.82, 9.3, 0.35, NAVY);
  txt(s, "The Power User cohort is how this training outlives the person who designed it.",
      0.5, 4.83, 9.1, 0.32,
      { fs: 10, bold: true, color: WHITE, align: "center", margin: 0 });

  s.addNotes("If the only person who can deliver this training is the IT Applications Administrator, the program is fragile. The Power User cohort makes the training self-sustaining. Three years from now, when new CNAs are hired, a Power User on their unit shows them how to use the care plan template — not IT.");
}

// ============================================================
// SLIDE 16 — CREDENTIALS IN ACTION
// ============================================================
{
  const s = pres.addSlide();
  addMaster(s);
  addTitle(s, "Why This Design Is What It Is");

  const creds = [
    { badge: "CTT+",           label: "CompTIA Certified\nTechnical Trainer",
      body: "Bloom’s-aligned objectives, performance-based assessment, blended delivery model — these are CTT+ framework decisions, not preferences.",
      color: NAVY },
    { badge: "MOUS",           label: "Microsoft Office\nUser Specialist (Master)",
      body: "Every skill in all 12 modules is precision-selected for the Office feature level that creates operational leverage. This is not a beginner tutorial.",
      color: BLUE },
    { badge: "Vo-Tech",        label: "Valley Vocational\nTech Center 2008–2014",
      body: "Role differentiation — meeting learners at their actual skill level — comes from 6 years teaching students and adult learners in a vocational environment.",
      color: GREEN },
    { badge: "HC Ops",         label: "Wellness Concepts\nHealthcare 2018–2025",
      body: "Every scenario example is drawn from a real senior living workflow pain point. The census pivot table, the care plan template — these are not textbook abstractions.",
      color: "8B4513" },
    { badge: "LW",             label: "LearnWorlds\nPlatform Creator",
      body: "The LMS architecture, SCORM delivery, manager dashboard, and mobile-first module design are platform-informed recommendations, not theoretical.",
      color: "7030A0" },
  ];

  const cW = 1.7, cH = 2.35;
  creds.forEach((c, i) => {
    const x = 0.35 + i * (cW + 0.17);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.1, w: cW, h: cH,
      fill: { color: WHITE }, line: { color: "DDDDDD", width: 0.75 }, shadow: makeShadow()
    });
    rect(s, x, 1.1, cW, 0.55, c.color);
    txt(s, c.badge, x + 0.08, 1.12, cW - 0.16, 0.3,
        { fs: 14, bold: true, color: WHITE, margin: 0 });
    txt(s, c.label, x + 0.08, 1.4, cW - 0.16, 0.42,
        { fs: 8, bold: true, color: WHITE, margin: 0, valign: "top" });
    rect(s, x, 1.65, cW, 0.03, c.color);
    txt(s, c.body, x + 0.1, 1.7, cW - 0.2, cH - 0.65,
        { fs: 8.5, color: DK_GRY, valign: "top" });
  });

  rect(s, 0.35, 3.55, 9.3, 0.55, NAVY);
  txt(s, "This is not a document about what could be built.\nIt is a demonstration of what is already understood.",
      0.5, 3.57, 9.1, 0.51,
      { fs: 13, bold: true, color: WHITE, align: "center", margin: 0 });

  rect(s, 0.35, 4.18, 9.3, 0.42, LT_GLD, GOLD, 0.5);
  txt(s, "The hiring manager is not being asked to take credentials on faith — they are watching them applied in real time.",
      0.5, 4.19, 9.1, 0.4, { fs: 10, italic: true, color: GOLD, align: "center", margin: 0 });

  s.addNotes("This slide exists to make explicit what the rest of the deck makes implicit. Every design decision in this curriculum traces to a specific credential or operational experience. The hiring manager is not being asked to take credentials on faith — they are watching them applied in real time.");
}

// ============================================================
// SLIDE 17 — CLOSING / THE ASK
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  rect(s, 0, 0, 0.08, 5.625, BLUE);
  rect(s, 0, 0, 10, 0.07, BLUE);

  txt(s, "The Ask", 0.6, 0.55, 8.8, 0.6,
      { fs: 32, bold: true, color: WHITE, valign: "middle" });
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 1.22, w: 8.8, h: 0, line: { color: BLUE, width: 1.5 }
  });

  const asks = [
    "1.  Approve the September Power User pilot cohort",
    "2.  Confirm January launch window with nursing leadership",
    "3.  Allocate computer lab access — two sessions per week, January through March",
  ];
  asks.forEach((a, i) => {
    rect(s, 0.55, 1.35 + i * 0.9, 8.9, 0.72, "162F4B");
    rect(s, 0.55, 1.35 + i * 0.9, 0.06, 0.72, BLUE);
    txt(s, a, 0.72, 1.35 + i * 0.9, 8.65, 0.72,
        { fs: 14, bold: true, color: WHITE, valign: "middle", margin: 0 });
  });

  txt(s, "The September pilot is low-risk — it’s just volunteers. That’s the easiest yes in the room.",
      0.6, 4.12, 8.8, 0.4, { fs: 11, italic: true, color: LT_BLU, margin: 0 });

  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 4.6, w: 8.8, h: 0, line: { color: "2E75B6", width: 1 }
  });

  txt(s, "Michael Cirigliano, CTT+  |  MOUS Master  |  tykecirigliano@gmail.com  |  vibinginva.com",
      0.6, 4.68, 8.8, 0.38, { fs: 11, color: "AACCE0", margin: 0 });

  txt(s, "Part of a complete portfolio: Word curriculum document  +  this presentation  +  React progress tracker",
      0.6, 5.08, 8.8, 0.35, { fs: 10, italic: true, color: LT_BLU, margin: 0 });

  s.addNotes("End with a clear ask. Don't let the presentation trail off into 'questions?' Give leadership three specific, low-friction next steps. The September pilot is low-risk — it's just volunteers. That's the easiest yes in the room.");
}

// ============================================================
// WRITE FILE
// ============================================================
const outPath = "C:\\Users\\tykec\\Desktop\\1BigFolderTrueDesktop\\Instructional Design\\VMRC_ID_Curriculum_Presentation.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log(`Saved: ${outPath}`))
  .catch(err => { console.error("Error:", err); process.exit(1); });
