import solarWebsiteImage from '../assets/images/solar website.png';
import intelastWebsiteImage from '../assets/images/intelast website.png';
import denticityProImage from '../assets/images/denticity pro.png';
import emoMatchImage from '../assets/images/emo match.png';
import tripyAppImage from '../assets/images/tripy app.png';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  featured: boolean;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Dentcity Go',
    description: 'Flutter-based mobile application that works as a real-time companion to the DentCity desktop application used in dental clinics.',
    longDescription:
      "The application establishes a complete real-time connection between a dentist's mobile device and computer, allowing both devices to work together and stay synchronized while viewing and analyzing dental X-Ray images.",
    technologies: ['Flutter', 'Bloc State Management', 'SignalR'],
    category: 'Mobile App',
    featured: true,
    githubUrl: 'https://github.com/Wafaa-Gebrail/dentcity-go',
    highlights: [
      'Discover available desktop devices by scanning nearby IP addresses',
      'Synchronize image navigation, selected patients, image display modes, and other application interactions',
      'Synchronize patient selection between the desktop and mobile applications',
    ],
    image: denticityProImage ,
  },
  {
    id: 'project-2',
    title: 'Solar Energy Website',
    description: "Developed a modern and responsive React-based website for a solar energy company, designed to showcase the company's services, projects, solutions, and business information through a professional and user-friendly interface",
    technologies: ['React', 'HTML5 & CSS3', 'TypeScript', 'Vite'],
    category: 'Website',
    featured: true,
    githubUrl: 'https://github.com/Wafaa-Gebrail/Solar_Website',
    highlights: [
      "Presented the company's solar energy solutions and services",
      'Organized information into clear and reusable sections',
      'Fully responsive across desktop, tablet, and mobile devices',
    ],
    image: solarWebsiteImage ,
  },
  {
    id: 'project-3',
    title: 'EmoMatch',
    description: 'Developed a Flutter-based real-time messaging and relationship application that combines instant communication, interactive relationship games, AI-powered features, and emotion analysis.',
    technologies: ['Flutter', 'Cubit ', 'SignalR', 'Firebase'],
    category: 'Mobile App',
    featured: false,
    githubUrl: 'https://github.com/Wafaa-Gebrail/emo-match',
    image: emoMatchImage ,
  },
  {
    id: 'project-4',
    title: 'Tripy Travel App',
    description: 'Developed a Flutter-based travel management application that connects travelers, travel companies, trip coordinators, and place owners in one platform.',
    technologies: ['Flutter', 'Cubit', 'Google Maps', 'Easy Localization'],
    category: 'Mobile App',
    featured: false,
    githubUrl: 'https://github.com/Wafaa-Gebrail/tripy-app',
    image: tripyAppImage ,
  },

   {
    id: 'project-5',
    title: 'Intelast Website',
    description: "Developed a modern and responsive React-based website for Intelast, designed to present the company's identity, services, solutions, and business information through a professional and engaging digital experience",
    technologies: ['React', 'TypeScript', 'Vite'],
    category: 'Website',
    featured: false,
    githubUrl: 'https://github.com/Wafaa-Gebrail/Intelast-Website',
    image: intelastWebsiteImage ,
  },
];
