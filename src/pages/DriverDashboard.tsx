import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, Navigation, Phone, CheckCircle, List, LogOut } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const DriverDashboard = () => {
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please login to access driver panel");
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from('towing_requests')
        .select('*, profiles(full_name, phone)')
        .eq('driver_id', user.id)
        .eq('status', 'in_progress')
        .maybeSingle();

      if (error) throw error;
      setCurrentTask(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!currentTask) return;
    
    try {
      const { error } = await supabase
        .from('towing_requests')
        .update({ status: 'completed' })
        .eq('id', currentTask.id);

      if (error) throw error;
      
      toast.success("Job marked as completed!");
      setCurrentTask(null);
      fetchTask();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="p-6 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">Driver <span className="text-yellow-500">Panel</span></h1>
            <p className="text-muted-foreground">You are currently ONLINE.</p>
          </div>
          <Button onClick={handleLogout} variant="destructive" size="sm"><LogOut className="mr-2" size={16}/> Logout</Button>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Task View */}
          <div className="md:col-span-2 space-y-8">
            {currentTask ? (
              <Card className="border-yellow-500 border-2 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-500 text-black px-4 py-1 font-bold text-xs rounded-bl-lg">
                  ACTIVE JOB
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="mr-3 text-yellow-500" size={24} />
                    Job #{currentTask.id.slice(0,8)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold">{currentTask.profiles?.full_name}</h4>
                      <p className="text-sm text-muted-foreground">{currentTask.vehicle_details?.model}</p>
                    </div>
                    <Badge className="bg-blue-500">{currentTask.status}</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-red-500 shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground">Pickup</p>
                        <p className="font-medium">{currentTask.pickup_address}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Navigation className="text-green-500 shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground">Drop-off</p>
                        <p className="font-medium">{currentTask.dropoff_address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-green-600 hover:bg-green-700 h-12" onClick={handleComplete}>
                      <CheckCircle size={18} className="mr-2" /> Complete Job
                    </Button>
                    <a href={`tel:${currentTask.profiles?.phone}`} className="w-full">
                      <Button variant="outline" className="w-full h-12">
                        <Phone size={18} className="mr-2" /> Call Customer
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="p-12 text-center border-dashed border-2">
                <Truck className="mx-auto text-zinc-300 mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2">No Active Jobs</h3>
                <p className="text-muted-foreground mb-6">You're all caught up! New requests will appear here.</p>
                <Button onClick={fetchTask} variant="outline">Check for Tasks</Button>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <List className="mr-2" size={18} /> Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-zinc-900 text-white rounded-3xl">
                  <p className="text-xs font-bold uppercase text-zinc-500 mb-2">Earnings Today</p>
                  <h3 className="text-3xl font-black">\u20a60</h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;