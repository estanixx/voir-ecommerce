"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import clsx from "clsx";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { graffiti } from "@/fonts"; // Assuming you have this font setup
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  birthday: z
    .string()
    .min(1, { message: "La fecha de nacimiento es obligatoria" }),
});

const NewsletterModal = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      birthday: "",
    },
  });

  const onSubmit = async (values: {[key:string]: string}) => {
    try {
      const res = await fetch('/api/newsletter-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: values.email, 
          name: values.name,
          birthDate: values.birthday 
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        const errorMessage = errorData.error || 'Error al procesar tu suscripción'
        toast.error(errorMessage)
        return
      }

      toast.success(`¡Gracias ${values.name}! Te has suscrito exitosamente al newsletter. 🎉`)
      form.reset()
    } catch (error) {
      console.error('Error submitting newsletter form:', error)
      toast.error('Error de conexión. Por favor, verifica tu internet e intenta nuevamente.')
    }
  };

  return (
    <DialogContent className="max-w-[900px] flex overflow-hidden p-0 mt-5">
      <div className="p-6 flex-1">
        <DialogHeader>
          <DialogTitle
            className={clsx(graffiti.className, "text-2xl text-center")}
          >
            Newsletter
          </DialogTitle>
          <DialogDescription className="text-xs">
            Suscríbete para recibir nuestras últimas noticias y ofertas.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 my-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="ejemplo@correo.com" {...field} />
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
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-xs text-muted-foreground">
              Al enviar este formulario, aceptas recibir información y
              promociones relacionadas con nuestro negocio.
            </p>
            <Button type="submit" className="w-full">
              Suscribirme
            </Button>
          </form>
        </Form>
      </div>
      <div className="relative hidden md:block w-1/2">
        <Image
          priority={true}
          src="https://picsum.photos/seed/pvp/1080/1920"
          width={1080}
          height={1920}
          alt="Newsletter Promotion"
          className="absolute inset-0 object-cover w-full h-full"
        />
        {/* This button allows the user to close the modal */}

      </div>
    </DialogContent>
  );
};

const ModalTrigger = () => {
  // Control the dialog's state, initializing it to 'true' to be open by default.
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsOpen(true), 5000);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed top-1/2 right-0 z-[99] font-bold bg-white text-black hover:bg-white px-8 py-6 rounded-none modal-btn">
          15% OFF
        </Button>
      </DialogTrigger>
      <NewsletterModal />
    </Dialog>
  );
};

export default ModalTrigger;
