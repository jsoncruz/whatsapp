import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import WhatsappsController from 'App/Controllers/Http/WhatsappsController'

export default class AppProvider {
  public static needsApplication = true

  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    new WhatsappsController()
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
