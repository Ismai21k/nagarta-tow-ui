import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { requestId, customerName } = await req.json()

  // Placeholder for Email/SMS notification logic (Nodemailer, Twilio, etc.)
  console.log(`New request #${requestId} from ${customerName}`)

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { "Content-Type": "application/json" } },
  )
})