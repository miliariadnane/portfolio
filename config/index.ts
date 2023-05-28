import { contact, Contact } from './contact';
import { Course, courses } from './courses';
import { Project, projects } from './projects';
import { Talk, talks } from './talks';

interface Config {
  contact: Contact;
  projects: Project[];
  talks: Talk[];
  courses: Course[];
}

const config: Config = {
  contact,
  projects,
  talks,
  courses,
};

export const POSTS_PER_PAGE = 10;

export default config;
