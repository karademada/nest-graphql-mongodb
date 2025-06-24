import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; // Add this import
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Add this line
      autoSchemaFile: true,
    }),
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/', {
      dbName: 'nestgraphql',
      authSource: 'admin',
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
