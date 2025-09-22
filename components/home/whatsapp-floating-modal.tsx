'use client';

import { useState } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import LogoIcon from '@/components/icons/logo';

interface WhatsAppFloatingModalProps {
  whatsapp?: string;
  message?: string;
}
export default function WhatsAppFloatingModal({ 
  whatsapp, 
  message = "¡Hola! Estoy interesado en sus productos. ¿Pueden ayudarme?" 
}: WhatsAppFloatingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);

  const handleOpenWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${whatsapp}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setHasResponded(true);
    setIsOpen(false);
  };

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasResponded(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={handleToggleModal}
          className="bg-white hover:bg-gray-100 text-black rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-300"
          aria-label="Abrir chat de WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1">
                <LogoIcon className="w-full h-full text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Soporte WhatsApp</h3>
                <p className="text-xs opacity-90">En línea ahora</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-gray-800 rounded-full p-1 transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="p-4 bg-gray-50 min-h-[200px] flex flex-col">
            {/* Incoming Message */}
            <div className="flex items-start space-x-2 mb-4">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 p-1">
                <LogoIcon className="w-full h-full text-white" />
              </div>
              <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[70%]">
                <p className="text-sm text-gray-800">
                  ¡Hola! 👋 Bienvenido a nuestra tienda. ¿En qué puedo ayudarte hoy?
                </p>
                <span className="text-xs text-gray-500 mt-1 block">Ahora mismo</span>
              </div>
            </div>

            {/* Response Options */}
            <div className="mt-auto">
              {!hasResponded ? (
                <div className="space-y-2">
                  <p className="text-xs text-gray-600 mb-2">Respuestas rápidas:</p>
                  <button
                    onClick={handleOpenWhatsApp}
                    className="w-full bg-black hover:bg-gray-800 text-white rounded-lg p-3 text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Continuar en WhatsApp</span>
                  </button>
                  <button
                    onClick={handleOpenWhatsApp}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-2 text-sm transition-colors"
                  >
                    Necesito información de productos
                  </button>
                  <button
                    onClick={handleOpenWhatsApp}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-2 text-sm transition-colors"
                  >
                    Tengo una pregunta sobre mi pedido
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-black mb-2">
                    <MessageCircle className="w-8 h-8 mx-auto" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Redirigiendo a WhatsApp...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </>
  );
}