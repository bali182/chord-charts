import React, { PureComponent } from 'react'

// Weird wrapper so that it renders properly in puppeteer too...
export class HtmlWrapper extends PureComponent {
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Chord charts</title>
          <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet" />
          <style
            dangerouslySetInnerHTML={{
              __html: `
        /* 
          http://meyerweb.com/eric/tools/css/reset/ 
          v2.0 | 20110126
          License: none (public domain)
        */
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed, 
        figure, figcaption, footer, header, hgroup, 
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure, 
        footer, header, hgroup, menu, nav, section {
          display: block;
        }
        body {
          line-height: 1;
        }
        ol, ul {
          list-style: none;
        }
        blockquote, q {
          quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
          content: '';
          content: none;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
        div, span {
          box-sizing: border-box;
          color: #444;
          font-family: "Nunito", sans-serif;
        }`,
            }}></style>
        </head>
        <body>
          <div style={{ width: '100vw', height: '100vh' }}>{this.props.children}</div>
        </body>
      </html>
    )
  }
}
