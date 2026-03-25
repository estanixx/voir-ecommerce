import Script from "next/script";

export function TiktokPixel() {
    return <Script src="tiktok-pixel.js" strategy="lazyOnload" />
}
