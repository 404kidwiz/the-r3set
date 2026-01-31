import dynamic from 'next/dynamic';
import Link from 'next/link';
import NavAutoHide from '@/components/NavAutoHide';
import ClipChapter from '@/components/ClipChapter';
import AlbumReveal from '@/components/AlbumReveal';
import CartDrawer from '@/components/CartDrawer';
import Tag from '@/components/Tag';
import HeroCta from '@/components/HeroCta';

// Lazy load below-fold components
const DiscographyGrid = dynamic(() => import('@/components/DiscographyGrid'), {
  loading: () => <div className="h-96 animate-pulse bg-surface/50 rounded-sm" />
});
const MediaGallery = dynamic(() => import('@/components/MediaGallery'));
const BioSection = dynamic(() => import('@/components/BioSection'));
const MerchGrid = dynamic(() => import('@/components/MerchGrid'), {
  loading: () => <div className="h-96 animate-pulse bg-surface/50 rounded-sm" />
});

// Load content data
import discographyData from '@/content/discography.json';
import photosData from '@/content/photos.json';
import videosData from '@/content/videos.json';
import merchData from '@/content/merch.json';

// Metadata for SEO with structured data
export const metadata = {
  title: 'THE R3SET - Mike Will Made-It',
  description: 'Experience the new album THE R3SET by Mike Will Made-It. Premium multimedia album rollout with exclusive content, merch, and more.',
  openGraph: {
    title: 'THE R3SET - Mike Will Made-It',
    description: 'Experience the new album THE R3SET',
    images: ['/og-image.jpg'],
  },
};

// Transform data to match component interfaces
const discographyItems = discographyData.map((item: { id: string; title: string; year: string; role: string; category: string; artwork: string; links?: { spotify?: string; apple?: string; youtube?: string } }) => ({
  id: item.id,
  title: item.title,
  year: parseInt(item.year),
  role: item.role as 'Artist' | 'Producer' | 'Mixtape' | 'Single',
  category: (item.category.charAt(0).toUpperCase() + item.category.slice(1) + 's') as 'Albums' | 'Mixtapes' | 'Singles' | 'Production',
  artwork: item.artwork,
  links: item.links,
}));

const merchProducts = merchData.map((item: { id: string; name: string; price: number; image: string; tags: string[]; variants: { size?: string; variant?: string; inStock?: boolean }[] }) => ({
  id: item.id,
  title: item.name,
  price: item.price,
  image: item.image,
  tags: item.tags?.map((t: string) => t.toLowerCase() as 'drop' | 'limited' | 'vault'),
  variants: {
    sizes: item.variants?.filter((v: { size?: string }) => !!v.size).map((v) => v.size as string) || [],
    colors: item.variants?.filter((v: { variant?: string }) => !!v.variant).map((v) => v.variant as string) || [],
  },
  inStock: item.variants?.some((v: { inStock?: boolean }) => v.inStock) ?? true,
}));

// Transform video data to match VideoItem interface
const videoItems = (videosData as { id: string; title: string; poster: string; src: string; category: string; type?: string }[]).map((item) => ({
  id: item.id,
  title: item.title,
  thumbnail: item.poster, // poster is the thumbnail
  videoSrc: item.src,      // src is the video source
  category: item.category as 'Trailer' | 'Music Videos' | 'BTS' | 'Produced By',
  type: (item.type || 'file') as 'file' | 'youtube',
}));

const bioData = {
  portrait: '/images/bio/portrait.jpg',
  story: [
    'Mike Will Made-It is a Grammy-nominated producer and artist who has shaped the sound of modern hip-hop and pop music. With production credits on countless chart-topping hits, he\'s known for his signature tag "Mike WiLL Made-It" and his ability to create infectious beats that define eras.',
    'From producing Miley Cyrus\'s "We Can\'t Stop" to Rae Sremmurd\'s "Black Beatles," Mike Will has consistently pushed creative boundaries while maintaining commercial appeal. His work has earned him multiple platinum certifications and collaborations with the biggest names in music.',
  ],
  milestones: [
    { year: 2013, title: 'Produced "We Can\'t Stop" - Miley Cyrus' },
    { year: 2016, title: '"Black Beatles" reaches #1 on Billboard Hot 100' },
    { year: 2017, title: 'Released "Ransom 2" mixtape' },
    { year: 2018, title: 'Executive produced SR3MM with Rae Sremmurd' },
    { year: 2023, title: 'Grammy nominations for production work' },
  ],
  socials: {
    instagram: 'https://instagram.com/mikewillmadeit',
    twitter: 'https://twitter.com/mikewillmadeit',
    spotify: 'https://open.spotify.com/artist/...',
    youtube: 'https://youtube.com/@mikewillmadeit',
  },
};

