export class ResourceController {
    /**
     * Simula un recurso privado del Microservicio Alpha.
     */
    static getAlphaPrivateData(req, res) {
        // TODO: Implementar respuesta para Microservicio Alpha.
        // 1. Responder con un mensaje que indique acceso exitoso al Servicio Alpha.
        // 2. Incluir datos del usuario autenticado (req.user) en la respuesta.
        
        //respondemos con exito indicando que se entro al microservicio alfa
        return res.status(200).json({
            service: 'Microservicio Alpha',
            status: 'Authorized',
            message: 'Conexion exitosa a la zona segura de alpha de forma stateless',

            // enviamos los datos del usuario extraidos del token por el middleware
            user: req.user
        });
    }

    /**
     * Simula un recurso privado del Microservicio Beta.
     */
    static getBetaPrivateData(req, res) {
        // TODO: Implementar respuesta para Microservicio Beta.
        // 1. Responder con un mensaje que indique acceso exitoso al Servicio Beta.
        // 2. Incluir datos del usuario autenticado (req.user) en la respuesta.
        
        //respondemos con exito indicando que se entro al microservicio beta
        return res.status(200).json({
            service: 'Microservicio Beta',
            status: 'Authorized',
            message: 'Conexion exitosa a la zona segura de beta utilizando llave publica'
        });
    }
}
