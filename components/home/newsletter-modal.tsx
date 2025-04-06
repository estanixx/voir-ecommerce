"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as fonts from "@/fonts/index";
import Image from "next/image";
import { DatePicker } from "../ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewsletterSubscriber } from "@/lib/shopify"; // Import the function we created
import { useState } from "react";
import { Loader2 } from "lucide-react";

const nlFormSchema = z.object({
  birthday: z.date({
    required_error: "Por favor selecciona tu fecha de nacimiento",
    invalid_type_error: "Esto no es una fecha válida",
  }),
  name: z.string()
    .min(1, { message: "Por favor ingresa tu nombre" })
    .max(50, { message: "El nombre no puede exceder 50 caracteres" }),
  email: z.string()
    .min(1, { message: "Por favor ingresa tu correo electrónico" })
    .email({ message: "Debe ser un correo electrónico válido" }),
});

function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const form = useForm<z.infer<typeof nlFormSchema>>({
    resolver: zodResolver(nlFormSchema),
    defaultValues: {
      birthday: new Date(),
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof nlFormSchema>) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    try {
      // Split name into first and last names
      const [firstName, ...lastNameParts] = data.name.split(' ');
      const lastName = lastNameParts.join(' ');

      const result = await createNewsletterSubscriber(
        data.email,
        firstName,
        lastName
      );
      console.log(result);
      if (result.errors) {
        const emailError = result.errors.find(e => e.field.includes('email'));
        if (emailError?.message.includes('already exists')) {
          setErrorMessage("Este correo electrónico ya está suscrito a nuestro newsletter.");
        } else {
          setErrorMessage("Hubo un error al procesar tu suscripción. Por favor intenta nuevamente.");
        }
        return;
      }

      setSuccessMessage("¡Gracias por suscribirte! Un código de descuento será enviado a tu correo electrónico.");
      form.reset();
    } catch (error) {
      console.error("Subscription error:", error);
      setErrorMessage("Ocurrió un error inesperado. Por favor intenta nuevamente más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-medium text-gray-700">
                Fecha de Nacimiento
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <DatePicker
                  selected={field.value}
                  onSelect={field.onChange}
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Nombre completo
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Tu nombre completo" 
                  {...field} 
                  className="focus-visible:ring-2 focus-visible:ring-primary text-black text-sm"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Correo electrónico
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="tu@email.com" 
                  {...field} 
                  className="focus-visible:ring-2 focus-visible:ring-primary text-black text-sm"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {errorMessage && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="text-green-600 text-sm p-2 bg-green-50 rounded-md">
            {successMessage}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            "Suscribirse"
          )}
        </Button>
      </form>
    </Form>
  );
}

export function NewsletterModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className={`${fonts.complementary.className} cursor-pointer`}
        >
          Suscríbete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <div className="relative">
          <Image
            src="https://cdn.shopify.com/s/files/1/0903/2145/3419/files/newsletter-banner.gif"
            alt="newsletter-banner"
            width={800}
            height={450}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start p-6 text-white">
            <DialogTitle className="text-2xl font-bold">Voir Newsletter</DialogTitle>
            <DialogDescription className="text-white/90">
              Únete a nuestra comunidad y recibe ofertas exclusivas
            </DialogDescription>
          </div>
        </div>
        
        <div className="p-6">
          <NewsletterForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}