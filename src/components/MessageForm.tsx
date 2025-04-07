import React from 'react';
import { Calendar, Clock, MapPin, Link as LinkIcon, Share2 } from 'lucide-react';
import { EventData } from '../types';

interface MessageFormProps {
  eventData: EventData;
  setEventData: React.Dispatch<React.SetStateAction<EventData>>;
}

const MessageForm: React.FC<MessageFormProps> = ({ eventData, setEventData }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    subfield?: string
  ) => {
    if (subfield) {
      setEventData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [subfield]: e.target.value
        }
      }));
    } else {
      setEventData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Detalles del Evento</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título del Evento
          </label>
          <input
            type="text"
            value={eventData.title}
            onChange={(e) => handleChange(e, 'title')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Añade título (con emojis si deseas)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            value={eventData.description}
            onChange={(e) => handleChange(e, 'description')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows={3}
            placeholder="Descripción breve del evento"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="inline h-4 w-4 mr-1" />
              Fecha
            </label>
            <input
              type="date"
              value={eventData.date}
              onChange={(e) => handleChange(e, 'date')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <Clock className="inline h-4 w-4 mr-1" />
              Horario
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="time"
                value={eventData.startTime}
                onChange={(e) => handleChange(e, 'startTime')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Hora inicio"
              />
              <input
                type="time"
                value={eventData.endTime}
                onChange={(e) => handleChange(e, 'endTime')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Hora fin"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="inline h-4 w-4 mr-1" />
            Ubicación
          </label>
          <input
            type="text"
            value={eventData.location}
            onChange={(e) => handleChange(e, 'location')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Nombre del lugar, dirección completa"
          />
          <input
            type="text"
            value={eventData.locationNotes}
            onChange={(e) => handleChange(e, 'locationNotes')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Información adicional (ej: parqueadero)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <LinkIcon className="inline h-4 w-4 mr-1" />
            Link de Registro
          </label>
          <input
            type="url"
            value={eventData.registrationLink}
            onChange={(e) => handleChange(e, 'registrationLink')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Share2 className="inline h-4 w-4 mr-1" />
            Redes Sociales
          </label>
          <div className="space-y-2">
            <input
              type="url"
              value={eventData.socialLinks.whatsapp}
              onChange={(e) => handleChange(e, 'socialLinks', 'whatsapp')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Canal de WhatsApp"
            />
            <input
              type="url"
              value={eventData.socialLinks.instagram}
              onChange={(e) => handleChange(e, 'socialLinks', 'instagram')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Perfil de Instagram"
            />
            <input
              type="url"
              value={eventData.socialLinks.telegram}
              onChange={(e) => handleChange(e, 'socialLinks', 'telegram')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Grupo de Telegram"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;