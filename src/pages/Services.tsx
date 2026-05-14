import { motion } from "framer-motion";
import ServiceCard from "@/components/ui/ServiceCard";

const Services = () => {
  const allServices = [
    {
      title: "Emergency Towing",
      description: "Quick 24/7 towing services for when you're stranded unexpectedly on the road.",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/hero-towing-jpg-5eb3532f-1778777500470.webp",
      features: ["Wheel-lift Towing", "Flatbed Towing", "Accident Recovery", "24/7 Support"]
    },
    {
      title: "Roadside Assistance",
      description: "Minor repairs, lockouts, and fuel delivery to get you back on your way quickly.",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/roadside-assistance-jpg-e745cf3c-1778777499955.webp",
      features: ["Lockout Assistance", "Fuel Delivery", "Tire Inflation", "Minor Repairs"]
    },
    {
      title: "Battery Services",
      description: "Quick battery jumpstart or replacement services at your location.",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/battery-jumpstart-jpg-924cc5de-1778777500469.webp",
      features: ["Jumpstart Service", "Battery Testing", "New Battery Install", "Terminal Cleaning"]
    },
    {
      title: "Flat Tire Change",
      description: "Professional flat tire replacement or repair on the spot.",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/flat-tire-jpg-06b2241d-1778777499957.webp",
      features: ["Spare Installation", "Tire Plugging", "Pressure Check", "Safe Lifting"]
    },
    {
      title: "Long Distance Towing",
      description: "Safe and reliable transport for your vehicle over long distances across Nigeria.",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/long-distance-towing-jpg-7a833dd8-1778777501082.webp",
      features: ["Inter-state Transport", "Scheduled Pickups", "GPS Tracking", "Insured Hauling"]
    },
    {
      title: "Heavy Duty Towing",
      description: "Specialized equipment for towing buses, trucks, and large machinery.",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/heavy-duty-towing-jpg-a66a366d-1778777501352.webp",
      features: ["Bus Towing", "RV Recovery", "Machinery Transport", "Rotator Service"]
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6">Our Professional <span className="text-yellow-500">Services</span></h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            From emergency roadside assistance to long-distance heavy-duty hauling, NAGARTA provides comprehensive solutions for every vehicle type.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;