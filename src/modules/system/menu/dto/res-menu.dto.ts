import { TreeDataDto } from 'src/common/dto/tree-data.dto';

export class ResRoleMenuTreeselectDto {
  /* Mảng id menu đã chọn */
  checkedKeys: number[];

  /* Danh sách menu */
  menus: TreeDataDto[];
}

export class Router {
  menuId: number;
  parentId: number;
  name?: string;
  path?: string;
  hidden?: boolean;
  redirect?: string;
  component?: string;
  alwaysShow?: boolean;
  meta?: {
    title?: string;
    icon?: string;
    noCache?: boolean;
    link?: string | null;
  };
  children?: Router[];
}
