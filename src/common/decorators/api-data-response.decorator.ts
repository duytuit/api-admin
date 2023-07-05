/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-13 09:48:49
 * @LastEditTime: 2022-09-18 11:07:52
 * @LastEditors: Please set LastEditors
 * @Description: Đặt giá trị trả về trong thuộc tính dữ liệu openApi Người trang trí
 * @FilePath: /meimei-admin/src/common/decorators/api-data-response.decorator.ts
 * You can you up，no can no bb！！
 */

import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export enum typeEnum {
  'string' = 'string',
  'number' = 'number',
  'boolean' = 'boolean',
  'object' = 'object',
  'stringArr' = 'stringArr',
  'numberArr' = 'numberArr',
  'booleanArr' = 'booleanArr',
  'objectArr' = 'objectArr',
}

export const ApiDataResponse = <TModel extends Type<any>>(
  type: typeEnum,
  model?: TModel,
) => {
  const applyDecoratorArr = [];
  let data: Object;

  switch (type) {
    case typeEnum.string:
    case typeEnum.number:
    case typeEnum.boolean:
      data = {
        type: type,
      };
      break;
    case typeEnum.stringArr:
    case typeEnum.numberArr:
    case typeEnum.booleanArr:
      data = {
        type: 'array',
        items: {
          type: type.slice(0, -3),
        },
      };
      break;
    case typeEnum.object:
      if (!model)
        throw Error('Giá trị trả lại typeEnum.object Vui lòng điền vào loại!');
      applyDecoratorArr.push(ApiExtraModels(model));
      data = {
        $ref: getSchemaPath(model),
      };
      break;
    case typeEnum.objectArr:
      if (!model)
        throw Error(
          'Giá trị trả lại typeEnum.objectArr Vui lòng điền vào loại!',
        );
      applyDecoratorArr.push(ApiExtraModels(model));
      data = {
        type: 'array',
        items: { $ref: getSchemaPath(model) },
      };
    default:
      break;
  }
  applyDecoratorArr.push(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              data: data,
            },
          },
        ],
      },
    }),
  );
  return applyDecorators(...applyDecoratorArr);
};
