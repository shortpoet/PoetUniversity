// https://stackoverflow.com/questions/44600943/fs-readfilesync-is-not-file-relative-node-js
// just had the incorrect relative path but path.resolve method prints paths in error and helped debug
// https://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application

// https://stackoverflow.com/questions/21397809/create-a-trusted-self-signed-ssl-cert-for-localhost-for-use-with-express-node
// openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256
// setup file at bottom

// https://www.teilin.net/2018/07/05/self-signed-certificate-and-configuring-identityserver-4-with-certificate/
// double first slash -> https://stackoverflow.com/questions/54258996/git-bash-string-parameter-with-at-start-is-being-expanded-to-a-file-path
// openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout poet.key -out poet.crt -subj "//CN=PoetUniversity" -days 3650
// openssl pkcs12 -export -out poet.pfx -inkey poet.key -in poet.crt -certfile poet.crt

// navigating to api url also is a way to enable exemption 

const fs = require('fs')
const path = require("path")
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    // open: process.platform === 'darwin',
    // adding public seemed to do the same as
    // adding the below cmd to package.json
    // "servelocal": "vue-cli-service serve --host localhost",
    public: 'https://localhost:8080/',
    port: 8080, // CHANGE YOUR PORT HERE!
    https: {
      // key: fs.readFileSync('./server/key.pem'),
      // cert: fs.readFileSync('./server/cert.pem')
      // key: fs.readFileSync('../../../../certs/PoetUniversityCerts/cert.key'),
      // cert: fs.readFileSync('../../../../certs/PoetUniversityCerts/cert.pem')
      // key: fs.readFileSync(path.resolve(__dirname, './server/key.pem')),
      // cert: fs.readFileSync(path.resolve(__dirname, './server/cert.pem'))    
      key: fs.readFileSync(path.resolve(__dirname, '../../../../certs/PoetUniversityCerts/cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, '../../../../certs/PoetUniversityCerts/cert.pem'))    
    }
    // hotOnly: false,
  },
}

// [req]
// distinguished_name = PoetUniversity
// x509_extensions = v3_req
// prompt = no
// [PoetUniversity]
// C = US
// ST = Missouri
// L = Saint Louis
// O = PoetUniversity
// OU = Vue Server
// CN = www.localhost.com
// [v3_req]
// keyUsage = critical, digitalSignature, keyAgreement
// extendedKeyUsage = serverAuth
// subjectAltName = @alt_names
// [alt_names]
// DNS.1 = www.localhost.com
// DNS.2 = localhost.com
// DNS.3 = localhost