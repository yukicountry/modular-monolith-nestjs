import { SendConfirmationMailCommand } from '../../application/userRegistration/sendConfirmationMail/sendConfirmationMail.command';

export const commandMapper = {
  [SendConfirmationMailCommand.COMMAND_TYPE]:
    SendConfirmationMailCommand.fromJSON,
} as const;
