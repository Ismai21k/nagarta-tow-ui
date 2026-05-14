-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone_number TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'driver', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create towing_requests table
CREATE TABLE IF NOT EXISTS public.towing_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id),
  driver_id UUID REFERENCES public.profiles(id),
  service_type TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  dropoff_location TEXT NOT NULL,
  pickup_lat DECIMAL,
  pickup_lng DECIMAL,
  dropoff_lat DECIMAL,
  dropoff_lng DECIMAL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in-progress', 'completed', 'cancelled')),
  vehicle_details JSONB,
  estimated_cost DECIMAL,
  actual_cost DECIMAL,
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'pending', 'paid', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES public.towing_requests(id),
  amount DECIMAL NOT NULL,
  currency TEXT DEFAULT 'NGN',
  status TEXT DEFAULT 'pending',
  provider TEXT, -- 'paystack' or 'flutterwave'
  provider_reference TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.towing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Towing Requests Policies
CREATE POLICY "Customers can view their own requests." ON public.towing_requests
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Drivers can view assigned requests." ON public.towing_requests
  FOR SELECT USING (auth.uid() = driver_id OR role = 'admin'); -- Note: Role check needs a function or join

CREATE POLICY "Admins can view all requests." ON public.towing_requests
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Customers can create requests." ON public.towing_requests
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Payment Policies
CREATE POLICY "Users can view their own payments." ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.towing_requests
      WHERE towing_requests.id = payments.request_id AND towing_requests.customer_id = auth.uid()
    )
  );

-- Function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', COALESCE(new.raw_user_meta_data->>'role', 'customer'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_towing_requests_customer_id ON public.towing_requests(customer_id);
CREATE INDEX IF NOT EXISTS idx_towing_requests_driver_id ON public.towing_requests(driver_id);
CREATE INDEX IF NOT EXISTS idx_towing_requests_status ON public.towing_requests(status);
CREATE INDEX IF NOT EXISTS idx_payments_request_id ON public.payments(request_id);