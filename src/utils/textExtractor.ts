import { ExtractedData } from '../types';
import { parse, format, isValid } from 'date-fns';
import { es } from 'date-fns/locale/es';

const DATE_FORMATS = [
  'd/M/yyyy',
  'dd/MM/yyyy',
  'd-M-yyyy',
  'dd-MM-yyyy',
  'd MMM yyyy',
  'dd MMM yyyy',
  'd MMMM yyyy',
  'dd MMMM yyyy',
  'MMMM d, yyyy',
];

function parseDate(dateStr: string): Date | null {
  // Try parsing with different formats
  for (const dateFormat of DATE_FORMATS) {
    try {
      const parsedDate = parse(dateStr, dateFormat, new Date(), { locale: es });
      if (isValid(parsedDate)) {
        return parsedDate;
      }
    } catch (e) {
      continue;
    }
  }
  return null;
}

function parseTime(timeStr: string): string | null {
  const timeRegex = /(\d{1,2}):?(\d{2})?\s*(am|pm|AM|PM)?/;
  const match = timeStr.match(timeRegex);
  
  if (match) {
    let [, hours, minutes = '00', meridiem] = match;
    let hour = parseInt(hours);
    
    if (meridiem?.toLowerCase() === 'pm' && hour < 12) {
      hour += 12;
    } else if (meridiem?.toLowerCase() === 'am' && hour === 12) {
      hour = 0;
    }
    
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  }
  
  return null;
}

export function extractEventData(input: string): ExtractedData {
  const data: ExtractedData = {
    socialLinks: {
      whatsapp: '',
      instagram: '',
      telegram: ''
    }
  };
  
  const lines = input.split('\n').map(line => line.trim());

  // Extract title (first non-empty line or line with event/título/title)
  data.title = lines.find(line => 
    line.length > 0 && 
    (line.toLowerCase().includes('event') || 
     line.toLowerCase().includes('título') ||
     line.toLowerCase().includes('title') ||
     !line.includes(':'))
  ) || '';

  // Extract date and time
  const dateTimeRegex = /(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4})|(\d{1,2}(?::\d{2})?(?:\s*[AaPp][Mm])?)/g;
  const timeRegex = /(\d{1,2}(?::\d{2})?(?:\s*[AaPp][Mm])?)\s*-\s*(\d{1,2}(?::\d{2})?(?:\s*[AaPp][Mm])?)/i;
  
  lines.forEach(line => {
    const lowercaseLine = line.toLowerCase();
    
    // Try to find date
    if (lowercaseLine.includes('fecha') || lowercaseLine.includes('date')) {
      const dateStr = line.split(':')[1]?.trim();
      if (dateStr) {
        const parsedDate = parseDate(dateStr);
        if (parsedDate) {
          data.date = format(parsedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
        }
      }
    }
    
    // Try to find time
    if (lowercaseLine.includes('hora') || lowercaseLine.includes('time')) {
      const timeMatch = line.match(timeRegex);
      if (timeMatch) {
        const startTime = parseTime(timeMatch[1]);
        const endTime = parseTime(timeMatch[2]);
        if (startTime) data.startTime = startTime;
        if (endTime) data.endTime = endTime;
      }
    }
  });

  // Extract location
  const locationIndicators = ['location:', 'venue:', 'place:', 'address:', 'lugar:', 'dirección:', 'ubicación:'];
  const locationLine = lines.find(line => 
    locationIndicators.some(indicator => 
      line.toLowerCase().startsWith(indicator)
    )
  );
  
  if (locationLine) {
    const [, ...locationParts] = locationLine.split(':');
    data.location = locationParts.join(':').trim();
    
    // Look for additional location notes in the next line
    const lineIndex = lines.indexOf(locationLine);
    if (lineIndex >= 0 && lineIndex + 1 < lines.length) {
      const nextLine = lines[lineIndex + 1];
      if (!locationIndicators.some(indicator => nextLine.toLowerCase().includes(indicator))) {
        data.locationNotes = nextLine;
      }
    }
  }

  // Extract description (longest paragraph that's not the title or location)
  const paragraphs = input.split('\n\n');
  const description = paragraphs
    .filter(p => p.length > 0 && p !== data.title && p !== data.location)
    .reduce((longest, current) => 
      current.length > longest.length ? current : longest
    , '');
  
  if (description) {
    data.description = description.trim();
  }

  // Extract URLs and social links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = input.match(urlRegex) || [];
  
  urls.forEach(url => {
    if (url.includes('whatsapp.com')) {
      data.socialLinks!.whatsapp = url;
    } else if (url.includes('instagram.com')) {
      data.socialLinks!.instagram = url;
    } else if (url.includes('t.me')) {
      data.socialLinks!.telegram = url;
    } else if (!data.registrationLink) {
      data.registrationLink = url;
    }
  });

  return data;
}