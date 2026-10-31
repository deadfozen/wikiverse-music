import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Play } from "lucide-react";
import { artist } from "@/data/artist";

export default function SalukiPage() {
  const currentArtist = artist.find((artist) => artist.id === "1");

  if (!currentArtist) {
    return <>Исполнитель не найден</>;
  }

  return (
    <>
      <Header />
      <main className="container flex-1">
        <div className="container flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
          <div className="relative aspect-square w-[180px] md:w-[220px] shrink-0 overflow-hidden rounded-full bg-muted shadow-md mt-10">
            <Image
              src={currentArtist.image}
              alt={currentArtist.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 180px, 220px"
            />
          </div>
          <div className="flex flex-col gap-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-muted-foreground text-sm">
              <BadgeCheck className="w-4 h-4 text-indigo-500" />
              <span>Подтвержденный артист</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
              SALUKI
            </h1>
            <p className="text-sm text-muted-foreground">
              AKA: Несатый Арсений Александрович, Lil A1ds, HORRORKING, Wild Hon3y
            </p>
            <p className="text-sm text-muted-foreground">
              {/* TODO: подставить реальное число слушателей */}
              0 слушателей в месяц
            </p>
            <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
              SALUKI (Несатый Арсений Александрович (родился 5 июля 1997 года в
              Москве)) - российский рэп-исполнитель и саунд-продюссер, основатель
              лейбла CARNIVAL RECORDS, бывший участник объединения Dead Dynasty.
            </p>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
            Популярные треки
          </h2>
          <div className="flex flex-col gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="group flex items-center gap-4 p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="w-8 text-center text-muted-foreground text-sm relative">
                  <span className="group-hover:opacity-0">{n}</span>
                  <button
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Play"
                  >
                    <Play className="w-4 h-4 text-foreground fill-current" />
                  </button>
                </div>
                <div className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden bg-muted">
                  <Image
                    src="/cover.png"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    Название трека {n}
                  </p>
                </div>
                <p className="hidden sm:block text-sm text-muted-foreground tabular-nums">
                  0
                </p>
                <p className="text-sm text-muted-foreground tabular-nums w-12 text-right">
                  3:43
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
              Популярные релизы
            </h2>
            <Link
              href="/artist/saluki/discography"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Вся дискография
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((n) => (
              <Link key={n} href="#" className="group flex flex-col gap-3 w-full">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                  <Image
                    src="/cover.png"
                    alt="Release"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-foreground text-base font-bold truncate">
                    Название релиза {n}
                  </h3>
                  <p className="text-muted-foreground text-sm truncate">
                    Альбом • 2023
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
            С этим исполнителем
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3].map((n) => (
              <Link key={n} href="#" className="group flex flex-col gap-3 w-full">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                  <Image
                    src="/cover.png"
                    alt="Release"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-foreground text-base font-bold truncate">
                    Фичер {n}
                  </h3>
                  <p className="text-muted-foreground text-sm truncate">
                    Сингл • 2022
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}