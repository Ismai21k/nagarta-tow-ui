-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'driver')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create drivers table
CREATE TABLE IF NOT EXISTS public.drivers (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  vehicle_info JSONB,
  license_number TEXT,
  status TEXT DEFAULT 'offline' CHECK (status IN ('available', 'busy', 'offline')),
  current_location_lat DOUBLE PRECISION,
  current_location_lng DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on drivers
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Drivers are viewable by everyone." ON public.drivers
  FOR SELECT USING (true);

CREATE POLICY "Drivers can update their own data." ON public.drivers
  FOR UPDATE USING (auth.uid() = id);

-- Create towing_requests table
CREATE TABLE IF NOT EXISTS public.towing_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  driver_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL,
  pickup_address TEXT NOT NULL,
  pickup_lat DOUBLE PRECISION,
  pickup_lng DOUBLE PRECISION,
  dropoff_address TEXT NOT NULL,
  dropoff_lat DOUBLE PRECISION,
  dropoff_lng DOUBLE PRECISION,
  vehicle_details JSONB,
  urgency TEXT DEFAULT 'normal',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'cancelled')),
  price DECIMAL(10, 2),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'pending', 'paid', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on towing_requests
ALTER TABLE public.towing_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view their own requests." ON public.towing_requests
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Drivers can view assigned requests." ON public.towing_requests
  FOR SELECT USING (auth.uid() = driver_id);

CREATE POLICY "Admins can view all requests." ON public.towing_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Customers can create requests." ON public.towing_requests
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID REFERENCES public.towing_requests(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  provider TEXT CHECK (provider IN ('paystack', 'flutterwave', 'cash')),
  transaction_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payments." ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.towing_requests
      WHERE id = request_id AND customer_id = auth.uid()
    )
  );

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published testimonials are viewable by everyone." ON public.testimonials
  FOR SELECT USING (is_published = true);

-- Create service_areas table
CREATE TABLE IF NOT EXISTS public.service_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on service_areas
ALTER TABLE public.service_areas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service areas are viewable by everyone." ON public.service_areas
  FOR SELECT USING (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_towing_requests_customer_id ON public.towing_requests(customer_id);
CREATE INDEX IF NOT EXISTS idx_towing_requests_driver_id ON public.towing_requests(driver_id);
CREATE INDEX IF NOT EXISTS idx_towing_requests_status ON public.towing_requests(status);
CREATE INDEX IF NOT EXISTS idx_drivers_status ON public.drivers(status);