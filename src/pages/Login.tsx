import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Welcome back to NAGARTA!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-card p-10 rounded-3xl border border-border shadow-2xl">
        <div className="text-center mb-10">
          <div className="bg-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <LogIn className="text-black" size={32} />
          </div>
          <h2 className="text-3xl font-black">Login to Nagarta</h2>
          <p className="text-muted-foreground mt-2">Track your requests and manage fleet.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold">Email Address</label>
            <div className="relative">
              <Input 
                type="email" 
                placeholder="name@company.com" 
                className="h-14 pl-12" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-bold">Password</label>
              <a href="#" className="text-xs text-yellow-500 font-bold hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-14 pl-12" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg shadow-lg"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account?</span>{" "}
          <Link to="/signup" className="text-yellow-500 font-bold hover:underline">Create Account</Link>
        </div>

        <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 gap-4">
          <Link to="/admin" className="text-center text-xs text-zinc-500 hover:text-yellow-500 transition-colors">Admin Portal</Link>
          <Link to="/driver" className="text-center text-xs text-zinc-500 hover:text-yellow-500 transition-colors">Driver Portal</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;