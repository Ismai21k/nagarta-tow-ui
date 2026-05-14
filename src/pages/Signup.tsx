import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Registration successful! Please check your email for verification.");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-card p-10 rounded-3xl border border-border shadow-2xl">
        <div className="text-center mb-10">
          <div className="bg-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <UserPlus className="text-black" size={32} />
          </div>
          <h2 className="text-3xl font-black">Join Nagarta</h2>
          <p className="text-muted-foreground mt-2">Get priority assistance and exclusive offers.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold">Full Name</label>
            <div className="relative">
              <Input 
                placeholder="John Doe" 
                className="h-14 pl-12" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Email Address</label>
            <div className="relative">
              <Input 
                type="email" 
                placeholder="john@example.com" 
                className="h-14 pl-12" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Phone Number</label>
            <div className="relative">
              <Input 
                type="tel" 
                placeholder="+234 ..." 
                className="h-14 pl-12" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required 
              />
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Create Password</label>
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
            className="w-full h-14 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg mt-4"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-muted-foreground">Already have an account?</span>{" "}
          <Link to="/login" className="text-yellow-500 font-bold hover:underline">Login Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;