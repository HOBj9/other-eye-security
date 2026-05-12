import { MainLayout } from '../layouts/MainLayout';
import { HeroSection } from '../sections/home/HeroSection';
import { PlatformCapabilitiesSection } from '../sections/home/PlatformCapabilitiesSection';
import { WorkProcessSection } from '../sections/home/WorkProcessSection';
import {
  ContactCtaSection,
  FaqPreviewSection,
  FeaturesSection,
  FooterSection,
  ProductsPreviewSection,
  ServicesSection,
  StatisticsSection,
  TestimonialsSection,
  SectorsShowcaseSection,
  WhyChooseUsSection,
} from '../sections/home/HomeSectionPlaceholders';

export function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <SectorsShowcaseSection />
      <ServicesSection />
      <PlatformCapabilitiesSection />
      <FeaturesSection />
      <WhyChooseUsSection />
      <WorkProcessSection />
      <ProductsPreviewSection />
      <StatisticsSection />
      <TestimonialsSection />
      <FaqPreviewSection />
      <ContactCtaSection />
      <FooterSection />
    </MainLayout>
  );
}
