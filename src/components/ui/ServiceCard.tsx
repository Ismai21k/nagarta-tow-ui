import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
}

const ServiceCard = ({ title, description, image, features }: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg transition-all duration-300"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-4 left-6 text-xl font-bold text-white uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="p-6">
        <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
          {description}
        </p>
        <ul className="space-y-2 mb-6">
          {features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-center text-xs text-foreground/80">
              <CheckCircle2 size={14} className="text-yellow-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          to="/book-towing"
          className="flex items-center text-sm font-semibold text-yellow-500 hover:text-yellow-600 transition-colors group"
        >
          Book Now
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;