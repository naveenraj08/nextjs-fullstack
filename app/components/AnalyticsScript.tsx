import Script from "next/script"

export const AnalyticsScript = () => {
  return (
    <>
      {/* Script for Google Analytics library */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZTCBH6NB52"
        strategy="afterInteractive"
      />

      {/* Inline script for the dataLayer and gtag function */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZTCBH6NB52');
          `,
        }}
      />
    </>
  )
}
