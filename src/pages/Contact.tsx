import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We will contact you shortly.");
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6">Get In <span className="text-yellow-500">Touch</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions or need a non-emergency quote? Our team is available to assist you via email, phone, or the contact form.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
              <div className="bg-yellow-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-yellow-600 mb-6">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-muted-foreground mb-4">Available 24/7 for emergencies.</p>
              <p className="font-bold text-lg">+234 800 624 2782</p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
              <div className="bg-yellow-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-yellow-600 mb-6">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-muted-foreground mb-4">For partnerships and inquiries.</p>
              <p className="font-bold text-lg">info@nagarta.com</p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
              <div className="bg-yellow-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-yellow-600 mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Address</h3>
              <p className="text-muted-foreground mb-4">Visit our main logistics hub.</p>
              <p className="font-bold">123 Business Ave, Lagos, NG</p>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-14 space-x-3">
              <MessageCircle size={20} />
              <span>WhatsApp Chat</span>
            </Button>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card p-10 rounded-3xl border border-border shadow-xl">
              <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Full Name</label>
                    <Input placeholder="John Doe" required className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Email Address</label>
                    <Input type="email" placeholder="john@example.com" required className="h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Subject</label>
                  <Input placeholder="How can we help?" required className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Message</label>
                  <Textarea placeholder="Details of your inquiry..." className="min-h-[150px] pt-4" required />
                </div>
                <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-14 text-lg">
                  Send Message <Send size={20} className="ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;