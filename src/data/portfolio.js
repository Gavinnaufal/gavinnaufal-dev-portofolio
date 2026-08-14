import portfolioData from './portfolio.json'

export const {
  profile,
  navigation,
  hero,
  about,
  skills: skillsSection,
  projects: projectsSection,
  education: educationSection,
  contact: contactSection,
  footer,
} = portfolioData

export const navItems = portfolioData.navigation.links
export const stats = portfolioData.about.stats
export const skills = portfolioData.skills.items
export const projects = portfolioData.projects.items
export const educations = portfolioData.education.items
export const contacts = portfolioData.contact.items

export default portfolioData
