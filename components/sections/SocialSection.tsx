import {
  socialEyebrow,
  socialTitle,
  socialIntro,
  behanceLabel,
  instagramLabel,
  behanceThumbs,
  igThumbs,
} from '@/data/portfolio';

export default function SocialSection() {
  return (
    <section
      id="social"
      aria-labelledby="social-title"
      className="bg-[#ede5dc] px-14 py-[4.5rem] border-t border-[#d9cbbe] max-lg:px-8 max-lg:py-16 max-md:px-6 max-md:py-14 xs:px-5 xs:py-12"
    >
      {/* Header */}
      <div className="mb-10">
        <p
          className="text-[0.625rem] tracking-[0.3em] uppercase text-[#7a6e63] font-normal flex items-center gap-3 mb-3
            before:content-[''] before:w-5 before:h-px before:bg-[#7a6e63] before:inline-block"
        >
          {socialEyebrow}
        </p>
        <h2
          id="social-title"
          className="font-serif text-[2.625rem] font-light italic text-[#2b2a27] leading-[1.1]"
        >
          {socialTitle}
        </h2>
        <p className="text-[0.9375rem] text-[#7a6e63] mt-3 max-w-[500px] font-light">
          {socialIntro}
        </p>
      </div>

      {/* Platforms grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-14">

        {/* Behance */}
        <div>
          <p className="text-[0.625rem] tracking-[0.3em] uppercase text-[#7a6e63] flex items-center gap-2 mb-4">
            {behanceLabel}
          </p>
          <div
            aria-label="Behance portfolio preview"
            className="grid grid-cols-2 gap-2"
          >
            {behanceThumbs.map((item: { label?: string }, i: number) => (
              <div
                key={item.label || i}
                className="aspect-[4/3] bg-[#d9cbbe] rounded-[4px] relative overflow-hidden w-full"
              />
            ))}
          </div>
        </div>

        {/* Instagram */}
        <div>
          <p className="text-[0.625rem] tracking-[0.3em] uppercase text-[#7a6e63] flex items-center gap-2 mb-4">
            {instagramLabel}
          </p>
          <div
            aria-label="Instagram feed preview"
            className="grid grid-cols-3 gap-[0.375rem] xs:grid-cols-2 xs:gap-2"
          >
            {igThumbs.map((thumb, i) => (
              <div
                key={i}
                className="aspect-square rounded-[4px]"
                style={{ backgroundColor: thumb.bgColor }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
