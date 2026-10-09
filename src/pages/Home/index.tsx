import { useEffect } from 'react';
import { MinimalNav } from '@/components/MinimalNav';
import { MinimalHero } from '@/components/MinimalHero';
import { SparkIntro } from '@/components/SparkIntro';
import { MinimalEcosystem } from '@/components/MinimalEcosystem';
import { SparkManifesto } from '@/components/SparkManifesto';
import { MinimalWorks } from '@/components/MinimalWorks';
import { MinimalArtists } from '@/components/MinimalArtists';
import { SparkJournal } from '@/components/SparkJournal';
import { MinimalContact } from '@/components/MinimalContact';
import { MinimalFooter } from '@/components/MinimalFooter';
import { useLanguage } from '@/lib/LanguageContext';

export default function HomePage() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = lang === 'vi'
      ? 'Spark Entertainment — Contemporary Music House'
      : 'Spark Entertainment — Contemporary Music House';
  }, [lang]);

  return (
    <div className="bg-[#FFFFFF] text-[#0A0A0A] min-h-screen relative selection:bg-[#7C3AED]/20 selection:text-[#0A0A0A] overflow-x-hidden">
      {/* Precision Editorial Header with brand crest and bilingual navigation */}
      <MinimalNav />

      {/* 01 HERO: Bilingual opening sequence */}
      <MinimalHero />

      {/* 02 SPARK INTRODUCTION */}
      <SparkIntro />

      {/* 03 THE SPARK ECOSYSTEM: Studio · Academy · Label */}
      <MinimalEcosystem />

      {/* 04 CULTURE / MANIFESTO */}
      <SparkManifesto />

      {/* 05 SELECTED WORKS */}
      <MinimalWorks />

      {/* 06 ARTISTS */}
      <MinimalArtists />

      {/* 07 JOURNAL */}
      <SparkJournal />

      {/* 08 FINAL CTA */}
      <MinimalContact />

      {/* 09 FOOTER */}
      <MinimalFooter />
    </div>
  );
}
