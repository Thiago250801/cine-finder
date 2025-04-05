import { motion, Variants } from "framer-motion";

interface MovieCardProps {
  title: string;
  genre: string;
  rating: number;
  custom: number;
  variants: Variants;
}

export function Card({ title, genre, rating, custom, variants }: MovieCardProps) {
  return (
    <motion.div
      custom={custom}
      initial="hidden"
      animate="visible"
      variants={variants}
      className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 cursor-pointer"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <div className="flex justify-between text-gray-300 mb-4">
        <span>{genre}</span>
        <span className="flex items-center">⭐ {rating}</span>
      </div>
    </motion.div>
  );
}