import { Users } from '@/db/entities/Users';
import { IUserProfile } from '@interfaces/users';

export const mapUserResponse = (user: Users): IUserProfile => ({
  id: user.id,
  wallet_id: user.wallet_id,
  wallet_address: user.wallet_address
});