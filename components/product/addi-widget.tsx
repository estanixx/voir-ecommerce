import Script from "next/script";

export function AddiWidget({price}: {price: string}) {
    // Turn the price string into number, remove commas, and currency
    const numericPrice: number = parseFloat(price.replace(/[^0-9.-]+/g,""));

    return <>
    <Script src="https://s3.amazonaws.com/widgets.addi.com/bundle.min.js"></Script>
    {/* @ts-expect-error This since addi requires the <addi-widget> element to be defined */}
    <addi-widget price={numericPrice} ally-slug="voir-ecommerce"></addi-widget>
    </>
}