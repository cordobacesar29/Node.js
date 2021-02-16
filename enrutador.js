module.exports = {
    ruta: (data, callback) => {
        callback(200, {mensaje: 'esta es la ruta desde enrutador'});
    },
    mascotas:{
        get: (data, callback) => {
            if(typeof data.indice !== 'undefined') {
                if(global.recursos.mascotas[data.indice]) {
                    return callback(200, global.recursos.mascotas[data.indice]);
                }
                return callback(404, {
                    mensaje:`mascota con indice${data.indice} no encontrada`,
                });
            }
            callback(200, global.recursos.mascotas);
        },
        post: (data, callback) => {
            global.recursos.mascotas.push(data.payload);
            callback(201, data.payload);            
        },
        put: (data, callback) => {
            if(typeof data.indice !== 'undefined') {
                if(global.recursos.mascotas[data.indice]) {
                    global.recursos.mascotas[data.indice] = data.payload;
                    return callback(200, global.recursos.mascotas[data.indice]);
                }
                return callback(404, {
                    mensaje:`mascota con indice${data.indice} no encontrada`,
                });
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
        delete: (data, callback) => {
            if(typeof data.indice !== 'undefined') {
                if(global.recursos.mascotas[data.indice]) {
                    global.recursos.mascotas = global.recursos.mascotas.filter(
                    (_mascota, indice) => indice != data.indice);
                    return callback(204, {
                        mensaje: `el elemento con indice ${data.indice} fue eliminado`
                    });
                }
                return callback(404, {
                    mensaje:`mascota con indice${data.indice} no encontrada`,
                });
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
    },
    noEncontrado: (data, callback) => {
        callback(404,{mensaje: 'no encontrado enrutador'});
    }
};