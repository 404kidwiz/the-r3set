// @builder: Main page - Server Component by default (nextjs-best-practices line 23)
import dynamic from 'next/dynamic';
import NavAutoHide from '@/components/NavAutoHide';
import ClipChapter from '@/components/ClipChapter';
import AlbumReveal from '@/components/AlbumReveal';
import CartDrawer from '@/components/CartDrawer';
import Tag from '@/components/Tag';

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
const discographyItems = discographyData.map((item: any) => ({
  id: item.id,
  title: item.title,
  year: parseInt(item.year),
  role: item.role as 'Artist' | 'Producer' | 'Mixtape' | 'Single',
  category: (item.category.charAt(0).toUpperCase() + item.category.slice(1) + 's') as 'Albums' | 'Mixtapes' | 'Singles' | 'Production',
  artwork: item.artwork,
  links: item.links,
}));

const merchProducts = merchData.map((item: any) => ({
  id: item.id,
  title: item.name,
  price: item.price,
  image: item.image,
  tags: item.tags?.map((t: string) => t.toLowerCase() as 'drop' | 'limited' | 'vault'),
  variants: {
    sizes: item.variants?.filter((v: any) => v.size).map((v: any) => v.size),
    colors: item.variants?.filter((v: any) => v.variant).map((v: any) => v.variant),
  },
  inStock: item.variants?.some((v: any) => v.inStock) ?? true,
}));

// Transform video data to match VideoItem interface
const videoItems = videosData.map((item: any) => ({
  id: item.id,
  title: item.title,
  thumbnail: item.poster, // poster is the thumbnail
  videoSrc: item.src,      // src is the video source
  category: item.category as 'Trailer' | 'Music Videos' | 'BTS',
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
        {/* Chapter 1: Hero */}
        <ClipChapter
          clipSrc="/clips/clip01.mp4"
          posterSrc="/posters/clip01.jpg"
          chapterLabel="Chapter I"
          clipNumber={1}
          priority={true}
        />

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
                <a href="/legal/privacy" className="text-sm text-muted hover:text-fg transition-colors">Privacy</a>
                <a href="/legal/terms" className="text-sm text-muted hover:text-fg transition-colors">Terms</a>
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
