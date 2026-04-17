"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useIsNarrowMobile } from "../../lib/use-media-query";

interface FloatingConsultButtonProps {
  buttonSize?: number;
  imageSize?: number;
  imageSrc?: string;
  imageAlt?: string;
  centerContent?: React.ReactNode;
  revolvingText?: string;
  revolvingSpeed?: number;
  /** Um toque abre o WhatsApp direto (sem modal). */
  ctaButtonAction?: () => void;
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
  ctaButtonAction = () => {},
  position = {
    bottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
    right: "max(0.75rem, env(safe-area-inset-right, 0px))",
  },
}: FloatingConsultButtonProps): React.ReactElement => {
  const narrowMobile = useIsNarrowMobile();
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [imageSrc]);

  const hasMascot = !!centerContent;

  const lgButtonSize = buttonSize || 160;
  const smButtonSize = buttonSize ? buttonSize * 0.8 : 128;
  const lgImageSize = imageSize || 96;
  const smImageSize = imageSize ? imageSize * 0.833 : 80;

  const core = (
    <>
      {!narrowMobile ? (
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: revolvingSpeed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <text className="fill-gray-600 text-[20.4px] font-medium uppercase tracking-wider">
              <textPath href="#circlePath" startOffset="0%">
                {revolvingText}
              </textPath>
            </text>
          </svg>
        </motion.div>
      ) : null}

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="fcc-float-inner flex items-center justify-center overflow-hidden rounded-full shadow-lg transition-shadow group-hover:shadow-xl"
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
                background:
                  "linear-gradient(135deg, rgb(99 102 241), rgb(236 72 153))",
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
    </>
  );

  return (
    <div className="fcc-float-wrap fixed z-50" style={position}>
      {narrowMobile ? (
        <button
          type="button"
          className="fcc-float-trigger group relative cursor-pointer touch-manipulation rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-page-surface"
          style={{
            width: `${smButtonSize}px`,
            height: `${smButtonSize}px`,
          }}
          aria-label="Falar no WhatsApp"
          onClick={() => ctaButtonAction()}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="fcc-float-inner flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-zinc-900 shadow-lg"
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
                    background:
                      "linear-gradient(135deg, rgb(99 102 241), rgb(236 72 153))",
                  }}
                  aria-hidden
                >
                  ?
                </div>
              ) : imageSrc ? (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  width={160}
                  height={160}
                  decoding="async"
                  loading="lazy"
                  fetchPriority="low"
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
        </button>
      ) : (
        <motion.button
          type="button"
          className="fcc-float-trigger group relative cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-page-surface"
          style={{
            width: `${smButtonSize}px`,
            height: `${smButtonSize}px`,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          aria-label="Falar no WhatsApp"
          onClick={() => ctaButtonAction()}
        >
          {core}
        </motion.button>
      )}

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
  );
};
