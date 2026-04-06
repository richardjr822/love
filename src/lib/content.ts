export const heroContent = {
  eyebrow: 'A love letter',
  headingLine1: 'Every Moment',
  headingLine2: 'With You',
  subtitle: 'is where I want to be',
  date: 'March 23, 2023',
  city: '',
  cta: 'Click Here',
} as const;

export interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  caption: string;
  /** @deprecated Presentation metadata only. Do not render in UI. */
  date: string;
  /** @deprecated Presentation metadata only. Do not render in UI. */
  location?: string;
  isCollage: boolean;
}

// Backward-compatible shape consumed by existing gallery components.
export interface Photo extends GalleryPhoto {
  aspect: 'portrait' | 'landscape' | 'square';
  blurDataURL: string;
}

const photoBlurDataURL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjM0ExMjE5Ii8+PC9zdmc+';

export const photos: Photo[] = [
  {
    id: 1,
    src: '/photos/photo-1.jpg',
    alt: 'Sunset view at the lighthouse in SBMA',
    caption: 'Sunset sa lighthouse',
    date: 'SBMA',
    location: 'Subic Bay',
    isCollage: false,
    aspect: 'portrait',
    blurDataURL: photoBlurDataURL,
  },
  {
    id: 2,
    src: '/photos/photo-2.jpg',
    alt: 'Walking together along the road from lighthouse to Ulo ng Apo',
    caption: 'Lakad pauwi',
    date: 'SBMA',
    location: 'Subic Bay',
    isCollage: false,
    aspect: 'landscape',
    blurDataURL: photoBlurDataURL,
  },
  {
    id: 3,
    src: '/photos/photo-3.jpg',
    alt: 'Together at the lighthouse during one of our weekly gala nights',
    caption: 'Weekly routine',
    date: 'SBMA',
    location: 'Subic Bay',
    isCollage: false,
    aspect: 'square',
    blurDataURL: photoBlurDataURL,
  },
  {
    id: 4,
    src: '/photos/photo-4.jpg',
    alt: 'Rainy day at the lighthouse, sheltering together under an umbrella',
    caption: 'Umaraw o umulan',
    date: 'SBMA',
    location: 'Subic Bay',
    isCollage: false,
    aspect: 'portrait',
    blurDataURL: photoBlurDataURL,
  },
  {
    id: 5,
    src: '/photos/photo-5.jpg',
    alt: 'Before college — comfortable together in public for the first time',
    caption: 'Pa college na',
    date: 'Pre-College',
    location: 'Olongapo',
    isCollage: true,
    aspect: 'portrait',
    blurDataURL: photoBlurDataURL,
  },
  {
    id: 6,
    src: '/photos/photo-6.jpg',
    alt: 'College days, same routine — SBMA and 7/11 together',
    caption: 'Ganon pa rin',
    date: 'College',
    location: 'SBMA',
    isCollage: true,
    aspect: 'portrait',
    blurDataURL: photoBlurDataURL,
  },
  {
    id: 7,
    src: '/photos/photo-7.jpg',
    alt: 'First time visiting her place, a new chapter together',
    caption: 'Every Week',
    date: 'College',
    location: 'Olongapo',
    isCollage: true,
    aspect: 'portrait', 
    blurDataURL: photoBlurDataURL,
  },
  {
    id: 8,
    src: '/photos/photo-8.JPEG',
    alt: 'She is holding a bouquet of red roses, smiling',
    caption: 'Flowers',
    date: 'Recent',
    location: 'Olongapo',
    isCollage: false,
    aspect: 'portrait',
    blurDataURL: photoBlurDataURL,
  },
  {
    id: 9,
    src: '/photos/photo-9.jpeg',
    alt: 'Supporting him at an Mobile Legends tournament, present since day one',
    caption: 'MLBB',
    date: 'Grade 12',
    location: 'Olongapo',
    isCollage: true,
    aspect: 'portrait',
    blurDataURL: photoBlurDataURL,
  },
];

export interface StoryChapter {
  id: number;
  photo: string;
  alt: string;
  chapter: string;
  title: string;
  /** @deprecated Presentation metadata only. Do not render in UI. */
  date: string;
  /** @deprecated Presentation metadata only. Do not render in UI. */
  location?: string;
  message: string;
  messagePosition: 'left' | 'right' | 'bottom-center';
  isCollage: boolean;
}

