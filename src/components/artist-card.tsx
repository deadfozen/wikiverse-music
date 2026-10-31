import Image from "next/image"
import Link from "next/link"

interface ArtistCardPrors {
  name: string
  image: string
  href: string
}

export default function ArtistCard({name, image, href}: ArtistCardPrors) {
  return (
    <Link href={href} className="group flex flex-col items-center gap-3 w-[140px] md:w-[160px]">
      <div className="relative aspect-square w-full overflow-hidden rounded-full bg-muted shadow-sm">
        <Image src={image} alt={name} fill className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105" sizes="(max-width: 768px) 140px, 160px"/>
      </div>
      <h3 className="text-foreground text-base font-bold text-center truncate w-full">{name}</h3>
    </Link>
  )
}