import { Private } from '@auth/auth.decorator'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Permissions, PermissionUtil } from '@utils/permissions'
import { Request } from 'express'

import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Private(Permissions.Write)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    return await this.postsService.create(createPostDto, req.user.id)
  }

  @Get()
  async findAll() {
    return await this.postsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(+id)

    if (!post) throw new NotFoundException('Post not found with that ID')

    return post
  }

  @Private(Permissions.Write)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request,
  ) {
    const postExists = await this.postsService.findOne(+id)
    const permission = new PermissionUtil(req.user.permissions)

    if (!postExists) throw new NotFoundException('Post not found with that ID')

    // Not author and don't have owner permission
    if (
      postExists.authorId !== req.user.id &&
      !permission.hasPermission(Permissions.Owner)
    )
      throw new UnauthorizedException('You are not the owner of this post!')

    return this.postsService.update(+id, updatePostDto)
  }

  @Private(Permissions.Write)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const postExists = await this.postsService.findOne(+id)
    const permission = new PermissionUtil(req.user.permissions)

    if (!postExists) throw new NotFoundException('Post not found with that ID')

    // Not author and don't have owner permission
    if (
      postExists.authorId !== req.user.id &&
      !permission.hasPermission(Permissions.Owner)
    )
      throw new UnauthorizedException('You are not the owner of this post!')

    return this.postsService.remove(+id)
  }
}
