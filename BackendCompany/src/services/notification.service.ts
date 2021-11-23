import {injectable, /* inject, */ BindingScope} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificationService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */
  SendNotificationBySms(phone: string, message: string): void {

    console.log("INSIDE METHOD SEND NOTIFICATION BY SMS")

    const accountSid = ''; // Your Account SID from www.twilio.com/console
    const authToken = ''; // Your Auth Token from www.twilio.com/console

    const sender = '+18508097793';
    const destiny = phone;

    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages
      .create({
        body: message,
        to: destiny, // Text this number
        from: sender, // From a valid Twilio number
      })
      .then((message: any) => console.log(message.sid));

  }

}