export const storyChapters: StoryChapter[] = [
  {
    id: 1,
    photo: '/photos/photo-1.jpg',
    alt: 'Sunset view at the lighthouse in SBMA',
    chapter: 'Chapter I',
    title: 'Sunset sa Lighthouse',
    date: 'SBMA',
    location: 'Subic Bay',
    message: 'di ako mahilig lumabas, kapag kakain lang kami or may tourna ako. pero ewan mula nung nagpupunta punta na tayo sa sbma especially sa boardwalk or lighthouse parang kasama na sa routine ko, inaantay kona yung Friday palagi dahil lalabas tayo. Kahit saan, basta ikaw.',
    messagePosition: 'right',
    isCollage: false,
  },
  {
    id: 2,
    photo: '/photos/photo-2.jpg',
    alt: 'Walking together along the road from lighthouse to Ulo ng Apo',
    chapter: 'Chapter II',
    title: 'Lakad Pauwi',
    date: 'SBMA',
    location: 'Subic Bay',
    message: 'lighthouse hanggang ulo ng apo. hindi ko naramdaman yung layo, pero isa lang ang alam ko nun, ayaw kopa umuwi. yung paglalakad nalang siguro yung way para magsama pa tayo nang mas matagal. ps. wala tayong maayos na pic dati kasi di ako masyadong.',
    messagePosition: 'left',
    isCollage: false,
  },
  {
    id: 3,
    photo: '/photos/photo-3.jpg',
    alt: 'Together at the lighthouse during one of our weekly gala nights',
    chapter: 'Chapter III',
    title: 'Weekly Routine',
    date: 'SBMA',
    location: 'Subic Bay',
    message: "hindi pa tayo nakakapunta sa Bahay ng isa't-isa. ang way lang para makapagbonding tayo ay gumala. seafront, boardwalk, lighthouse, ayala. pero mas madalas tayong nasa lighthouse, bili sa 7/11 tas tambay sa lighthouse hanggang gabi.",
    messagePosition: 'bottom-center',
    isCollage: false,
  },
  {
    id: 4,
    photo: '/photos/photo-4.jpg',
    alt: 'Rainy day at the lighthouse, sheltering together under an umbrella',
    chapter: 'Chapter IV',
    title: 'Umaraw o Umulan',
    date: 'SBMA',
    location: 'Subic Bay',
    message: 'Tag-ulan na, pano na tayo makakatambay sa lighthouse? kung yung tayo ngayon, hindi na tayo tutuloy, pero yung mga mas batang tayo na favorite place yan, magpapayong nalang at aalis kapag malakas na talaga yung ulan. marami tayong naencounter jan sa lighthouse, mga creepy na tao, sobrang dilim pauwi. sobrang laking bagay sa relasyon natin ng lugar na yan.',
    messagePosition: 'right',
    isCollage: false,
  },
  {
    id: 5,
    photo: '/photos/photo-5.jpg',
    alt: 'Before college — comfortable together in public for the first time',
    chapter: 'Chapter V',
    title: 'Pa College Na',
    date: 'Pre-College',
    location: 'Olongapo',
    message: 'Komportable na sa public, hindi na kailangang mag antay ng uwian para makapag bonding. Slow start lang, hindi tayo nagbonding sa school, tanguan lang pag nagkita. pero nung bakasyon na before college nagsimula na tayong maging komportable sa public. nag aasikaso na tayo ng requirements at naghahanda na mag college. Looking back, ang saya talaga mag gala para sakin na hindi naman nalabas, thank you.',
    messagePosition: 'left',
    isCollage: true,
  },
  {
    id: 6,
    photo: '/photos/photo-6.jpg',
    alt: 'College days, same routine — SBMA and 7/11 together',
    chapter: 'Chapter VI',
    title: 'Ganon Pa Rin',
    date: 'College',
    location: 'SBMA',
    message: 'College na tayo pero ganon pa rin, SBMA pa rin ang gala, 7/11 pa rin. hindi kapa masyado nakakapunta samin. nabisita ako sainyo pero kapag susunduin lang kita, ulitin ulit natin to soon.',
    messagePosition: 'right',
    isCollage: true,
  },
  {
    id: 7,
    photo: '/photos/photo-7.jpg',
    alt: 'First time visiting her place, a new chapter together',
    chapter: 'Chapter VII',
    title: 'Pwede Na',
    date: 'College',
    location: 'Olongapo',
    message: 'Umalis na ata si ate beth sainyo nito kaya nakakapasok na ako, mas madalas na rin ang punta ko sayo kesa labas natin, dito siguro Nawala yung pagpunta natin sa lighthouse, isa sa dahilan pero madumi na rin kasi dun tsaka may mga creepy na tao na rin. prime time ata natin, prime kabado hahaha.',
    messagePosition: 'bottom-center',
    isCollage: false,
  },
  {
    id: 8,
    photo: '/photos/photo-8.JPEG',
    alt: 'She is holding a bouquet of red roses, smiling',
    chapter: 'Chapter VIII',
    title: 'Flowers',
    date: 'Recent',
    location: 'Olongapo',
    message: 'kung may pinagsisisihan ako, siguro yun yung di kita naspoil sa mga bagay na deserve mo, mahilig ka mag picture, magkape, gumala. susubukan kona rin kahiligan yang mga yan, gusto ko bumawi sayo.',
    messagePosition: 'left',
    isCollage: false,
  },
  {
    id: 9,
    photo: '/photos/photo-9.jpeg',
    alt: 'Supporting him at an Mobile Legends tournament, present since day one',
    chapter: 'Chapter IX',
    title: 'MLBB',
    date: 'Grade 12',
    location: 'Olongapo',
    message: 'para sakin, ito lang yung bagay na kaya kong gawin na walang ai. Grade 12, nagstart akong bumuo nang bumuo ng team, mag tourna. lahat yun andun kana, mula nung nagsimula ako, talo o panalo. ang pangit lang siguro sakin, kapag di ko ramdam na sure win hindi kita pinapapunta. pero Ayun thank you so much sa suporta since day one.',
    messagePosition: 'right',
    isCollage: true,
  },
];

export const closingMessage = {
  heading: 'At ang kwento ay nagpapatuloy...',
  body: 'Bawat Friday, bawat lakad, bawat ulan sa lighthouse — lahat ng yon, kasama ka. Hindi ko inasahan na magiging ganito, pero ngayon, ikaw na yung pinaka importanteng parte ng routine ko. Salamat sa lahat — sa lighthouse, sa 7/11, sa bawat lakad pauwi. Mahal kita.',
} as const;

// Backward-compatible export for existing Story page wiring.
export const storyEndMessage = closingMessage.body;

export const navLinks = [
  { href: '/gallery', label: 'Gallery' },
  { href: '/story', label: 'Our Story' },
] as const;
