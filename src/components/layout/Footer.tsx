import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-yellow-400 p-2 rounded-lg">
                <Phone className="text-black" size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                NAGARTA <span className="text-yellow-500">TOWING</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              NAGARTA SERVICING INVESTMENT LTD provides 24/7 reliable towing and roadside assistance. We are committed to your safety and vehicle care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-yellow-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-yellow-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-yellow-500 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services" className="hover:text-yellow-500 transition-colors">Our Services</Link></li>
              <li><Link to="/about" className="hover:text-yellow-500 transition-colors">About Us</Link></li>
              <li><Link to="/service-areas" className="hover:text-yellow-500 transition-colors">Service Areas</Link></li>
              <li><Link to="/book-towing" className="hover:text-yellow-500 transition-colors">Book a Tow</Link></li>
              <li><Link to="/faq" className="hover:text-yellow-500 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Popular Services</h3>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Emergency Towing</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Roadside Assistance</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Battery Jumpstart</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Flat Tire Change</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Long Distance Towing</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-yellow-500 mt-0.5 shrink-0" />
                <span>123 Business Avenue, Suite 100, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-yellow-500 shrink-0" />
                <span>+234 800 NAGARTA (624 2782)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-yellow-500 shrink-0" />
                <span>emergency@nagarta.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} NAGARTA SERVICING INVESTMENT LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;