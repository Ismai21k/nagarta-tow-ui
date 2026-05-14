import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { action, request_id, amount, provider } = await req.json();

    if (action === "initialize") {
      // Logic for initializing payment with Paystack/Flutterwave would go here
      // For now, we simulate a successful initialization
      return new Response(
        JSON.stringify({ checkout_url: "https://checkout.example.com", reference: "ref_123" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    if (action === "webhook") {
      // Logic for handling webhooks from providers
      const { reference, status } = await req.json();
      
      const { data, error } = await supabaseClient
        .from("payments")
        .update({ status: status === "success" ? "paid" : "failed" })
        .eq("provider_reference", reference);

      if (error) throw error;

      return new Response(JSON.stringify({ status: "processed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});