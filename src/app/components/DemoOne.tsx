import { FloatingConsultButton } from "./ui/floating-consult-button";

export default function DemoOne() {
  return (
    <FloatingConsultButton
      buttonSize={200}
      imageSize={120}
      imageSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop"
      revolvingText="GET IN TOUCH - LET'S TALK - FREE CONSULT - "
      revolvingSpeed={8}
      popupHeading="Schedule a Call"
      popupDescription="Discuss your project with our team"
      ctaButtonText="Book Now"
      ctaButtonAction={() => window.location.href = '/booking'}
    />
  );
}
