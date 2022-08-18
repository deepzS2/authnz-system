export enum Permissions {
  None = 1 << 0,
  Read = 1 << 1,
  Write = 1 << 2,
  Admin = 1 << 3,
  Owner = 1 << 4,
}

type PermissionsJSON = Omit<
  {
    -readonly [K in keyof typeof Permissions]: boolean;
  },
  number
>;

export class PermissionUtil {
  /**
   * A class to use the most common permission functions!
   * @param permission Combinations of the permissions enums
   * @example
   * import { PermissionUtil, Permissions } from '@utils/permissions'
   *
   * const permission = new PermissionUtil(Permissions.None + Permissions.Read)
   */
  constructor(public permission: number) {}

  /**
   * Check the permissions of the permission prop
   * @param permissionToCheck Permission enum to check
   * @returns True if has permission
   */
  hasPermission(permissionToCheck: Permissions) {
    return !!(permissionToCheck & this.permission);
  }

  /**
   * Add permission to the permission prop
   * @param permissionToAdd Permission enum to add
   */
  addPermission(permissionToAdd: Permissions) {
    this.permission |= permissionToAdd;

    return this;
  }

  /**
   * Remove permission to the permission prop
   * @param permissionToRemove Permission enum to remove
   */
  removePermission(permissionToRemove: Permissions) {
    this.permission ^= permissionToRemove;

    return this;
  }

  /**
   * Transforms the enum to a object checking for each permission key
   * @returns Object with permission keys and if has permission
   */
  toJSON(): PermissionsJSON {
    const keys = Object.keys(Permissions) as Array<keyof typeof Permissions>;

    const result = keys.reduce((prev, curr) => {
      // If is number don't add to the object
      if (!isNaN(Number(curr))) return prev;

      prev[curr] = this.hasPermission(Permissions[curr]);

      return prev;
    }, {});

    return result as PermissionsJSON;
  }
}
