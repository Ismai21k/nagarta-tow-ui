import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, Navigation, Phone, CheckCircle, AlertCircle, List } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const DriverDashboard = () => {
  const [activeJob, setActiveJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveJob();
  }, []);

  const fetchActiveJob = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('towing_requests')
        .select(`
          *,
          customer:profiles!customer_id(first_name, last_name, phone_number)
        `)
        .eq('driver_id', user.id)
        .in('status', ['assigned', 'in-progress'])
        .maybeSingle();

      if (error) throw error;
      setActiveJob(data);
    } catch (error: any) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      const { error } = await supabase
        .from('towing_requests')
        .update({ status: newStatus })
        .eq('id', activeJob.id);

      if (error) throw error;
      
      if (newStatus === 'completed') {
        toast.success("Job marked as completed!");
        setActiveJob(null);
      } else {
        toast.success(`Status updated to ${newStatus}`);
        fetchActiveJob();
      }
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black">Driver <span className="text-yellow-500">Panel</span></h1>
          <p className="text-muted-foreground">Manage your assigned tasks and routes.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {loading ? (
              <p>Loading jobs...</p>
            ) : activeJob ? (
              <Card className="border-yellow-500 border-2 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-500 text-black px-4 py-1 font-bold text-xs rounded-bl-lg">
                  ACTIVE JOB
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="mr-3 text-yellow-500" size={24} />
                    Job #{activeJob.id.slice(0, 8)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold">{activeJob.customer?.first_name} {activeJob.customer?.last_name}</h4>
                      <p className="text-sm text-muted-foreground">{activeJob.vehicle_details?.model}</p>
                    </div>
                    <Badge className="bg-blue-500 uppercase">{activeJob.status}</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-red-500 shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground">Pickup</p>
                        <p className="font-medium">{activeJob.pickup_location}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Navigation className="text-green-500 shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground">Drop-off</p>
                        <p className="font-medium">{activeJob.dropoff_location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl">
                    <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Issue Details</p>
                    <p className="text-sm">{activeJob.vehicle_details?.issue || 'No details provided'}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {activeJob.status === 'assigned' ? (
                      <Button className="bg-yellow-500 text-black hover:bg-yellow-600 h-12" onClick={() => handleStatusUpdate('in-progress')}>
                        Start Job
                      </Button>
                    ) : (
                      <Button className="bg-green-600 hover:bg-green-700 h-12" onClick={() => handleStatusUpdate('completed')}>
                        <CheckCircle size={18} className="mr-2" /> Complete Job
                      </Button>
                    )}
                    <a href={`tel:${activeJob.customer?.phone_number}`} className="w-full">
                      <Button variant="outline" className="w-full h-12">
                        <Phone size={18} className="mr-2" /> Call Customer
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border">
                <AlertCircle size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold">No active jobs</h3>
                <p className="text-muted-foreground">You are currently available for new requests.</p>
              </div>
            )}

            <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-3xl flex items-center justify-center overflow-hidden border border-border">
              <p className="text-zinc-500 font-bold">Interactive Navigation View</p>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <List className="mr-2" size={18} /> Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
                  <p className="text-xs font-bold uppercase text-zinc-500">Rating</p>
                  <p className="text-2xl font-black">4.9 / 5.0</p>
                </div>
              </CardContent>
            </Card>

            <div className="bg-zinc-900 text-white p-6 rounded-3xl">
              <p className="text-xs font-bold uppercase text-zinc-500 mb-2">Earnings Today</p>
              <h3 className="text-3xl font-black mb-6">₦0</h3>
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span className="font-bold">0 Jobs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;