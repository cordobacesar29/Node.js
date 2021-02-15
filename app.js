const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const callbackDelServidor = (req, res) => {

    // 1. obtener url desde el objeto request
    const urlActual= req.url;
    const urlParseada = url.parse(urlActual, true);

    // 2. obtener la ruta
    const ruta = urlParseada.pathname;

    // 3 limpiar ruta quitando su slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g,'');

    // 3.1 obtener método http
    const metodo = req.method.toLowerCase();
    // 3.2 obtener variables del query url
    const { query = {} } = urlParseada;

    // 3.3 obtener headers
    const {headers = {} } = req;
    //3.4 obtener payload, en el caso de haber uno
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    // 3.4.1 aculuar la data cuando el req reciba un payload
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    // 3.4.2 termina de acumular datos y decoder finaliza
    req.on('end', () => {
        buffer += decoder.end();
        // 3.5 ordenar la data
        const data = {
            ruta: rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer
        };
        // 3.6 elegir el manejador de la respuesta //handler
        let handler;
        if(rutaLimpia && enrutador[rutaLimpia]) {
            handler = enrutador[rutaLimpia];
        } else {
            handler = enrutador.noEncontrado;
        };
        // 4. ejecutar handler para enviar la respuesta
        if(typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.writeHead(statusCode);
                // linea donde estamos respondiendo a la aplicacion cliente
                res.end(respuesta);
            });
        }        
    });
};

const enrutador = {
    ruta: (data, callback) => {
        callback(200, {mensaje: 'esta es la ruta desde enrutador'});
    },
    usuarios: (data, callback) => {
        callback(200,[{nombre: 'usuario1'}, {nombre: 'usuario2'}]);
    },
    noEncontrado: (data, callback) => {
        callback(404,{mensaje: 'no encontrado enrutador'});
    }
}

const server = http.createServer(callbackDelServidor);

server.listen(5000, () => {
    console.log('el servidor está funcionando');
});