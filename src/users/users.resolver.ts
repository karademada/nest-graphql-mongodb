import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './models/user';
import { UsersService } from './users.service';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete.user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return await this.userService.getUser(getUserArgs);
  }
  @Query(() => [User], { name: 'users', nullable: 'items' })
  async getUsers(@Args() getUsersArgs: GetUsersArgs): Promise<User[]> {
    return await this.userService.getUsers(getUsersArgs);
  }

  // Mutation methods can be added here as needed
  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<User> {
    return await this.userService.createUser(createUserData);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): Promise<User> {
    return await this.userService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  async deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): Promise<User> {
    return await this.userService.deleteUser(deleteUserData);
  }
}
