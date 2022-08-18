export enum Permissions {
  None = 1 << 0,
  Read = 1 << 1,
  Write = 1 << 2,
  Admin = 1 << 3,
  Owner = 1 << 4,
}

type PermissionsJSON = {
  -readonly [K in keyof typeof Permissions]: boolean;
};

export class PermissionUtil {
  constructor(public permission: number) {}

  hasPermission(permissionToCheck: Permissions) {
    return !!(permissionToCheck & this.permission);
  }

  addPermission(permissionToAdd: Permissions) {
    this.permission |= permissionToAdd;

    return this;
  }

  removePermission(permissionToRemove: Permissions) {
    this.permission ^= permissionToRemove;

    return this;
  }

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
