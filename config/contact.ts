export enum ContactType {
  github = 'github',
  linkedin = 'linkedin',
  twitter = 'twitter',
  youtube = 'youtube',
  email = 'email',
  buymeacoffee = 'buymeacoffee',
}

export interface Contact {
  twitter: string;
  site: string;
  calendly?: string;
  links: Record<ContactType, string>;
}

export const contact: Contact = {
  twitter: '@miliariadnane',
  site: 'miliari.me',
  calendly: 'https://calendly.com/miliariadnane',
  links: {
    github: 'https://github.com/miliariadnane',
    linkedin: 'https://linkedin.com/in/miliariadnane',
    twitter: 'https://twitter.com/miliariadnane',
    youtube: 'https://www.youtube.com/c/miliariadnane',
    email: 'mailto:miliari.adnane@gmail.com',
    buymeacoffee: 'https://www.buymeacoffee.com/miliariadnane',
  },
};
