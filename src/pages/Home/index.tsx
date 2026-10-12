import { useEffect } from 'react';
import { MinimalNav } from '@/components/MinimalNav';
import { MinimalHero } from '@/components/MinimalHero';
import { SparkIntro } from '@/components/SparkIntro';
import { MinimalEcosystem } from '@/components/MinimalEcosystem';
import { SparkManifesto } from '@/components/SparkManifesto';
// import { MinimalWorks } from '@/components/MinimalWorks';
import { MinimalArtists } from '@/components/MinimalArtists';
// import { SparkJournal } from '@/components/SparkJournal';
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

      {/* CULTURE / MANIFESTO — unnumbered supporting section */}
      <SparkManifesto />

      {/* SELECTED WORKS — temporarily hidden until project information is complete. */}
      {/* <MinimalWorks /> */}

      {/* 04 ARTISTS */}
      <MinimalArtists />

      {/* JOURNAL — temporarily hidden; uncomment to restore. */}
      {/* <SparkJournal /> */}

      {/* 05 FINAL CTA */}
      <MinimalContact />

      {/* FOOTER */}
      <MinimalFooter />
    </div>
  );
}
