export class GroupDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly creator_id: string,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}
