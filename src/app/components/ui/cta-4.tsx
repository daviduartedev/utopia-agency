import { ArrowRight, Check } from "lucide-react";

import { Button } from "./button";
import { cn } from "./utils";

export interface Cta4Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
  sectionClassName?: string;
  /** Quando false, não exibe o ícone ArrowRight (ex.: texto já termina com →). */
  showArrowIcon?: boolean;
}

const defaultItems = [
  "Integração simples",
  "Suporte dedicado",
  "Design personalizável",
  "Performance escalável",
  "Dezenas de blocos prontos",
];

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

export function Cta4({
  title = "Chamada para ação",
  description =
    "Texto de apoio que reforça o benefício e convida o visitante ao próximo passo.",
  buttonText = "Começar agora",
  buttonUrl = "#contato",
  items = defaultItems,
  sectionClassName,
  showArrowIcon = true,
}: Cta4Props) {
  const external = isExternalUrl(buttonUrl);

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className={cn(
        "dark scroll-mt-24 py-16 md:py-24",
        sectionClassName,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="flex min-w-0 flex-col items-start justify-between gap-8 rounded-lg bg-transparent px-4 py-8 sm:px-6 sm:py-10 md:flex-row md:px-6 lg:px-20 lg:py-16">
              <div className="min-w-0 md:w-1/2">
                <h2
                  id="cta-heading"
                  className="mb-1 text-2xl font-bold text-foreground md:text-3xl"
                >
                  {title}
                </h2>
                <p className="break-words text-muted-foreground">{description}</p>
                <Button className="mt-6 gap-2" asChild>
                  <a
                    href={buttonUrl}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {buttonText}
                    {showArrowIcon ? (
                      <ArrowRight className="size-4" aria-hidden />
                    ) : null}
                  </a>
                </Button>
              </div>
              <div className="min-w-0 md:w-1/3">
                <ul className="flex flex-col space-y-2 text-sm font-medium text-foreground">
                  {items.map((item, idx) => (
                    <li className="flex items-center" key={idx}>
                      <Check
                        className="mr-4 size-4 shrink-0 text-primary"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
