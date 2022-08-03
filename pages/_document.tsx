// A custom 'Document' can update the <html> and <body> tags used to render a Page.
// any changes made on this file will only take effect after restarting the environment

import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
