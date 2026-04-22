Context — 

Eu quero tornar meu site mais estilo webflow/framer. Com animações mais agressivas, mas o foco é performance também, então o site não pode ficar pesado/lento visivelmente para o cliete. Aplique o que for necessário para isso. Por último, quero refazer o layout da seção 'Nossos serviços' utilizando algum outro componente bem diferenciado.

Intent — 

Ao final, o site deve ficar com animações laterais e ao scrollar e interações mais agressivas no estilo um site feito em Framer. Que a seção 'Nossos Serviços' apenas reutiliize o copy dos cards, mas que refaça a seçã outilizando outro componente diferente

References — 

https://21st.dev/community/components
https://reactbits.dev/

---

## Decisões (refino — 2026-04-22)

1. **Escopo de motion:** Toda a landing, desde que a sensação continue **rápida e leve**; prioridade absoluta em não introduzir **lentidão ou “site pesado”** perceptível.
2. **Serviços (“Nossos serviços”):** Layout **livre e diferente** do padrão atual (`ScrollStack` empilhando cards); **reutilizar** título, descrição da seção e copy dos três blocos (kicker + corpo) conforme `spec/.../solution.md`.
3. **Âncora e navegação:** Manter **`#ofertas`** e links existentes (Navbar/Footer) **inalterados** — sem renomear âncora nem quebrar retrocompatibilidade.
4. **Linha vermelha de performance:** Qualquer regressão com **aumento visível de lentidão ou peso** (rolagem, interação, tempo até conteúdo útil) está fora do acordo.
5. **GradualBlur (React Bits):** Pode integrar o padrão **GradualBlur** (variante JS + CSS). O snippet de referência **não** usa `mathjs` na prática; a implementação no repo deve **evitar dependência extra** enquanto o código for equivalente ao exemplo. Se a versão publicada no React Bits passar a exigir `mathjs`, documentar no PR e reavaliar bundle.
