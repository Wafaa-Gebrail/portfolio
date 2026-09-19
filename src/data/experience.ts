export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Medicuras',
    position: 'Software Engineer',
    location: 'Syria, Damascus, Alhamrah',
    startDate: '2024',
    endDate: '2025',
    current: false,
    description: [
      "Developed and maintained cross-platform mobile applications using Flutter.",
      "Integrated REST APIs and real-time features to build responsive and reliable user experiences.",
      "Worked with designers, backend developers, and QA engineers throughout the development process.",
      "Contributed to projects involving WPF desktop applications, web development React, and AI-based image processing.",
      "Contributed to maintaining project documentation and creating diagrams to communicate system architecture, workflows, and technical requirements.",
    ],
    technologies: ['Flutter', 'React', 'signalR', 'REST APIs', 'Git', 'UI/UX - Figma'],
  },
  {
    id: 'exp-2',
    company: 'Tazzur Institution',
    position: 'Freelance Flutter Developer',
    location: 'Remote',
    startDate: '2023',
    endDate: '2024',
    current: false,
    description: [
      'Built an application that allows companies to post job and training opportunities while enabling users to create CVs and apply directly through the app.',
      'Implemented Firebase services, including real-time notifications, to keep users updated on new opportunities.',
      'Contributed to the UI/UX design of the application, focusing on intuitive user flows, responsive interfaces, and a consistent user experience.',
      'Worked directly with the client throughout the project lifecycle, from requirements gathering and feature planning to development, testing, refinement, and delivery.',
    ],
    technologies: ['Flutter', 'Firebase', 'draw.io', 'UI/UX - Figma'],
  },
];
