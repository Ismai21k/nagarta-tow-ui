import { Quote, Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const TestimonialCard = ({ name, role, image, content, rating }: TestimonialCardProps) => {
  return (
    <div className="bg-card p-8 rounded-2xl border border-border shadow-sm relative">
      <div className="absolute top-8 right-8 text-yellow-500/20">
        <Quote size={40} />
      </div>
      <div className="flex items-center mb-6">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-yellow-500/20"
        />
        <div>
          <h4 className="font-bold text-foreground">{name}</h4>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">{role}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < rating ? "text-yellow-500 fill-yellow-500" : "text-zinc-300"}`}
          />
        ))}
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed italic">
        "{content}"
      </p>
    </div>
  );
};

export default TestimonialCard;