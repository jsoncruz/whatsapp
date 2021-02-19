import { existsSync, readFileSync, unlinkSync, writeFile } from 'fs'
import { Client, ClientSession, Message } from 'whatsapp-web.js'
import Logger from '@ioc:Adonis/Core/Logger'

export enum WhatsApp {
  session = './session.json',
}

export default class WhatsappsController {
  public client: Client

  public sessionData!: ClientSession

  public isReady = false

  constructor() {
    if (existsSync(WhatsApp.session)) {
      this.sessionData = JSON.parse(readFileSync(WhatsApp.session, { encoding: 'utf-8' }))
    }

    this.client = new Client({
      session: this.sessionData,
    })

    this.client.on('authenticated', this.authenticated)
    this.client.on('auth_failure', this.authFailure)
    this.client.on('disconnected', this.disconnected)
    this.client.on('message', this.waitMessages)
    this.client.on('ready', this.ready)
    this.client.initialize()
  }

  private authenticated(session: ClientSession) {
    this.sessionData = session
    writeFile(WhatsApp.session, JSON.stringify(session), (error) => {
      if (error) {
        throw error
      }
    })
  }

  private authFailure() {
    unlinkSync(WhatsApp.session)
    Logger.error('O WhatsApp Client não conseguiu fazer a autenticação')
  }

  private ready() {
    Logger.info('O WhatsApp Client está pronto')
  }

  private disconnected() {
    Logger.info('O WhatsApp Client está desconectado')
  }

  private generateQR() {
    return new Promise<string>((resolve) => {
      this.client.on('qr', (qr) => {
        resolve(qr)
      })
    })
  }

  public waitMessages(message: Message) {
    console.log(message)
  }

  public async createSession() {
    return await this.generateQR()
  }
}
