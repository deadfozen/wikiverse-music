import Link from "next/link"
import {Music, Home} from "lucide-react"
import HeaderSearch from "@/components/search"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdtop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
        <Music className="w-6 h-6"/>
        <span className="inline">WikiVerse Music</span>
        </Link>
        <nav className="flex items-center gap-6 flex-1 px-6">
          <HeaderSearch/>
          <div className="flex items-center gap-6 ml-6">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Home className="w-4 h-4"/>
              Главная
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}