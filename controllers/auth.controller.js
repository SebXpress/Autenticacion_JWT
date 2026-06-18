import { JwtService } from '../services/jwt.service.js';

export class AuthController {
    /**
     * Simula un servidor de autenticación que genera un token.
     */
    static async generateToken(req, res) {
        // TODO: Implementar generación de token.
        // 1. Obtener credenciales (username/password) del req.body.
        // 2. Validar credenciales de forma simulada (ej. if user === 'admin'...).
        // 3. Si son válidas, crear un payload y llamar a JwtService.signToken(payload).
        // 4. Responder con el token generado.
        // 5. Si son inválidas, responder con status 401.
    
        //obtenemos el usuario y contraseña de la peticion
        const {username, password} = req.body;

        // simulamos que verificamos las credenciales en una base de datos
        if(username === 'admin' && password === 'secure1230'){

            //creamos un usuario de prueba para inyectarlo en el payload
            const mockUser = {id:'usr_998822', name: 'Administrador del sistema'};

            //llamamos a nuestro servicio para firmar y crear el token
            const token = JwtService.signToken(mockUser);

            // devolvemos el token al cliente con status 200 de exito
            return res.status(200).json({
                message: 'autenticacion existosa',
                access_token: token,
                token_type: 'Bearer',
                expires_in: '60s'
            });
        }

        // si los datos ingresados son incorrectos devolvemos un error tipo 401
        return res.status(401).json({
            erro: 'Unauthorized',
            message: 'Credenciales invalidas'
        });
    }
}
