import { JwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
    // TODO: Implementar middleware de autenticación.
    // 1. Extraer el token del header 'Authorization' (formato: Bearer <token>).
    // 2. Si no hay token, responder con status 401.
    // 3. Llamar a JwtService.verifyToken(token).
    // 4. Si el token es válido, adjuntar el payload a req.user y llamar a next().
    // 5. Si el token es inválido, responder con status 403.

    // extraemos la cabecera de autorizacion de la peticion http
    const autHeader = req.headers['authorization'];

    // si no existe la cabecera o no tiene la palabra, bloqueamos el acceso
    if(!autHeader || !autHeader.startsWith('Bearer')){
        return res.satatus(401).json({
            error: 'Unauthorized',
            message: 'acceso denegado, ausencia de bearer token en las cabeceras '
        });
    }

    // separamos la palabra bearer del token real usando un espacio
    const token = autHeader.split(' ')[1];

    try{
        //decodificamos y validamos la firma del toke
        const decoded = JwtService.verifyToken(token);

        // si es valido vamos a guardar los datos del usuario en la peticion actual
        req.user = decoded;

        //permitimos que la peticion continue hacia el controlador de la ruta
        next();
    }catch (error){
        // comprobamos si el error es por el tiempo de expiracion
        if(error.name === 'TokenExpiredError'){
            return res.satatus(401).json({
                error: 'TokenExpiredError',
                message: 'El token ha expirado, supero el limite de 1 minuto esperado',
            });
        }

        // si es clualquier otro error significa que el token fue manipulado
        return res.status(403).json({
            error: 'Forbidden',
            message: 'Token invalido o firma digital corrupta',
        });
    }
};
