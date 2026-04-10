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
  position = {
    bottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
    right: "max(0.75rem, env(safe-area-inset-right, 0px))",
  },
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
            className="fixed bottom-[max(6.25rem,calc(env(safe-area-inset-bottom,0px)+5rem))] left-1/2 z-50 max-h-[min(85dvh,calc(100vh-2rem))] w-[min(100%,calc(100vw-1.5rem))] max-w-md -translate-x-1/2 overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:bottom-[max(10rem,calc(env(safe-area-inset-bottom,0px)+2rem))] sm:left-auto sm:right-[max(1rem,env(safe-area-inset-right,0px))] sm:translate-x-0 sm:p-8 lg:p-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="floating-consult-heading"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 sm:right-4 sm:top-4"
              aria-label="Fechar"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <line x1="10" y1="10" x2="30" y2="30" />
                <line x1="30" y1="10" x2="10" y2="30" />
              </svg>
            </button>

            <div className="space-y-5 pt-2 sm:space-y-6 sm:pt-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <h3
                  id="floating-consult-heading"
                  className="pr-10 text-2xl font-bold leading-tight text-black sm:pr-0 sm:text-3xl lg:text-4xl xl:text-5xl"
                >
                  {popupHeading}
                </h3>
                <span className="inline-flex w-fit shrink-0 rounded-full border-2 border-black px-3 py-1.5 text-xs font-medium text-black sm:px-4 sm:py-2 sm:text-sm">
                  {popupBadgeText}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg">
                {popupDescription}
              </p>

              <Button
                className="w-full rounded-full bg-page-surface px-6 py-3 text-sm font-medium text-white hover:bg-neutral-900 sm:px-8 sm:py-4 sm:text-base"
                onClick={ctaButtonAction}
              >
                {ctaButtonText}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div className="fcc-float-wrap fixed z-50" style={position}>
        <motion.div
          className="relative cursor-pointer group fcc-float-trigger"
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
              className="fcc-float-inner rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow flex items-center justify-center"
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
              ) : imageSrc ? (
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
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-lg font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(99 102 241), rgb(236 72 153))",
                  }}
                  aria-hidden
                >
                  ?
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Responsive sizing for larger screens */}
        <style>{`
          @media (max-width: 639px) {
            .fcc-float-wrap .fcc-float-trigger {
              width: min(${smButtonSize}px, 32vw) !important;
              height: min(${smButtonSize}px, 32vw) !important;
            }
            .fcc-float-wrap .fcc-float-inner {
              width: min(${smImageSize}px, 22vw) !important;
              height: min(${smImageSize}px, 22vw) !important;
            }
          }
          @media (min-width: 1024px) {
            .fcc-float-wrap .fcc-float-trigger {
              width: ${lgButtonSize}px !important;
              height: ${lgButtonSize}px !important;
            }
            .fcc-float-wrap .fcc-float-inner {
              width: ${lgImageSize}px !important;
              height: ${lgImageSize}px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
};
