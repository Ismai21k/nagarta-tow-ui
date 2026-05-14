import { Link } from "react-router-dom";
import { Phone, MessageCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const EmergencyButton = () => {
  const phoneNumber = "+1234567890"; // Placeholder number
  const whatsappNumber = "1234567890"; // Placeholder number

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3">
      {/* Hotline Button */}
      <motion.a
        href={`tel:${phoneNumber}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors group relative border-2 border-white dark:border-zinc-800"
        title="Call Hotline"
      >
        <Phone size={20} />
        <span className="absolute right-full mr-4 bg-zinc-900 text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Call Hotline
        </span>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors group relative border-2 border-white dark:border-zinc-800"
        title="WhatsApp Chat"
      >
        <MessageCircle size={20} />
        <span className="absolute right-full mr-4 bg-zinc-900 text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp Chat
        </span>
      </motion.a>

      {/* Main Emergency Button */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 0 0px rgba(234, 179, 8, 0.4)",
            "0 0 0 15px rgba(234, 179, 8, 0)",
            "0 0 0 0px rgba(234, 179, 8, 0.4)",
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="rounded-full"
      >
        <Link
          to="/book-towing"
          className="flex items-center justify-center w-16 h-16 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full shadow-2xl transition-all group relative border-2 border-white dark:border-zinc-900"
        >
          <AlertCircle size={32} className="animate-pulse" />
          <span className="absolute right-full mr-4 bg-zinc-900 text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Emergency Request
          </span>
        </Link>
      </motion.div>
    </div>
  );
};

export default EmergencyButton;