'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { graffiti } from '@/fonts'

const formSchema = z.object({
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  name: z.string().min(1, { message: 'El nombre es obligatorio' }),
})

export default function NewsletterForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  })

  const onSubmit = async (values: {[key:string]: string}) => {
    try {
      const res = await fetch('/api/newsletter-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email, name: values.name }),
      })

      if (!res.ok) throw new Error('Error al enviar el formulario')

      toast.success(`Ahora eres parte del camino, ${values.name}.`)


      form.reset()
    } catch (error) {
      toast.error('Error al suscribirte. Por favor, intenta nuevamente.')
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" py-10 bg-black full px-4 text-white">
        <h2 className={`2xl:text-5xl xl:text-4xl lg:text-4xl text-3xl text-center mb-8 ${graffiti.className }`} >Newsletter</h2>
        <div className="flex flex-col justify-center h-full gap-3 max-w-md mx-auto ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="Tu correo electrónico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm text-muted-foreground">
            Para recibir un <span className="font-bold">10% OFF en tu primera compra.</span>
          </p>
          <Button variant="secondary" type="submit">Suscribirme</Button>
        </div>
      </form>
    </Form>
  )
}
