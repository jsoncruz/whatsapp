import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Message, MessageContent, MessageSendOptions } from 'whatsapp-web.js'
import WhatsappsController from './WhatsappsController'

export default class MessengersController extends WhatsappsController {
  private async messenger(
    chatId: string,
    content: MessageContent,
    options?: MessageSendOptions | undefined
  ) {
    return new Promise<Message>((resolve) => {
      this.client.on('ready', async () => {
        const message = await this.client.sendMessage(chatId, content, options)
        resolve(message)
      })
    })
  }

  public async send({ request }: HttpContextContract) {
    const { phoneNumber, content } = request.only(['phoneNumber', 'content'])
    if (phoneNumber && content) {
      try {
        return await this.messenger(phoneNumber, content)
      } catch ({ message }) {
        return message
      }
    } else {
      return { error: 'Parâmetros insuficientes para o envio!' }
    }
  }
}
