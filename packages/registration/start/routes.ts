import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('registration', 'RegistrationsController').only(['store'])
}).prefix('/api')
