const recursos = require('./recursos');
const mascotas = require('./rutas/mascotas');
const profesionales = require('./rutas/profesionales');

module.exports = {
    ruta: (data, callback) => {
        callback(200, {mensaje: 'esta es la ruta desde enrutador'});
    },
    mascotas: mascotas(recursos.mascotas),
    profesionales: profesionales(recursos.profesionales),
    noEncontrado: (data, callback) => {
        callback(404,{mensaje: 'no encontrado enrutador'});
    }
};