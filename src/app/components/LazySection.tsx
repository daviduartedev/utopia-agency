import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type LazySectionProps = {
  children: ReactNode;
  /** Altura mínima antes de montar (evita salto de layout). */
  minHeight: string;
  /** Margem extra no viewport para começar a carregar antes de entrar na tela. */
  rootMargin?: string;
  className?: string;
};

/**
 * Só monta filhos quando o bloco entra (ou está perto) do viewport —
 * combina com React.lazy para não baixar/executar JS de secções longe da dobra.
 */
export function LazySection({
  children,
  minHeight,
  rootMargin = "0px 0px 480px 0px",
  className = "",
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ minHeight: visible ? undefined : minHeight }}
    >
      {visible ? children : null}
    </div>
  );
}
