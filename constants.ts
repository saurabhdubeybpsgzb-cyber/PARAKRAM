export const CLASSES = [
  "5TH",
  "7TH",
  "8TH",
  "12TH",
  "Bsc",
  "BA",
  "Btech",
];

export const GENDERS = ["Male", "Female", "Other"];

const degreeLevelExams = [
    "IMA /INA / AFA / OTA (CDS / UPSC)",
    "AiR Force (AFCAT / IAF)",
    "Indian Navy (INET / Indian Navy)",
    "Indian Coast Guard (CGCAT / INCG)"
];

export const COURSE_OPTIONS_MAP: Record<string, string[]> = {
  "5TH": [
    "Sainik Schools (AISSEE / NTA )",
    "Rashtriya Military School (RMSEE / IHQ (Army))"
  ],
  "7TH": ["RIMC (RIMCEE / RIMC)"],
  "8TH": [
    "Sainik Schools (AISSEE / NTA )",
    "Rashtriya Military School (RMSEE / IHQ (Army))"
  ],
  "12TH": ["NDA (Army/Navy/Air Force)"],
  "Bsc": degreeLevelExams,
  "BA": degreeLevelExams,
  "Btech": degreeLevelExams,
};