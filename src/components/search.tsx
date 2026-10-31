"use client"

import {Search} from "lucide-react"
import {useState} from "react"

export default function HeaderSearch() {
  const [query, setQuery] = useState("")

  return (
    <div className="relative w-full max-w-[400px]">
      <div className="flex h-10 items-center rounded-md border border-transparent bg-muted/50 px-3 transition-colors hover:border-border focus-within:border-border">
        <Search className="w-4 h-4 shrink-0 opacity-70"/>
        <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground" aria-label="Поиск по WikiVerse Music" placeholder="Поиск пока не работает!"/>
      </div>
    </div>
  )
}