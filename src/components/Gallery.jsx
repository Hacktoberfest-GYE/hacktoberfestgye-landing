import { useEffect } from "react";
import "photoswipe/style.css";

const images = [
  { src: "/images/portfolio/image_y.jpeg", title: "Imagen 1" },
  { src: "/images/portfolio/image_g.jpeg", title: "Imagen 2" },
  { src: "/images/portfolio/image_e.jpeg", title: "Imagen 3" },
  { src: "/images/portfolio/image_d.jpeg", title: "Imagen 4" },
  { src: "/images/portfolio/image_x.jpeg", title: "Imagen 5" },
  { src: "/images/portfolio/image_f.jpeg", title: "Imagen 6" },
];

const Gallery = () => {
  useEffect(() => {
    const init = async () => {
      const module = await import("photoswipe/lightbox");
      const PhotoSwipeLightbox = module.default;

      const lightbox = new PhotoSwipeLightbox({
        gallery: "#gallery",
        children: "a",
        pswpModule: () => import("photoswipe"),
      });

      lightbox.init();
    };

    init();
  }, []);

  return (
    <section
      id="portfolio"
      className="container mx-auto px-4 lg:px-0 py-20 md:py-24 lg:py-28"
    >
      <div className="flex flex-col w-full gap-y-4 lg:items-center mb-8">
        <h2 className="text-black font-bold text-2xl lg:text-3xl/[3rem]">
          Galería de Eventos Anteriores
        </h2>
        <div className="italic text-lg mb-6">
          Revive los momentos destacados de Hacktoberfest en nuestras ediciones
          anteriores.
        </div>
      </div>
      <div
        id="gallery"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {images.map((image, index) => (
          <a
            className="rounded-xl hover:scale-105 hover:contrast-[110%] transition-all relative"
            href={image.src}
            key={index}
            target="_blank"
            data-cropped="true"
            data-pswp-width="800"
            data-pswp-height="600"
            rel="noreferrer"
          >
            <img
              loading="lazy"
              src={image.src}
              alt={image.title}
              className="w-full h-auto object-cover rounded-lg cursor-pointer"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
