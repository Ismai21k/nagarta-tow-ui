import { motion } from "framer-motion";
import { Shield, Users, Trophy, Target } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Vehicles Towed", value: "25k+" },
    { label: "Expert Drivers", value: "150+" },
    { label: "Years Experience", value: "15+" },
    { label: "Service Areas", value: "45+" },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-black mb-8 leading-tight">
              Pioneering <span className="text-yellow-500">Safe Reliable</span> Towing in Nigeria.
            </h1>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              NAGARTA SERVICING INVESTMENT LTD was founded with a single mission: to redefine the towing industry through professionalism, technology, and empathy. We understand that being stranded is stressful, and we aim to be the most trusted name in roadside assistance.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="border-l-2 border-yellow-500 pl-4">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="relative">
            <img
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/about-us-jpg-8ffd96d2-1778777501426.webp"
              alt="About Nagarta"
              className="rounded-2xl shadow-2xl relative z-10"
            />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-500 rounded-2xl -z-0" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="bg-yellow-500/10 p-4 rounded-xl text-yellow-600">
                <Target size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide the fastest, safest, and most professional towing and roadside assistance services in Nigeria, leveraging modern equipment and highly trained personnel.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="bg-yellow-500/10 p-4 rounded-xl text-yellow-600">
                <Shield size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become the pan-African leader in vehicle logistics and emergency roadside solutions, setting the gold standard for reliability and customer service.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-900 p-12 rounded-3xl">
            <h3 className="text-2xl font-bold mb-6">Our Core Values</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="font-medium">Integrity & Transparency</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="font-medium">Safety-First Culture</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="font-medium">24/7 Reliability</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="font-medium">Technological Innovation</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="font-medium">Customer Centricity</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3">The People</h2>
          <h3 className="text-4xl font-black mb-16">Meet Our Leadership</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
                  <img
                    src={`https://storage.googleapis.com/dala-prod-public-storage/generated-images/80662815-bf63-4958-8726-ab8ec288fbca/testimonial-${i}-jpg-089d2bf2-1778777500858.webp`}
                    alt="Team Member"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h4 className="text-xl font-bold">Executive {i}</h4>
                <p className="text-yellow-500 text-sm font-bold uppercase tracking-widest">Director</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;