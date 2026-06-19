import Image from "next/image";
import Link from "next/link";

export type BookCardProps = {
  id: string;
  title: string;
  author: string | null;
  coverUrl: string | null;
  rating?: number | null;
};

export default function BookCard({
  id,
  title,
  author,
  coverUrl,
  rating,
}: BookCardProps) {
  return (
    <Link
      href={`/library/${id}`}
      className="group rounded-2xl bg-white shadow-sm hover:shadow-md transition p-3 flex flex-col gap-2 border border-kr-muted/10"
    >
      <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-kr-bg flex items-center justify-center">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={title}
            width={240}
            height={320}
            className="object-cover w-full h-full group-hover:scale-105 transition"
          />
        ) : (
          <span className="text-kr-muted text-sm">No cover yet</span>
        )}
      </div>
      <h3 className="font-semibold text-kr-ink line-clamp-2">{title}</h3>
      <p className="text-sm text-kr-muted">{author ?? "Unknown"}</p>
      {rating ? (
        <p className="text-xs text-kr-gold">★ {rating}/5</p>
      ) : null}
    </Link>
  );
}