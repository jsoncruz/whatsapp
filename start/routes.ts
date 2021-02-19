import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'WhatsappsController.createSession')
Route.post('/', 'MessengersController.send')
