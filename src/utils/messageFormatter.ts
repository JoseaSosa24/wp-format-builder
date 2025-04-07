import { EventData } from '../types';

export function formatWhatsAppMessage(data: EventData): string {
  const message = [
    `*${data.title}*`,
    '',
    data.description ? `> ${data.description}` : '',
    '',
    data.date ? `📅 Fecha: ${data.date}` : '',
    (data.startTime || data.endTime) ? `⏰ Hora: ${data.startTime}${data.endTime ? ` - ${data.endTime}` : ''}` : '',
    data.location ? `📍 Lugar: ${data.location}` : '',
    data.locationNotes ? data.locationNotes : '',
    '',
    data.registrationLink ? `🚀 Regístrate ahora: ${data.registrationLink}` : '',
    '',
    '¡COMPARTE!',
    '__',
    '➕ info como esta en:',
    data.socialLinks.whatsapp ? `* 👉 ${data.socialLinks.whatsapp} 👈` : '',
    data.socialLinks.instagram ? `* ${data.socialLinks.instagram}` : '',
    data.socialLinks.telegram ? `* ${data.socialLinks.telegram}` : '',
  ].filter(Boolean).join('\n');

  return message;
}