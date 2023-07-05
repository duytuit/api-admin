export class TreeDataDto {
  /* Giá trị ID */
  id: number;

  /* tên */
  label: string;

  /* Sub -array */
  // eslint-disable-next-line @typescript-eslint/ban-types
  children?: TreeDataDto[];
}
