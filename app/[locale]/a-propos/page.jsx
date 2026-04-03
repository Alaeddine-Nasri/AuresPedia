import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import Breadcrumb from '@/components/Breadcrumb'
import FadingImage from '@/components/FadingImage'
import TeamGrid from '@/components/TeamGrid'
import ContactForm from '@/components/ContactForm'
import { getTeamMembers } from '@/lib/sanity'

export async function generateMetadata({ params: { locale } }) {
  const isAr = locale === 'ar'
  return {
    title: isAr ? 'من نحن' : 'À propos',
    description: isAr
      ? 'تعرّف على فريق وتاريخ أوريسبيديا، الموقع البيداغوجي لجامعة باتنة 2.'
      : "Découvrez l'équipe et l'histoire d'AuresPédia, site pédiatrique de l'Université de Batna 2.",
    openGraph: {
      title: isAr ? 'من نحن | أوريسبيديا' : 'À propos | AuresPédia',
    },
  }
}

export default async function AboutPage({ params: { locale } }) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'about' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const teamMembers = await getTeamMembers(locale)

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 space-y-6">

        {/* ── Hero Card ── */}
        <div className="w-[88%] mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch">

            {/* Text — includes breadcrumb */}
            <div className="flex-1 p-8 md:p-10 2xl:p-20 flex flex-col justify-center gap-5">
              <Breadcrumb
                items={[
                  { label: tc('home'), href: `/${locale}` },
                  { label: t('breadcrumb') },
                ]}
              />
              <h1 className="text-5xl md:text-6xl 2xl:text-7xl font-bold leading-tight">
                <span className="text-primary">{t('heroTitle')}</span>
                <br />
                <span className="text-dark">{t('heroTitleBold')}</span>
              </h1>
              <p className="text-gray-500 text-[0.9375rem] 2xl:text-lg leading-relaxed text-justify">
                {locale === 'ar'
                  ? 'أوريسبيديا هي المنصة الطبية لقسم طب الأطفال بجامعة باتنة 2. تجمع بين الخبرة الأكاديمية والالتزام بصحة الطفل لتقديم موارد موثوقة وأنشطة تكوينية للمختصين والعائلات الجزائرية.'
                  : "AuresPédia est la plateforme médicale du département de pédiatrie de l'Université de Batna 2. Elle réunit expertise académique et engagement pour la santé de l'enfant, afin d'offrir des ressources fiables et des activités de formation aux professionnels et aux familles algériennes."}
              </p>
            </div>

            {/* Image — full card height */}
            <div className="w-full md:w-[52%] flex-shrink-0 min-h-[360px] md:min-h-[420px] 2xl:min-h-[620px] relative">
              <Image
                src="/images/team-hero.jpg"
                alt="Équipe AuresPédia"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 52vw"
              />
            </div>
          </div>
        </div>

        {/* ── Quote ── */}
        <div className="w-[88%] mx-auto py-4 text-center space-y-1">
          <p className="text-3xl 2xl:text-4xl font-bold text-dark leading-snug">
            🌿 {locale === 'ar' ? 'من خلال تاريخنا وقيمنا،' : 'À travers notre histoire et nos valeurs,'}
          </p>
          <p className="text-3xl 2xl:text-4xl font-bold text-primary leading-snug">
            {locale === 'ar'
              ? 'نضع صحة الطفل ورفاهيته في صميم كل أعمالنا.'
              : 'nous mettons la santé et le bien-être des enfants au cœur de toutes nos actions.'}
          </p>
        </div>

        {/* ── Histoire Card ── */}
        <div className="w-[88%] mx-auto bg-white rounded-2xl shadow-sm p-10 md:p-12 2xl:p-20">
          <Breadcrumb
            items={[
              { label: tc('home'), href: `/${locale}` },
              { label: t('breadcrumb'), href: `/${locale}/a-propos` },
              { label: t('historyBreadcrumb') },
            ]}
          />

          <div className="flex flex-col md:flex-row gap-12 mt-8">

            {/* ── Left column ── */}
            <div className="flex-1 flex flex-col gap-6">

              {/* Row: small image + title */}
              <div className="flex items-start gap-5">
                <div className="relative w-52 h-52 2xl:w-64 2xl:h-64 flex-shrink-0 rounded-xl overflow-hidden bg-neutral">
                  <Image
                    src="/images/history-building.jpg"
                    alt="Faculté de Médecine – Université Batna 2"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 208px, 256px"
                  />
                </div>
                <h2 className="flex-1 text-3xl md:text-4xl 2xl:text-5xl font-bold leading-tight text-dark">
                  {t('historyTitle')}{' '}
                  <span className="text-primary">{t('historyTitleHighlight')}</span>{' '}
                  {t('historyTitleEnd')}
                </h2>
              </div>

              {/* Text below */}
              <p className="text-gray-500 text-[0.9375rem] 2xl:text-lg leading-relaxed text-justify">
                {locale === 'ar'
                  ? 'تأسّس قسم طب الأطفال بجامعة باتنة 2 في إطار مسعى أكاديمي طموح يهدف إلى تكوين أطباء متخصصين وتقديم رعاية صحية متميزة للطفل في منطقة الأوراس. وقد شهد القسم على مر السنين نموًا ملحوظًا في عدد أعضاء هيئة التدريس والبنية التحتية. يضم القسم اليوم فريقاً متعدد التخصصات من أطباء وأخصائيين يعملون بتنسيق وثيق مع المستشفى الجامعي لباتنة.'
                  : "Le département de pédiatrie de l'Université de Batna 2 a été fondé dans le cadre d'une ambition académique forte : former des médecins spécialisés et offrir des soins de qualité à l'enfant dans la région des Aurès. Au fil des années, il a connu une croissance remarquable en termes d'enseignants, d'infrastructures et d'impact sur la santé pédiatrique régionale."}
              </p>
            </div>

            {/* ── Right column ── */}
            <div className="flex-1 flex flex-col gap-6">

              {/* Text at top */}
              <p className="text-gray-500 text-[0.9375rem] 2xl:text-lg leading-relaxed text-justify">
                {locale === 'ar'
                  ? 'تعتمد المنصة على المحتوى العلمي المُحكَّم الصادر عن فريق أوريسبيديا، وتوفر معلومات موثوقة حول التطعيم والتغذية والتطور الحركي والأمراض الشائعة عند الأطفال — بلغتين: العربية والفرنسية.'
                  : "La plateforme s'appuie sur un contenu scientifique validé par l'équipe d'AuresPédia, offrant des informations fiables sur la vaccination, la nutrition, le développement moteur et les maladies courantes chez l'enfant — en français et en arabe."}
              </p>

              {/* Row: text + fading image */}
              <div className="flex items-start gap-5">
                <p className="flex-1 text-gray-500 text-[0.9375rem] 2xl:text-lg leading-relaxed text-justify">
                  {locale === 'ar'
                    ? 'نسعى من خلال أوريسبيديا إلى بناء جسر بين المعرفة الطبية الأكاديمية والعائلة الجزائرية، مع الحفاظ على الهوية المحلية والبيئة الثقافية لمنطقة الأوراس. هدفنا أن تكون الموارد الطبية الموثوقة في متناول الجميع.'
                    : "À travers AuresPédia, nous cherchons à construire un pont entre la connaissance médicale académique et la famille algérienne, tout en préservant l'identité locale et le contexte culturel de la région des Aurès. Notre ambition est de rendre les ressources médicales fiables accessibles à tous."}
                </p>
                <div className="relative w-56 h-48 2xl:w-64 2xl:h-56 flex-shrink-0 rounded-xl overflow-hidden bg-neutral">
                  <FadingImage
                    images={['/images/history-lecture.jpg', '/images/history-library.jpg']}
                    alt="Activités pédagogiques"
                    sizes="(max-width: 768px) 224px, 256px"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Team Card ── */}
        <div className="w-[88%] mx-auto bg-white rounded-2xl shadow-sm p-10 md:p-14">
          <Breadcrumb
            items={[
              { label: tc('home'), href: `/${locale}` },
              { label: t('breadcrumb'), href: `/${locale}/a-propos` },
              { label: t('teamBreadcrumb') },
            ]}
          />

          <h2 className="text-4xl font-bold text-primary mt-4">
            {t('teamTitle')}
          </h2>
          <h3 className="text-4xl font-bold text-dark">
            {t('teamTitleEnd')}
          </h3>

          <TeamGrid
            members={teamMembers.length > 0 ? teamMembers : [
              { _id: 'p1', name: 'Dr. HAMIDI Brahim', jobTitle: 'Associate Professor Pediatrics', university: 'Faculty of Medicine Batna 2 University', location: 'Batna, Algérie' },
              { _id: 'p2', name: 'Prof. Nom Prénom', jobTitle: 'Associate Professor Pediatrics', university: 'Faculty of Medicine Batna 2 University', location: 'Batna, Algérie' },
              { _id: 'p3', name: 'Prof. Nom Prénom', jobTitle: 'Associate Professor Pediatrics', university: 'Faculty of Medicine Batna 2 University', location: 'Batna, Algérie' },
            ]}
            btnLabel={t('teamMore')}
          />
        </div>

        <div className="pb-4">
          <ContactForm />
        </div>

      </div>
    </div>
  )
}
