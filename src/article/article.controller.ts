import { Controller, Get, Post, Body, Query } from '@nestjs/common';

@Controller('article')
export class ArticleController {
  @Get()
  index() {
    return 'article index';
  }
  @Get('add')
  add() {
    return {
      name: 'ken',
    };
  }
  @Get('edit')
  edit(@Query('id') id: number) {
    console.log(id);
    return 'article edit';
  }
  @Get('delete')
  delete() {
    return 'article delete';
  }
  @Post('batchEdit')
  batchEdit(@Body() newsData: any) {
    console.log(newsData);
    return '批量编辑';
  }
}
