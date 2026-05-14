import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Truck, AlertCircle, TrendingUp, CheckCircle2, Clock, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    drivers: 0,
    revenue: 0
  });

  useEffect(() => {
    fetchData();
    
    // Subscribe to changes
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'towing_requests' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: reqs, error } = await supabase
        .from('towing_requests')
        .select(`
          *,
          customer:profiles!customer_id(first_name, last_name),
          driver:profiles!driver_id(first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(reqs || []);

      const { count: total } = await supabase.from('towing_requests').select('*', { count: 'exact', head: true });
      const { count: active } = await supabase.from('towing_requests').select('*', { count: 'exact', head: true }).eq('status', 'assigned');
      const { count: drivers } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'driver');

      setStats({
        total: total || 0,
        active: active || 0,
        drivers: drivers || 0,
        revenue: 0 // Placeholder
      });
    } catch (error: any) {
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: "Total Requests", value: stats.total.toString(), icon: AlertCircle, color: "text-blue-500" },
    { title: "Active Tows", value: stats.active.toString(), icon: Truck, color: "text-yellow-500" },
    { title: "Available Drivers", value: stats.drivers.toString(), icon: Users, color: "text-green-500" },
    { title: "Today's Revenue", value: "₦0", icon: TrendingUp, color: "text-purple-500" },
  ];

  return (
    <div className="p-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2">Admin <span className="text-yellow-500">Dashboard</span></h1>
            <p className="text-muted-foreground">Manage fleet operations and request dispatching.</p>
          </div>
          <div className="flex space-x-4">
            <Button className="bg-yellow-500 text-black font-bold">Dispatch Driver</Button>
            <Button variant="outline">Reports</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, idx) => (
            <Card key={idx} className="border-none shadow-lg">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.title}</p>
                  <p className="text-3xl font-black">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 ${stat.color}`}>
                  <stat.icon size={28} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-lg overflow-hidden">
            <CardHeader className="flex flex-col sm:flex-row items-center justify-between bg-zinc-900 text-white p-6 gap-4">
              <CardTitle>Live Requests</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <Input placeholder="Search requests..." className="bg-zinc-800 border-none text-xs w-full pl-10 h-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-zinc-100 dark:bg-zinc-900 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Driver</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr><td colSpan={6} className="p-8 text-center">Loading requests...</td></tr>
                  ) : requests.length === 0 ? (
                    <tr><td colSpan={6} className="p-8 text-center">No requests found.</td></tr>
                  ) : (
                    requests.map((req, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                        <td className="p-4 font-bold text-yellow-500">#{req.id.slice(0, 8)}</td>
                        <td className="p-4">{req.customer?.first_name} {req.customer?.last_name}</td>
                        <td className="p-4 text-xs font-medium uppercase">{req.service_type}</td>
                        <td className="p-4">
                          <Badge variant={req.status === 'completed' ? 'default' : 'secondary'} className={req.status === 'pending' ? 'bg-yellow-500 text-black' : ''}>
                            {req.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">{req.driver ? `${req.driver.first_name} ${req.driver.last_name}` : 'Unassigned'}</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" className="text-yellow-500 font-bold">Manage</Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="text-green-500" size={20} />
                    <span className="text-sm font-medium">Database</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] text-green-500 border-green-500">OPERATIONAL</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="text-green-500" size={20} />
                    <span className="text-sm font-medium">Payment Gateway</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] text-green-500 border-green-500">OPERATIONAL</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500 text-black border-none shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-black mb-4">Urgent Dispatch</h3>
                <p className="text-sm font-medium mb-6">There are {stats.active} active requests requiring assignment.</p>
                <Button className="w-full bg-black text-white hover:bg-zinc-800">Review Requests</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;