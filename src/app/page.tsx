import Header from "@/components/header"
import Card from "@/components/card"
import ArtistCard from "@/components/artist-card"
import {release} from "@/data/release"
import {artist} from "@/data/artist"

export default function Home() {
  return (
    <>
      <Header/>
      <main className="flex-1">
        <section className="w-full py-8 container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Исполнители</h2>
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {artist.map((a) => (
              <div key={a.id} className="snap-start shrink-0">
                <ArtistCard name={a.name} href={a.href} image={a.image}/>
              </div>
            ))}
          </div>
        </section>
        <section className="w-full py-8 container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Релизы</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {release.map((r) => (
              <Card key={r.id} title={r.title} subtitle={r.subtitle} image={r.image} href={r.href}/>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}