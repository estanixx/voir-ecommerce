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
import { graffiti } from '@/fonts'
// import { toast } from 'sonner'

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

  const onSubmit = async (/*values: {[key:string]: string}*/) => {
    // try {
    //   const res = await fetch('/api/newsletter-form', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email: values.email, name: values.name, birthday: values.birthday }),
    //   })

    //   if (!res.ok) throw new Error('Error al enviar el formulario')

    //   toast.success('¡Suscripción exitosa! Gracias por suscribirte a nuestro boletín.')

    //   form.reset()
    // } catch (error) {
    //   toast.error('Error al suscribirte. Por favor, intenta nuevamente.')
    //   console.error(error)
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" py-5  full px-4 text-white">
        <div className="flex flex-col justify-center  h-full gap-2 max-w-sm mx-auto bg">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Correo electrónico" {...field} className='rounded-none' />
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
                <FormControl>
                  <Input placeholder="Nombre" {...field} className='rounded-none'/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm text-muted-foreground text-center">
            Para recibir información y promociones relacionadas con nuestro negocio.
          </p>
          <Button variant="secondary" type="submit" className='rounded-none'>Suscribirme</Button>
        </div>
      </form>
    </Form>
  )
}
