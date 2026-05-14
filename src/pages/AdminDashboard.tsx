import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Truck, AlertCircle, TrendingUp, CheckCircle2, Clock, Search, LogOut } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { title: "Total Requests", value: "0", icon: AlertCircle, color: "text-blue-500" },
    { title: "Active Tows", value: "0", icon: Truck, color: "text-yellow-500" },
    { title: "Available Drivers", value: "0", icon: Users, color: "text-green-500" },
    { title: "Today's Revenue", value: "\u20a60", icon: TrendingUp, color: "text-purple-500" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: reqs, error } = await supabase
        .from('towing_requests')
        .select('*, profiles(full_name), drivers(profiles(full_name))')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(reqs || []);

      // Simple stat calculation
      const active = reqs?.filter(r => r.status === 'in_progress').length || 0;
      const total = reqs?.length || 0;
      
      setStats([
        { title: "Total Requests", value: total.toString(), icon: AlertCircle, color: "text-blue-500" },
        { title: "Active Tows", value: active.toString(), icon: Truck, color: "text-yellow-500" },
        { title: "Available Drivers", value: "8", icon: Users, color: "text-green-500" },
        { title: "Today's Revenue", value: "\u20a60", icon: TrendingUp, color: "text-purple-500" },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="p-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2">Admin <span className="text-yellow-500">Dashboard</span></h1>
            <p className="text-muted-foreground">Manage fleet operations and request dispatching.</p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={fetchData} variant="outline">Refresh</Button>
            <Button onClick={handleLogout} variant="destructive"><LogOut className="mr-2" size={16}/> Logout</Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
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
          {/* Recent Requests Table */}
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
                    <th className="p-4">Customer</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {requests.map((req, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold">{req.profiles?.full_name || 'Guest'}</div>
                        <div className="text-xs text-muted-foreground">{req.vehicle_details?.model}</div>
                      </td>
                      <td className="p-4 text-xs font-medium">{req.pickup_address}</td>
                      <td className="p-4">
                        <Badge className={req.status === 'pending' ? 'bg-yellow-500 text-black' : ''}>
                          {req.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm" className="text-yellow-500 font-bold">Manage</Button>
                      </td>
                    </tr>
                  ))}
                  {requests.length === 0 && !loading && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-muted-foreground">No requests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Side Panels */}
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
                    <span className="text-sm font-medium">Auth Service</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] text-green-500 border-green-500">OPERATIONAL</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;