import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'WhatsappsController.createSession')
Route.post('/test', 'WhatsappsController.test')
Route.post('/', 'MessengersController.send')