export default function HomePage() {
  return (
    <>
      <NavAutoHide />
      <CartDrawer />

      <main id="main-content">
        {/* Chapter 1: Hero with CTA overlay */}
        <div className="relative">
          <ClipChapter
            clipSrc="/clips/clip01.mp4"
            posterSrc="/posters/clip01.jpg"
            chapterLabel="Chapter I"
            clipNumber={1}
            priority={true}
          />
          {/* Hero CTA Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '50vh' }}>
            <div className="text-center pointer-events-auto">
              <h1 className="text-display-xl font-display mb-4">THE R3SET</h1>
              <p className="text-muted mb-8">A new album by Mike Will Made-It</p>
              <HeroCta trailerSrc="/clips/clip01.mp4" />
            </div>
          </div>
        </div>

        {/* Album Cover Reveal */}
        <AlbumReveal />

        {/* Chapter 2 */}
        <ClipChapter
          clipSrc="/clips/clip02.mp4"
          posterSrc="/posters/clip02.jpg"
          chapterLabel="Chapter II"
          clipNumber={2}
        />

        {/* Discography Section */}
        <section id="discography" className="section-spacing bg-surface">
          <div className="section-container">
            <h2 className="text-display-l font-display mb-12 text-center">Discography</h2>
            <DiscographyGrid items={discographyItems} />
          </div>
        </section>

        {/* Chapter 3 */}
        <ClipChapter
          clipSrc="/clips/clip03.mp4"
          posterSrc="/posters/clip03.jpg"
          chapterLabel="Chapter III"
          clipNumber={3}
        />

        {/* Media Section */}
        <section id="media" className="section-spacing">
          <div className="section-container">
            <h2 className="text-display-l font-display mb-12 text-center">Media</h2>
            <MediaGallery photos={photosData} videos={videoItems} />
          </div>
        </section>

        {/* Chapter 4 */}
        <ClipChapter
          clipSrc="/clips/clip04.mp4"
          posterSrc="/posters/clip04.jpg"
          chapterLabel="Chapter IV"
          clipNumber={4}
        />

        {/* Merch Section - Drop Mode */}
        <section id="merch" className="section-spacing bg-surface">
          <div className="section-container">
            <div className="text-center mb-12">
              <Tag variant="drop" className="mb-4">NEW DROP</Tag>
              <h2 className="text-display-l font-display">Official Merch</h2>
            </div>
            <MerchGrid products={merchProducts} />
          </div>
        </section>

        {/* Chapter 5 */}
        <ClipChapter
          clipSrc="/clips/clip05.mp4"
          posterSrc="/posters/clip05.jpg"
          chapterLabel="Chapter V"
          clipNumber={5}
        />

        {/* Bio Section */}
        <section id="bio" className="section-spacing">
          <div className="section-container">
            <BioSection {...bioData} />
          </div>
        </section>

        {/* Chapter 6 */}
        <ClipChapter
          clipSrc="/clips/clip06.mp4"
          posterSrc="/posters/clip06.jpg"
          chapterLabel="Chapter VI"
          clipNumber={6}
        />

        {/* Footer */}
        <footer className="section-spacing bg-surface border-t border-stroke">
          <div className="section-container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-sm text-muted">© 2026 Mike Will Made-It. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/legal/privacy" className="text-sm text-muted hover:text-fg transition-colors">Privacy</Link>
                <Link href="/legal/terms" className="text-sm text-muted hover:text-fg transition-colors">Terms</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MusicAlbum',
            name: 'THE R3SET',
            byArtist: {
              '@type': 'Person',
              name: 'Mike Will Made-It',
            },
          }),
        }}
      />
    </>
  );
}
