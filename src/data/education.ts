export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

export const education: Education[] = [
  {
    id: 'edu-1',
    institution: 'University Name',
    degree: "Bachelor's Degree",
    field: 'Computer Science',
    startDate: '2019',
    endDate: '2024',
    description: 'Focused on software engineering, algorithms, and modern web technologies.',
  },
];

export const certifications: Certification[] = [
  // Add certifications from CV here
];
