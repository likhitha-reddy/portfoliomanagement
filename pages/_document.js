import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
          <script type="text/javascript">
            window.onbeforeunload = ()=>{return("Reloading will switch off your values for this year! Proceed with caution.")}
          </script>
        </Head>
        <body style={{ fontFamily: "Open Sans" }}>
          <Main />
          <NextScript />
          <style></style>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
