import Image from "next/image"
import Link from "next/link"

interface CardProps {
  title: string
  subtitle: string
  image: string
  href: string
}

export default function Card({title, subtitle, image, href}: CardProps) {
  return (
    <Link href={href} className="group flex flex-col gap-3 w-full max-w-[200px]">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <Image src={image} alt={title} fill  className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 50vw 200px"/>
      </div>
      <div className="flex flex-col">
        <h3 className="text-foreground text-base font-bold truncate">{title}</h3>
        <p className="text-muted-foreground text-sm truncate">{subtitle}</p>
      </div>
    </Link>
  )
} 