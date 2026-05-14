import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, Car, AlertTriangle, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const BookTowing = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    vehicleModel: "",
    licensePlate: "",
    serviceType: "",
    pickupAddress: "",
    dropoffAddress: "",
    urgency: "standard",
    details: ""
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const nextStep = () => {
    if (step === 1 && !user) {
      toast.error("Please login to continue with your booking");
      navigate("/login");
      return;
    }
    setStep(s => s + 1);
  };
  
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to submit a request");
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('towing_requests')
        .insert([
          {
            customer_id: user.id,
            pickup_address: formData.pickupAddress,
            dropoff_address: formData.dropoffAddress,
            urgency: formData.urgency,
            vehicle_details: {
              model: formData.vehicleModel,
              plate: formData.licensePlate,
              service: formData.serviceType,
              issue: formData.details
            },
            status: 'pending'
          }
        ])
        .select();

      if (error) throw error;

      setStep(4);
      toast.success("Request Submitted! A dispatcher will call you in seconds.");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12 flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 -z-0" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-yellow-500 -translate-y-1/2 transition-all duration-500"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 font-bold border-4 transition-colors duration-500 ${
                step >= i ? "bg-yellow-500 border-yellow-500 text-black" : "bg-card border-zinc-200 dark:border-zinc-800 text-zinc-400"
              }`}
            >
              {step > i ? <Check size={20} /> : i}
            </div>
          ))}
        </div>

        <div className="bg-card p-8 md:p-12 rounded-3xl border border-border shadow-2xl">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-3xl font-black mb-8 flex items-center">
                <Car className="mr-4 text-yellow-500" size={32} /> Vehicle Info
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Vehicle Make & Model</label>
                  <Input 
                    placeholder="e.g. Toyota Camry 2022" 
                    className="h-14" 
                    value={formData.vehicleModel}
                    onChange={e => setFormData({...formData, vehicleModel: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">License Plate Number</label>
                  <Input 
                    placeholder="ABC-123-XY" 
                    className="h-14" 
                    value={formData.licensePlate}
                    onChange={e => setFormData({...formData, licensePlate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Service Type</label>
                  <Select onValueChange={v => setFormData({...formData, serviceType: v})}>
                    <SelectTrigger className="h-14">
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency Towing</SelectItem>
                      <SelectItem value="roadside">Roadside Assistance</SelectItem>
                      <SelectItem value="flat-tire">Flat Tire</SelectItem>
                      <SelectItem value="jumpstart">Battery Jumpstart</SelectItem>
                      <SelectItem value="heavy">Heavy Duty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={nextStep} className="w-full h-14 bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                  Next Step
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-3xl font-black mb-8 flex items-center">
                <MapPin className="mr-4 text-yellow-500" size={32} /> Location Details
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Current Pickup Location</label>
                  <div className="relative">
                    <Input 
                      placeholder="Enter address or use map" 
                      className="h-14 pl-12" 
                      value={formData.pickupAddress}
                      onChange={e => setFormData({...formData, pickupAddress: e.target.value})}
                    />
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500" size={20} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Destination Address (Drop-off)</label>
                  <Input 
                    placeholder="Where should we take the vehicle?" 
                    className="h-14" 
                    value={formData.dropoffAddress}
                    onChange={e => setFormData({...formData, dropoffAddress: e.target.value})}
                  />
                </div>
                <div className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" alt="Map Placeholder" className="w-full h-full object-cover opacity-50" />
                  <span className="absolute font-bold text-zinc-500">Interactive Map Integration</span>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={prevStep} className="flex-1 h-14">Back</Button>
                  <Button onClick={nextStep} className="flex-[2] h-14 bg-yellow-500 hover:bg-yellow-600 text-black font-bold">Continue</Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-3xl font-black mb-8 flex items-center">
                <AlertTriangle className="mr-4 text-yellow-500" size={32} /> Final Details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Urgency Level</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, urgency: 'urgent'})}
                      className={`p-4 border-2 rounded-xl font-bold transition-colors ${formData.urgency === 'urgent' ? 'border-red-500 text-red-500 bg-red-500/5' : 'border-zinc-200 text-zinc-400'}`}
                    >EXTREME URGENT</button>
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, urgency: 'standard'})}
                      className={`p-4 border-2 rounded-xl font-bold transition-colors ${formData.urgency === 'standard' ? 'border-yellow-500 text-yellow-500 bg-yellow-500/5' : 'border-zinc-200 text-zinc-400'}`}
                    >STANDARD</button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Vehicle Issue Details</label>
                  <Textarea 
                    placeholder="Tell us what happened..." 
                    className="min-h-[100px]" 
                    value={formData.details}
                    onChange={e => setFormData({...formData, details: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Photos of Vehicle/Issue (Optional)</label>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                    <Upload size={32} className="mb-2" />
                    <span>Upload Images</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={prevStep} className="flex-1 h-14">Back</Button>
                  <Button type="submit" disabled={loading} className="flex-[2] h-14 bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                    {loading ? "Submitting..." : "Confirm & Book Now"}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-green-500/20">
                <Truck size={48} />
              </div>
              <h2 className="text-4xl font-black mb-4">Request Confirmed!</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-sm mx-auto">
                Your request has been saved. A driver has been assigned and will contact you via +234 800-NAGARTA.
              </p>
              <Button onClick={() => navigate("/")} variant="outline" className="px-10 h-14">Back to Home</Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookTowing;