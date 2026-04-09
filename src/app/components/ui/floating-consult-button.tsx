import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";

interface FloatingConsultButtonProps {
  // Button appearance
  buttonSize?: number;
  imageSize?: number;
  imageSrc?: string;
  imageAlt?: string;
  /** Quando fornecido, renderiza este nó no centro em vez da imagem. */
  centerContent?: React.ReactNode;

  // Revolving text
  revolvingText?: string;
  revolvingSpeed?: number;

  // Popup content
  popupHeading?: string;
  popupDescription?: string;
  popupBadgeText?: string;
  ctaButtonText?: string;
  ctaButtonAction?: () => void;

  // Positioning
  position?: {
    bottom?: string;
    right?: string;
    left?: string;
    top?: string;
  };
}

export const FloatingConsultButton = ({
  buttonSize,
  imageSize,
  imageSrc,
  imageAlt = "Mascote",
  centerContent,
  revolvingText = "CONSULTA GRÁTIS — FALE CONOSCO — ",
  revolvingSpeed = 10,
  popupHeading = "Chamada rápida",
  popupDescription =
    "Uma conversa breve e sem custo com a nossa equipe para entender seu projeto e ver se faz sentido trabalharmos juntos.",
  popupBadgeText = "Grátis",
  ctaButtonText = "Agendar chamada",
  ctaButtonAction = () => console.log("CTA clicked"),
  position = { bottom: "2rem", right: "2rem" },
}: FloatingConsultButtonProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [imageSrc]);

  const hasMascot = !!centerContent;

  // Responsive sizes with defaults
  const lgButtonSize = buttonSize || 160;
  const smButtonSize = buttonSize ? buttonSize * 0.8 : 128;
  const lgImageSize = imageSize || 96;
  const smImageSize = imageSize ? imageSize * 0.833 : 80;

  return (
    <>
      {/* Backdrop with Blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-page-surface/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-48 right-8 z-50 bg-white rounded-3xl shadow-2xl p-8 lg:p-10 max-w-md w-[calc(100vw-4rem)]"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 -right-2 text-white hover:text-gray-300 transition-colors"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="10" y1="10" x2="30" y2="30" />
                <line x1="30" y1="10" x2="10" y2="30" />
              </svg>
            </button>

            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <h3 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                  {popupHeading}
                </h3>
                <span className="text-black px-4 py-2 border-2 border-black rounded-full text-sm font-medium">
                  {popupBadgeText}
                </span>
              </div>

              {/* Description */}
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                {popupDescription}
              </p>

              {/* CTA Button */}
              <Button 
                className="w-full rounded-full bg-page-surface px-8 py-4 text-base font-medium text-white hover:bg-neutral-900"
                onClick={ctaButtonAction}
              >
                {ctaButtonText}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div 
        className="fixed z-50"
        style={position}
      >
        <motion.div
          className="relative cursor-pointer group"
          style={{
            width: `${smButtonSize}px`,
            height: `${smButtonSize}px`,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Rotating Text */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: revolvingSpeed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>
              <text className="text-[20.4px] fill-gray-600 font-medium uppercase tracking-wider">
                <textPath href="#circlePath" startOffset="0%">
                  {revolvingText}
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Center Image/Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow flex items-center justify-center"
              style={{
                width: `${smImageSize}px`,
                height: `${smImageSize}px`,
                background: hasMascot ? "transparent" : "#18181b",
              }}
            >
              {hasMascot ? (
                <div className="flex h-full w-full items-center justify-center">
                  {centerContent}
                </div>
              ) : imageFailed ? (
                <div
                  className="flex h-full w-full items-center justify-center text-lg font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, rgb(99 102 241), rgb(236 72 153))",
                  }}
                  aria-hidden
                >
                  ?
                </div>
              ) : (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  width={256}
                  height={256}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                  onError={() => setImageFailed(true)}
                />
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Responsive sizing for larger screens */}
        <style>{`
          @media (min-width: 1024px) {
            .relative.cursor-pointer.group {
              width: ${lgButtonSize}px !important;
              height: ${lgButtonSize}px !important;
            }
            .relative.cursor-pointer.group .rounded-full.overflow-hidden {
              width: ${lgImageSize}px !important;
              height: ${lgImageSize}px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
};
