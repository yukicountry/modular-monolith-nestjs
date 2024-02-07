import { MailerService } from '@nestjs-modules/mailer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendConfirmationMailCommand } from './sendConfirmationMail.command';
import { UnitOfWork } from 'src/shared/infra/unitOfWork/unitOfWork.decorator';

@CommandHandler(SendConfirmationMailCommand)
export class SendConfirmationMailCommandHandler
  implements ICommandHandler<SendConfirmationMailCommand, void>
{
  constructor(private readonly mailer: MailerService) {}

  @UnitOfWork
  async execute(command: SendConfirmationMailCommand): Promise<void> {
    console.log('SendConfirmationMailCommandHandler');

    this.mailer.sendMail({
      to: command.props.email,
      subject: '登録確認メール',
      template: './userRegistrationConfirmationMail',
      context: {
        link: `http://localhost:5173/create?id=${command.props.userRegistrationId}`,
      },
    });
  }
}
