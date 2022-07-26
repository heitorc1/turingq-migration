import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'

let authorizationMiddleware = 'auth'
const useKeycloak = Env.get('USE_KEYCLOAK')

if (useKeycloak) {
  authorizationMiddleware = 'keycloak'
}

Route.resource('questions', 'QuestionsController').apiOnly().middleware({
  store: authorizationMiddleware,
  update: authorizationMiddleware,
  destroy: authorizationMiddleware,
})

Route.resource('questions.answers', 'AnswersController').apiOnly().middleware({
  store: authorizationMiddleware,
  update: authorizationMiddleware,
  destroy: authorizationMiddleware,
})

Route.resource('registration', 'RegistrationsController').only(['store'])

if (!useKeycloak) {
  Route.post('auth/login', 'AuthController.login')
  Route.get('auth/logout', 'AuthController.logout').middleware('auth')
}
