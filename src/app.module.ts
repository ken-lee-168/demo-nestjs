import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { ArticleController } from './article/article.controller';
import { AppService } from './app.service';
import envConfig from '../config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log('数据库', configService)
        return {
          type: 'mysql', // 数据库类型
          entities: [], // 数据表实体，synchronize为true时，自动创建表，生产环境建议关闭
          host: configService.get('DB_HOST'), // 主机，默认为localhost
          port: configService.get<number>('DB_PORT'), // 端口号
          username: configService.get('DB_USER'), // 用户名
          password: configService.get('DB_PASSWD'), // 密码
          database: configService.get('DB_DATABASE'), //数据库名
          timezone: '+08:00', //服务器上配置的时区
          synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
        }
      },
    }),
  ],
  controllers: [AppController, ArticleController],
  // 注册为全局守卫
  providers: [
    AppService,
  ],
})
export class AppModule {}
