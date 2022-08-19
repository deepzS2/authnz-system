import { User as PrismaUser } from '@prisma/client'

declare global {
  namespace Express {
    export interface User {
      id: PrismaUser['id']
      name: PrismaUser['name']
      permissions: PrismaUser['permissions']
    }
  }
}
