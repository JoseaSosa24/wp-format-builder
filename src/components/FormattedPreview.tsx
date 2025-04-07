import React from 'react';
import { Copy, Share2 } from 'lucide-react';
import { EventData } from '../types';
import { formatWhatsAppMessage } from '../utils/messageFormatter';
import toast from 'react-hot-toast';

interface FormattedPreviewProps {
  eventData: EventData;
  onShare: () => void;
}

const FormattedPreview: React.FC<FormattedPreviewProps> = ({ eventData, onShare }) => {
  const formattedMessage = formatWhatsAppMessage(eventData);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      toast.success('¡Mensaje copiado al portapapeles!');
    } catch (err) {
      toast.error('Error al copiar el mensaje');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Vista Previa</h2>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Copy className="h-4 w-4" />
            <span>Copiar</span>
          </button>
          <button
            onClick={onShare}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span>Compartir</span>
          </button>
        </div>
      </div>

      <div className="font-mono whitespace-pre-wrap break-words bg-gray-50 p-4 rounded-lg">
        {formattedMessage}
      </div>
    </div>
  );
};

export default FormattedPreview;