export const LEARNERS = [
  // CNAs
  { id: "L01", name: "Maria Gonzalez",   role: "CNA",   dept: "West Wing",           priorTraining: false },
  { id: "L02", name: "Deja Williams",    role: "CNA",   dept: "East Wing",           priorTraining: false },
  { id: "L03", name: "Patricia Huff",    role: "CNA",   dept: "Memory Care",         priorTraining: true  },
  { id: "L04", name: "Tamika Johnson",   role: "CNA",   dept: "West Wing",           priorTraining: false },
  { id: "L05", name: "Rosa Menendez",    role: "CNA",   dept: "East Wing",           priorTraining: false },
  // RNs
  { id: "L06", name: "James Whitfield",  role: "RN",    dept: "West Wing",           priorTraining: true  },
  { id: "L07", name: "Sandra Patel",     role: "RN",    dept: "East Wing",           priorTraining: false },
  { id: "L08", name: "Kevin O'Brien",    role: "RN",    dept: "Memory Care",         priorTraining: true  },
  { id: "L09", name: "Latoya Simmons",   role: "RN",    dept: "West Wing",           priorTraining: false },
  // Admin
  { id: "L10", name: "Carol Erickson",   role: "Admin", dept: "Business Office",     priorTraining: true  },
  { id: "L11", name: "Brian Kessler",    role: "Admin", dept: "Human Resources",     priorTraining: false },
  { id: "L12", name: "Angela Torres",    role: "Admin", dept: "Admissions",          priorTraining: false },
  { id: "L13", name: "Michelle Ford",    role: "Admin", dept: "Business Office",     priorTraining: true  },
  // DON / Dept Heads
  { id: "L14", name: "Dr. Paula Nkosi",  role: "DON",   dept: "Director of Nursing", priorTraining: true  },
  { id: "L15", name: "Robert Hawkins",   role: "DON",   dept: "Rehab Director",      priorTraining: false },
  { id: "L16", name: "Deborah Quinn",    role: "DON",   dept: "Activities Director", priorTraining: true  },
  // Power Users (pilot cohort)
  { id: "L17", name: "Alicia Chambers",  role: "PU",    dept: "Business Office",     priorTraining: true  },
  { id: "L18", name: "Marcus Webb",      role: "PU",    dept: "IT Support",          priorTraining: true  },
];

export const ROLE_META = {
  CNA:   { label: "CNA / Med Aide",     color: "bg-blue-100   text-blue-800"  },
  RN:    { label: "RN / LPN",           color: "bg-green-100  text-green-800" },
  Admin: { label: "Admin Staff",        color: "bg-orange-100 text-orange-800"},
  DON:   { label: "Dept Head / DON",    color: "bg-purple-100 text-purple-800"},
  PU:    { label: "Power User",         color: "bg-yellow-100 text-yellow-800"},
};
