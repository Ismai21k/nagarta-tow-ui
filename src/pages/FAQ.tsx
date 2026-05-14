import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How long does it take for a tow truck to arrive?",
      answer: "Our average response time is 20-30 minutes, depending on your location and traffic conditions. We prioritize emergency cases to ensure you're not stranded for long."
    },
    {
      question: "What information do I need to provide when calling for a tow?",
      answer: "Please have your vehicle make and model, exact location, the nature of the issue (e.g., flat tire, engine failure), and your contact details ready."
    },
    {
      question: "Do you offer long-distance towing?",
      answer: "Yes, we provide inter-state and long-distance towing across Nigeria. Contact us for a specific quote based on the distance."
    },
    {
      question: "Are my vehicle and I insured during the tow?",
      answer: "Absolutely. NAGARTA is fully insured. Your vehicle is protected from the moment we hook it up until it reaches its destination."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, bank transfers, USSD, and cash payments at the point of service."
    },
    {
      question: "Can you tow large vehicles like buses or trucks?",
      answer: "Yes, we have a specialized heavy-duty fleet capable of towing buses, commercial trucks, and industrial machinery."
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6">Frequently Asked <span className="text-yellow-500">Questions</span></h1>
          <p className="text-muted-foreground text-lg">
            Find quick answers to common questions about our towing and roadside services.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-2xl px-6 bg-card">
              <AccordionTrigger className="text-left font-bold text-lg hover:text-yellow-500 transition-colors py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;