export interface EventData {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  locationNotes: string;
  registrationLink: string;
  socialLinks: {
    whatsapp: string;
    instagram: string;
    telegram: string;
  };
}

export interface ExtractedData {
  title?: string;
  description?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  locationNotes?: string;
  registrationLink?: string;
  socialLinks?: {
    whatsapp?: string;
    instagram?: string;
    telegram?: string;
  };
}