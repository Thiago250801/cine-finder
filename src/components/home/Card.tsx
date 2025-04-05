import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";

interface MovieCardProps {
  title?: string;
  genre: string;
  rating?: string;
  posterPath?: string;
  custom: number;
  variants: Variants;
}

export function Card({
  title,
  genre,
  rating,
  posterPath,
  custom,
  variants,
}: MovieCardProps) {
  return (
    <motion.div
      custom={custom}
      initial="hidden"
      animate="visible"
      variants={variants}
      className="flex flex-col bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 cursor-pointer overflow-hidden"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center justify-center bg-gray-900/40 p-4 rounded-t-lg">
      <h3 className="text-base font-semibold text-primary line-clamp-2">
          {title}
        </h3>
      </div>

      {posterPath && (
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="w-full aspect-[2/3] object-cover"
        />
      )}

      {/* Título e conteúdo que cresce */}
      <div className="flex-1 flex flex-col justify-between p-4">


        {/* Footer fixado na parte inferior */}
        <div className="flex justify-between items-center text-secondary text-sm mt-auto">
          <span className="truncate">{genre}</span>
          <span className="flex items-center">
            <Star size={16} className="text-yellow-400 me-1" />
            {rating}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

