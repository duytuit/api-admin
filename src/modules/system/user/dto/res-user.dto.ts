import { Post } from '../../post/entities/post.entity';
import { Role } from '../../role/entities/role.entity';
import { User } from '../entities/user.entity';

export class ResUserDto extends User {
  /* Đăng ID */
  deptId: number;

  /* Mảng ID công việc */
  postIds: number[];

  /* Mảng ID ký tự */
  roleIds: number[];
}

/* thông tin người dùng */
export class ResUserInfoDto {
  /* thông tin người dùng */
  data?: ResUserDto;

  /* Mảng ID vị trí của người dùng */
  postIds?: number[];

  /* Mảng ID ký tự của người dùng */
  roleIds?: number[];

  /* Kéo mảng vị trí */
  posts: Post[];

  /* Kéo mảng vai trò */
  roles: Role[];
}

export class ResHasRoleDto extends Role {
  /* Liệu người dùng có vai trò này không */
  flag: boolean;
}

export class ResAuthRoleDto {
  roles: ResHasRoleDto[];
  user: User;
}
