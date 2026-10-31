"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

import { albums } from "@/data/album";

type Album = (typeof albums)[number];

export default function WildEastPlayer() {
  const album = albums.find(
    (item) => item.id === "saluki-wild-east"
  );

  if (!album) {
    return <p>Альбом не найден</p>;
  }

  return <Player album={album} />;
}

function Player({ album }: { album: Album }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [activeTrack, setActiveTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const track = album.tracks[activeTrack];

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Ошибка воспроизведения:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [activeTrack, isPlaying]);

  if (!track) {
    return <p>Трек не найден</p>;
  }

  function playTrack(index: number) {
    setActiveTrack(index);
    setIsPlaying(true);
  }

  function togglePlayback() {
    setIsPlaying((previous) => !previous);
  }

  function nextTrack() {
    const next = (activeTrack + 1) % album.tracks.length;
    playTrack(next);
  }

  function previousTrack() {
    const audio = audioRef.current;

    if (audio && currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    const previous =
      (activeTrack - 1 + album.tracks.length) %
      album.tracks.length;

    playTrack(previous);
  }

  function handleSeek(value: number) {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = value;
    setCurrentTime(value);
  }

  function formatTime(time: number) {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Информация об альбоме */}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
        <div className="relative aspect-square w-full max-w-64 shrink-0 overflow-hidden rounded-xl shadow-lg">
          <Image
            src={album.image}
            alt={album.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Альбом
          </p>

          <h1 className="text-4xl font-bold">
            {album.title}
          </h1>

          <Link
            href={album.artistHref}
            className="font-semibold hover:underline"
          >
            {album.artist}
          </Link>

          <p className="text-sm text-muted-foreground">
            {album.date} · {album.tracks.length} треков
          </p>

          <button
            onClick={() => playTrack(0)}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-80"
          >
            <Play size={18} fill="currentColor" />
            Слушать
          </button>
        </div>
      </div>

      {/* Список треков */}

      <section className="space-y-3">

        <div className="divide-y divide-border">
          {album.tracks.map((item, index) => {
            const isActive = activeTrack === index;

            return (
              <button
                key={item.id}
                onClick={() => playTrack(index)}
                className={`flex w-full items-center gap-4 rounded-lg px-3 py-4 text-left transition-colors hover:bg-muted ${
                  isActive ? "bg-muted" : ""
                }`}
              >
                <span className="w-6 shrink-0 text-center text-sm text-muted-foreground">
                  {isActive && isPlaying ? (
                    <Pause size={17} />
                  ) : (
                    index + 1
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {item.title}
                  </p>

                  <p className="truncate text-sm text-muted-foreground">
                    {item.artist || album.artist}
                  </p>
                </div>

                <span className="shrink-0 text-sm text-muted-foreground">
                  {item.duration}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Нижний плеер */}

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4">

          {/* Обложка и информация */}

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-md">
              <Image
                src={album.image}
                alt={album.title}
                width={48}
                height={48}
                sizes="48px"
                className="size-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {track.title}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                {track.artist || album.artist}
              </p>
            </div>
          </div>

          {/* Управление */}

          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={previousTrack}
              aria-label="Предыдущий трек"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlayback}
              aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
              className="rounded-full bg-primary p-3 text-primary-foreground"
            >
              {isPlaying ? (
                <Pause size={20} fill="currentColor" />
              ) : (
                <Play size={20} fill="currentColor" />
              )}
            </button>

            <button
              onClick={nextTrack}
              aria-label="Следующий трек"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Прогресс */}

          <div className="hidden min-w-0 flex-1 items-center gap-3 md:flex">
            <span className="text-xs text-muted-foreground">
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              min={0}
              max={duration || 0}
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) =>
                handleSeek(Number(event.target.value))
              }
              className="w-full cursor-pointer accent-primary"
            />

            <span className="text-xs text-muted-foreground">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Аудио */}

      <audio
        ref={audioRef}
        src={track.audio}
        preload="metadata"
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        onLoadedMetadata={(event) =>
          setDuration(event.currentTarget.duration)
        }
        onEnded={nextTrack}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() =>
          console.error("Не удалось загрузить аудиофайл:", track.audio)
        }
      />

      <div className="h-20" />
    </div>
  );
}