import { SetMetadata } from '@nestjs/common'
import { Permissions } from '@utils/permissions'

export const IS_PRIVATE_KEY = 'isPrivate'

/**
 * Decorator to set a route private
 * @param permission Permission necessary to access the route
 */
export const Private = (permission: Permissions = Permissions.None) =>
  SetMetadata(IS_PRIVATE_KEY, permission)
