import { motion } from "framer-motion";
import { Phone, ArrowRight, Shield, Clock, MapPin, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ui/ServiceCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { Button } from "@/components/ui/button";

const Home = () => {
  const services = [
    {
      title: "Emergency Towing",
      description: "Quick 24/7 towing services for when you're stranded unexpectedly on the road.",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/hero-towing-jpg-5eb3532f-1778777500470.webp",
      features: ["24/7 Availability", "Rapid Response", "Safe Handling"]
    },
    {
      title: "Roadside Assistance",
      description: "Minor repairs, lockouts, and fuel delivery to get you back on your way.",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/roadside-assistance-jpg-e745cf3c-1778777499955.webp",
      features: ["Lockout Support", "Fuel Delivery", "Expert Mechanics"]
    },
    {
      title: "Battery Jumpstart",
      description: "Quick battery jumpstart services at your location, home or office.",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/battery-jumpstart-jpg-924cc5de-1778777500469.webp",
      features: ["Prompt Arrival", "Professional Gear", "Battery Check"]
    }
  ];

  const testimonials = [
    {
      name: "David Adeleke",
      role: "Logistics Manager",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/testimonial-1-jpg-089d2bf2-1778777500858.webp",
      content: "NAGARTA saved my day when my truck broke down on the expressway. They arrived within 20 minutes and handled everything professionally.",
      rating: 5
    },
    {
      name: "Chioma Obi",
      role: "Business Owner",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/testimonial-2-jpg-f2709c9d-1778777503323.webp",
      content: "Excellent service! The driver was very polite and the towing process was seamless. Highly recommended for anyone in Lagos.",
      rating: 5
    },
    {
      name: "Samuel Etim",
      role: "Private Driver",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/testimonial-3-jpg-275d6d37-1778777503423.webp",
      content: "The best towing experience I've had. Fair pricing and transparent communication throughout the process.",
      rating: 4
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/hero-towing-jpg-5eb3532f-1778777500470.webp"
            alt="Towing Service"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-6 inline-block">
              24/7 EMERGENCY HELP
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Stranded? We'll Get You <span className="text-yellow-500">Moving</span> Again.
            </h1>
            <p className="text-lg md:text-xl mb-10 text-zinc-300 max-w-lg leading-relaxed">
              NAGARTA SERVICING INVESTMENT LTD provides premium towing and roadside solutions across the region. Reliable, fast, and professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book-towing">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-14 px-8 text-lg w-full">
                  Request Assistance Now <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black h-14 px-8 text-lg w-full">
                Our Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-zinc-950 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <Clock className="text-yellow-500 shrink-0" size={32} />
              <div className="text-white">
                <p className="font-bold text-lg">20 Mins</p>
                <p className="text-xs text-zinc-500 uppercase">Avg Response</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Shield className="text-yellow-500 shrink-0" size={32} />
              <div className="text-white">
                <p className="font-bold text-lg">Fully Insured</p>
                <p className="text-xs text-zinc-500 uppercase">Secure Transport</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Truck className="text-yellow-500 shrink-0" size={32} />
              <div className="text-white">
                <p className="font-bold text-lg">Modern Fleet</p>
                <p className="text-xs text-zinc-500 uppercase">Best Equipment</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="text-yellow-500 shrink-0" size={32} />
              <div className="text-white">
                <p className="font-bold text-lg">Nationwide</p>
                <p className="text-xs text-zinc-500 uppercase">Wide Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3">Professional Solutions</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6">Our Premium Services</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer a wide range of towing and roadside assistance services tailored to meet your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/services">
              <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Need Immediate Towing?<br/>Call Us Now!</h2>
          <a href="tel:+2348006242782" className="inline-flex items-center justify-center bg-black text-white px-10 py-6 rounded-full text-2xl font-bold hover:bg-zinc-800 transition-all shadow-2xl hover:scale-105 active:scale-95">
            <Phone size={32} className="mr-4" /> +234 800 NAGARTA
          </a>
          <p className="mt-8 font-medium text-black/70 italic">Dispatchers standing by 24/7/365</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3">Customer Stories</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6">What Our Clients Say</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;