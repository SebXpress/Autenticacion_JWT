import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export class JwtService {

    /**
     * Firma un token JWT basándose en el algoritmo configurado.
     * @param {Object} payload - Los datos del usuario a incluir en el token.
     * @returns {string} El token JWT generado.
     */
    
    static signToken(user){
        
        
        // creamos el payload con los datos basicos solicitados
        const payload = {
            sub: user.id,
            name: user.name
        };

        //verificamos si se configuro el algoritmo asimetrico RS256
        const isAsymmetric = config.ALGORITHM === 'RS256';
        
        // si es asimetrico usamos la llave privada, sino el secreto simple
        const secretOrKey = isAsymmetric? config.PRIVATE_KEY : config.JWT_SECRET;

        // validacion de seguridad por si no se cargo el archivo pem
        if(!secretOrKey){
            throw new Error(`Falta la llave o secreto para el algoritmo ${config.ALGORITHM}`);

        }

        // firmamos el token definiendo 1 minuto de vida util
        return jwt.sign(payload, secretOrKey,{
            algorithm: config.ALGORITHM,
            expiresIn: '1m',
        });
    
    }

    /**
     * Verifica un token JWT basándose en el algoritmo configurado.
     * @param {string} token - El token JWT a verificar.
     * @returns {Object|null} El payload decodificado o null si es inválido.
     */

    //logica de verificación
    static verifyToken(token){
        // 1. Verificar si config.ALGORITHM es 'RS256' o 'HS256'.
        // 2. Si es 'RS256', usar config.PUBLIC_KEY para verificar.
        // 3. Si es 'HS256', usar config.JWT_SECRET para verificar.
        // 4. Retornar el payload decodificado usando jwt.verify().
        // 5. Manejar posibles errores (token expirado, firma inválida) y retornar null.

        // revisamos nuevamente el tipo de algoritmo
        const  isAsymmetric = config.ALGORITHM === 'RS256';

        // si es asimetrico usamos la llave publica
        if(!secretOrKey){
            throw new Error(`falta la llave o secreto de verificacion para el algoritmo ${config.ALGORITHM}`);
        }

        // verificamos la firma y forzamos que respete el algoritmo configurado
        return jwt.verify(token,secretOrKey, { algorithms: [config.ALGORITHM] });
    }
    
}
