import Image from "next/image";

interface PostHeaderProps {
  title: string;
  image: string;
}

export function PostHeader({ title, image }: PostHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="relative h-[400px] w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  );
}
