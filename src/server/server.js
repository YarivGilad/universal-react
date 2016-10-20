import fs from 'fs'
import path from 'path'
import bodyParser from 'body-parser'
import express from 'express'

// Webpack Requirements
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import dev_config from '../../webpack/webpack.config.dev'

//server side rendering react 
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
// import app_routes from './components/app'

const app = express()
const port = 3000

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(dev_config)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: dev_config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(express.static(path.resolve(__dirname, '../../static/')));

// API Routes
// app.get('/api/robots/list',(req,res) => {

//     //replace this file mock with a data source call...
//     fs.readFile(__dirname + '/data/MOCK_DATA.json','utf-8',(error,data) => {
//       if(error) 
//         res.status(500).send('data file error...')
//       else
//         res.status(200).send(data)
//     })
    
// })

app.get('/hello',(req,res) => {
    res.status(200).send('hello server')
})

// Render Initial HTML
app.get("/", (req, res)=> {

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);
  const dist = process.env.NODE_ENV === 'production' ?  '/dist' : '/static/dist';
  let html = `<!DOCTYPE html>
              <html>
                <head>
                  <title>React Universal App</title>
                  ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${dist + assetsManifest['/app.css']}' />` : ''}
                </head>
                <body>
                  <div id="root"></div>
                  
                    ${process.env.NODE_ENV === 'production'?
                          ` <script>        
                            //<![CDATA[
                                window.webpackManifest = ${JSON.stringify(chunkManifest)};
                            //]]>
                          </script>
                          <script src='${dist + assetsManifest['/vendor.js']}'></script>
                          <script src='${dist + assetsManifest['/app.js']}'></script>`
                      :
                          `<script src="${dist}/bundle.js"></script>`
                      
                    }
                </body>
              </html>`
  
  res.send(html)

})

app.listen(port, error => {
  if (error)  
    console.error(error)
  else 
    console.info(`==> 🌎 🤖 Listening on http://localhost:${port}/`)  
})
