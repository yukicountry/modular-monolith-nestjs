import { BusinessRuleViolationError } from 'src/shared/domain/businessRuleViolation.error';

export class UserRegistrationIsNotConfirmedError extends BusinessRuleViolationError {}

export class EmailDuplicatedError extends BusinessRuleViolationError {}

export class UserRegistrationExpiredError extends BusinessRuleViolationError {}
