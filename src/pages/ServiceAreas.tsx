import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ServiceAreas = () => {
  const regions = [
    {
      name: "Lagos Mainland",
      locations: ["Ikeja", "Surulere", "Yaba", "Maryland", "Gbagada", "Oshodi", "Apapa"]
    },
    {
      name: "Lagos Island",
      locations: ["Victoria Island", "Ikoyi", "Lekki Phase 1", "Ajah", "Sangotedo", "Epe"]
    },
    {
      name: "Abuja FCT",
      locations: ["Wuse", "Garki", "Maitama", "Asokoro", "Jabi", "Gwarinpa", "Lugbe"]
    },
    {
      name: "Rivers State",
      locations: ["Port Harcourt", "Obio-Akpor", "Eleme", "Oyigbo", "Onne"]
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6">Service <span className="text-yellow-500">Locations</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We are expanding rapidly. Currently, we provide 24/7 service in the following major metropolitan areas.
          </p>
        </motion.div>

        <div className="relative max-w-xl mx-auto mb-16">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <Input placeholder="Search your city or neighborhood..." className="pl-12 h-14 rounded-full border-zinc-200 dark:border-zinc-800" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {regions.map((region, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card p-8 rounded-3xl border border-border"
            >
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="text-yellow-500" size={24} />
                <h3 className="text-xl font-bold">{region.name}</h3>
              </div>
              <ul className="space-y-3">
                {region.locations.map((loc, lIdx) => (
                  <li key={lIdx} className="text-muted-foreground flex items-center group cursor-default">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mr-3 group-hover:bg-yellow-500 transition-colors" />
                    {loc}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-zinc-950 rounded-3xl text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Don't see your location?</h3>
          <p className="text-zinc-400 mb-8">We offer long-distance towing to any part of Nigeria from our major hubs.</p>
          <button className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-600 transition-colors">
            Request Custom Route
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreas;