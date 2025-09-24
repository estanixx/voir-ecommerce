// /app/api/newsletter-form/route.ts

import { NextResponse } from "next/server"
import { z } from "zod"
import { createNewsletterSubscriber } from "@/lib/shopify"

const schema = z.object({
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  name: z.string().min(1, { message: 'El nombre es obligatorio' }),
  birthDate: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, birthDate } = schema.parse(body)

    const result = await createNewsletterSubscriber(
      email,
      name,
      undefined, // lastName
      undefined, // phone
      birthDate
    )

    if (result.errors) {
      const errorMessage = result.errors.map(error => error.message).join(', ')
      return NextResponse.json({ 
        error: errorMessage || "Error al crear el cliente en Shopify" 
      }, { status: 400 })
    }

    return NextResponse.json({ 
      message: "Suscripción exitosa",
      customer: result.customer 
    }, { status: 200 })
  } catch (error) {
    console.error("Error saving subscriber:", error)
    
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(err => err.message).join(', ')
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }
    
    return NextResponse.json({ 
      error: "Error interno del servidor. Por favor, intenta nuevamente." 
    }, { status: 500 })
  }
}