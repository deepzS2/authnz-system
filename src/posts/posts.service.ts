import { Injectable } from '@nestjs/common'
import { PrismaService } from '@services/prisma.service'

import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, authorId: number) {
    return await this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId,
      },
    })
  }

  async findAll() {
    return await this.prisma.post.findMany({
      include: {
        author: {
          select: {
            email: true,
            id: true,
            name: true,
            permissions: true,
          },
        },
      },
    })
  }

  async findOne(id: number) {
    return await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            email: true,
            id: true,
            name: true,
            permissions: true,
          },
        },
      },
    })
  }

  async update(postId: number, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: updatePostDto,
    })
  }

  async remove(id: number) {
    return await this.prisma.post.delete({
      where: {
        id,
      },
    })
  }
}
