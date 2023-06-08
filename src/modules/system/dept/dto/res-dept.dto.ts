import { TreeDataDto } from 'src/common/dto/tree-data.dto';

export class ResRoleDeptTreeselectDto {
  /* Mảng id menu đã chọn */
  checkedKeys: number[];

  /* Danh sách menu */
  depts: TreeDataDto[];
}
