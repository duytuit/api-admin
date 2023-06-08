/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SharedService } from 'src/shared/shared.service';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { User } from '../user/entities/user.entity';
import { ReqAddDeptDto, ReqDeptListDto } from './dto/req-dept.dto';
import { Dept } from './entities/dept.entity';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Dept) private readonly deptRepository: Repository<Dept>,
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,
    private readonly sharedService: SharedService,
  ) {}

  /* Thêm Hoặc bộ phận biên tập */
  async addOrUpdate(reqAddDeptDto: ReqAddDeptDto) {
    if (reqAddDeptDto.parentId) {
      const parentDept = await this.findById(reqAddDeptDto.parentId);
      reqAddDeptDto.parent = parentDept;
    }
    await this.deptRepository.save(reqAddDeptDto);
  }

  /* Danh sách bộ phận truy vấn */
  async list(reqDeptListDto: ReqDeptListDto) {
    const where: FindOptionsWhere<Dept> = { delFlag: '0' };
    if (reqDeptListDto.deptName) {
      where.deptName = Like(`%${reqDeptListDto.deptName}%`);
    }
    if (reqDeptListDto.status) {
      where.status = reqDeptListDto.status;
    }
    return this.deptRepository
      .createQueryBuilder('dept')
      .select('dept.deptId', 'deptId')
      .addSelect('dept.createTime', 'createTime')
      .addSelect('dept.deptName', 'deptName')
      .addSelect('dept.orderNum', 'orderNum')
      .addSelect('dept.status', 'status')
      .addSelect('ifnull(dept.parentDeptId,0)', 'parentId')
      .where(where)
      .orderBy('dept.orderNum', 'ASC')
      .addOrderBy('dept.createTime', 'ASC')
      .getRawMany();
  }

  /* Truy vấn thông qua ID */
  async findById(deptId: number) {
    return this.deptRepository.findOneBy({ deptId });
  }

  /* Thông qua truy vấn ID, hãy trả lại dữ liệu gốc*/
  async findRawById(deptId: number | string) {
    return await this.deptRepository
      .createQueryBuilder('dept')
      .select('dept.deptId', 'deptId')
      .addSelect('dept.createTime', 'createTime')
      .addSelect('dept.deptName', 'deptName')
      .addSelect('dept.orderNum', 'orderNum')
      .addSelect('dept.status', 'status')
      .addSelect('dept.leader', 'leader')
      .addSelect('dept.phone', 'phone')
      .addSelect('dept.email', 'email')
      .addSelect('ifnull(dept.parentDeptId,0)', 'parentId')
      .where('dept.delFlag = 0')
      .andWhere('dept.deptId = :deptId', { deptId })
      .getRawOne();
  }

  /* Truy vấn mọi thứ ngoại trừ chính bạn (bao gồm cả lớp con) */
  async outList(deptId: number | string) {
    return await this.deptRepository
      .createQueryBuilder('dept')
      .select('dept.deptId', 'deptId')
      .addSelect('dept.createTime', 'createTime')
      .addSelect('dept.deptName', 'deptName')
      .addSelect('dept.orderNum', 'orderNum')
      .addSelect('dept.status', 'status')
      .addSelect('ifnull(dept.parentDeptId,0)', 'parentId')
      .where('dept.delFlag = 0')
      .andWhere("concat('.',dept.mpath) not like :v", {
        v: '%.' + deptId + '.%',
      })
      .getRawMany();
  }

  /* Kiểm tra tất cả trẻ em thông qua ParentID*/
  async findChildsByParentId(parentId: string): Promise<Dept[]> {
    return this.deptRepository
      .createQueryBuilder('dept')
      .where('dept.delFlag = 0')
      .andWhere('dept.parentDeptId = :parentId', { parentId })
      .getMany();
  }

  /* Bộ phận Xoá */
  async delete(deptId: string, userName: string) {
    return this.deptRepository
      .createQueryBuilder()
      .update()
      .set({ delFlag: '2', updateBy: userName })
      .where({
        deptId,
      })
      .execute();
  }

  /* Yêu cầu Cấu trúc cây của bộ phận theo quyền dữ liệu */
  async treeselectByOrg(dataScopeSql: string) {
    const queryBuilde = this.deptRepository
      .createQueryBuilder('dept')
      .select('dept.deptId', 'id')
      .addSelect('dept.deptName', 'label')
      .addSelect('dept.parentDeptId', 'parentId')
      .innerJoin(User, 'user', 'dept.createBy = user.userName')
      .where('dept.delFlag = 0');
    if (dataScopeSql) {
      queryBuilde.andWhere(dataScopeSql);
    }
    const deptArr = await queryBuilde.getRawMany();
    return this.sharedService.handleTree(deptArr);
  }

  /* Cấu trúc cây của bộ phận truy vấn */
  async treeselect() {
    const deptArr = await this.deptRepository
      .createQueryBuilder('dept')
      .select('dept.deptId', 'id')
      .addSelect('dept.deptName', 'label')
      .addSelect('dept.parentDeptId', 'parentId')
      .where('dept.delFlag = 0')
      .getRawMany();
    return this.sharedService.handleTree(deptArr);
  }

  /* Danh sách quyền dữ liệu của vai trò */
  async getCheckedKeys(roleId: number | string): Promise<number[]> {
    const deptArr = await this.deptRepository
      .createQueryBuilder('dept')
      .select('dept.deptId', 'deptId')
      .addSelect('dept.mpath', 'mpath')
      .innerJoin('dept.roles', 'role', 'role.roleId = :roleId', { roleId })
      .where('dept.delFlag = 0')
      .andWhere('role.delFlag = 0')
      .getRawMany();
    return deptArr.map((dept) => dept.deptId);
  }

  /* Yêu cầu thông qua mảng ID */
  async listByIdArr(deptIdArr: number[]): Promise<Dept[]> {
    return this.deptRepository.find({
      where: {
        deptId: In(deptIdArr),
        delFlag: '0',
      },
    });
  }

  /*Yêu cầu thông qua mảng ID và chỉ lấy cấp độ cuối cùng */
  async listByIdArrFilter(deptIdArr: number[]): Promise<Dept[]> {
    const queryBuilder = this.deptRepository.createQueryBuilder('dept');
    queryBuilder
      .select('dept.deptId', 'deptId')
      .addSelect('dept.mpath')
      .where('dept.delFlag = 0')
      .andWhere({
        deptId: In(deptIdArr),
      })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('dept2.deptId')
          .from(Dept, 'dept2')
          .where('dept2.delFlag = 0')
          .andWhere('dept.deptId != dept2.deptId')
          .andWhere({
            deptId: In(deptIdArr),
          })
          .andWhere(
            "concat('.',dept2.mpath) like concat('%.',dept.dept_id,'.%')",
          )
          .getQuery();
        return 'not exists' + subQuery;
      });
    const DeptArr = await queryBuilder.getRawMany();
    return DeptArr;
  }
}
