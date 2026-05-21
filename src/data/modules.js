// All training modules. `required` lists which roles must complete this module.
// Roles: CNA | RN | Admin | DON | PU (Power User)
export const MODULES = [
  { id: "F0",  track: "F",   title: "Microsoft 365 Orientation",  duration: "30 min", required: ["CNA","RN","Admin","DON","PU"] },
  { id: "W1",  track: "W",   title: "Document Architecture",       duration: "30 min", required: ["CNA","RN","Admin","DON","PU"] },
  { id: "W2",  track: "W",   title: "Styles & Professional Docs",  duration: "45 min", required: ["RN","Admin","DON","PU"] },
  { id: "W3",  track: "W",   title: "Track Changes & Review",      duration: "30 min", required: ["Admin","DON","PU"] },
  { id: "W4",  track: "W",   title: "Mail Merge & Automation",     duration: "45 min", required: ["Admin","PU"] },
  { id: "E1",  track: "E",   title: "Clean Data Structure",        duration: "30 min", required: ["RN","Admin","DON","PU"] },
  { id: "E2",  track: "E",   title: "IF / VLOOKUP / SUMIF",        duration: "45 min", required: ["RN","Admin","DON","PU"] },
  { id: "E3",  track: "E",   title: "Pivot Tables",                duration: "60 min", required: ["Admin","DON","PU"] },
  { id: "E4",  track: "E",   title: "Dashboard Building",          duration: "60 min", required: ["Admin","DON","PU"] },
  { id: "P1",  track: "P",   title: "Slide Design Principles",     duration: "30 min", required: ["Admin","DON","PU"] },
  { id: "P2",  track: "P",   title: "Master Slides & Templates",   duration: "30 min", required: ["Admin","DON","PU"] },
  { id: "P3",  track: "P",   title: "Link Excel Data",             duration: "45 min", required: ["Admin","DON","PU"] },
  { id: "P4",  track: "P",   title: "Executive Presentations",     duration: "45 min", required: ["DON","PU"] },
  { id: "CAP", track: "CAP", title: "Power User Capstone",         duration: "4 hrs",  required: ["PU"] },
];

export const TRACKS = {
  F:   { label: "Foundation", color: "bg-slate-600",   text: "text-white",  border: "border-slate-600",  light: "bg-slate-100" },
  W:   { label: "Track W — Word",       color: "bg-vmblue",    text: "text-white",  border: "border-vmblue",     light: "bg-blue-50"   },
  E:   { label: "Track E — Excel",      color: "bg-vmgreen",   text: "text-white",  border: "border-vmgreen",    light: "bg-green-50"  },
  P:   { label: "Track P — PowerPoint", color: "bg-vmorange",  text: "text-white",  border: "border-vmorange",   light: "bg-orange-50" },
  CAP: { label: "Capstone",             color: "bg-vmgold",    text: "text-white",  border: "border-vmgold",     light: "bg-yellow-50" },
};
