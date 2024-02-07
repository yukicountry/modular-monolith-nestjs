export interface UserCounter {
  countNonDeletedUsersWithEmail(email: string): Promise<number>;
}
