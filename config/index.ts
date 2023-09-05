import { contact, Contact } from './contact';
import { Project, projects } from './projects';
import { Talk, talks } from './talks';

interface Config {
  contact: Contact;
  projects: Project[];
  talks: Talk[];
}

const config: Config = {
  contact,
  projects,
  talks,
};

export const POSTS_PER_PAGE = 10;

export default config;
