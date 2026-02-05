export interface TechnicalSkill {
  name: string
  color?: string
}

export interface Project {
  title: string
  dates: string
  duration: string
  stack?: string
  description: string
  company: string
  companyPictureUrl: string
  companyPicture: string
}

export interface Education {
  school: string
  degreeInfos: string
  dates: string
  schoolPictureUrl: string
  schoolPicture: string
}

export interface Curriculum {
  name: string
  headline: string
  email: string
  phone: string
  city: string
  url: string
  experienceStart: string
  profilePicture: string
  technicalSkills: TechnicalSkill[]
  about: string
  projects: Project[]
  education: Education[]
}
