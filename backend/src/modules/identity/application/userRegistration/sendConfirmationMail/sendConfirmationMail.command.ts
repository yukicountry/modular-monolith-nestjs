import { Command } from 'src/shared/application/commands/command.base';

type SendConfirmationMailCommandProps = {
  userRegistrationId: string;
  email: string;
};

export class SendConfirmationMailCommand extends Command<SendConfirmationMailCommandProps> {
  static COMMAND_TYPE = 'identity.sendConfirmationMail';

  getType(): string {
    return SendConfirmationMailCommand.COMMAND_TYPE;
  }

  static fromJSON(obj: any): SendConfirmationMailCommand {
    return new SendConfirmationMailCommand({
      id: obj.id,
      props: obj.props,
    });
  }
}
