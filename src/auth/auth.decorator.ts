import { SetMetadata } from '@nestjs/common';
import { Permissions } from '@utils/permissions';

export const IS_PRIVATE_KEY = 'isPrivate';
export const Private = (permission: Permissions = Permissions.None) =>
  SetMetadata(IS_PRIVATE_KEY, permission);
