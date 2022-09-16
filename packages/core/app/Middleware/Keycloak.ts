import Env from '@ioc:Adonis/Core/Env'
import { verify } from 'jsonwebtoken'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

class KeycloakMiddleware {
  private tokenSignaturePublicKey: string

  constructor() {
    this.tokenSignaturePublicKey = Env.get('KEYCLOAK_REALM_TOKEN_SIGNATURE_PUBLIC_KEY')
  }

  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    let token = request.header('Authorization')
    if (token) {
      const formattedTokenSignaturePublicKey = `-----BEGIN PUBLIC KEY-----\r\n${this.tokenSignaturePublicKey}\r\n-----END PUBLIC KEY-----`

      try {
        const decodedAccessToken = verify(
          token.replace(/^Bearer /, ''),
          formattedTokenSignaturePublicKey
        )

        request['user'] = {
          id: decodedAccessToken.sub,
          email: decodedAccessToken['email'],
          name: decodedAccessToken['name'],
        }
      } catch (e) {
        response.unauthorized({ error: 'Invalid token' })
        return null
      }

      await next()
      return null
    }

    response.unauthorized({ error: 'Invalid token' })
  }
}

export default KeycloakMiddleware
