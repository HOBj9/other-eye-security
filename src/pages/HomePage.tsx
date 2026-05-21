import { MainLayout } from '../layouts/MainLayout';
import { HeroSection } from '../sections/home/HeroSection';
import {
  ClientsSection,
  ContactCtaSection,
  FaqPreviewSection,
  FooterSection,
  PlatformCapabilitiesSection,
  ProductsPreviewSection,
  ProjectsSection,
  SectorsShowcaseSection,
  ServicesSection,
  WhyChooseUsSection,
} from '../sections/home/HomeSectionPlaceholders';

export function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <SectorsShowcaseSection />
      <ServicesSection />
      <PlatformCapabilitiesSection />
      <ProductsPreviewSection />
      <WhyChooseUsSection />
      <ProjectsSection />
      <FaqPreviewSection />
      <ClientsSection />
      <ContactCtaSection />
      <FooterSection />
    </MainLayout>
  );
}
