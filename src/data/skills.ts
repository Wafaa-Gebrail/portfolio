export interface SkillCategory {
  number: string;
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    number: '01',
    category: 'Languages',
    skills: ['Dart', 'Python', 'C#', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    number: '02',
    category: 'Web & Mobile',
    skills: ['React', 'Vite', 'Flutter', 'Responsive Design'],
  },
  {
    number: '03',
    category: 'Architecture & Engineering',
    skills: ['Clean Architecture', 'SOLID', 'MVC', 'OOP', 'SDLC', 'Problem Solving'],
  },
  {
    number: '04',
    category: 'APIs & State',
    skills: ['REST API', 'SignalR', 'Real-time Applications', 'GetX', 'BLoC', 'Provider'],
  },
  {
    number: '05',
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Jira', 'Postman', 'Figma', 'Android Studio', 'VS Code', 'Visual Studio', 'draw.io'],
  },
];
