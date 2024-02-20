import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  public execute(data: [any[], number], page: number, size: number) {
    const [rows, count] = data;
    return {
      data: rows,
      currentPage: page,
      itemsPerPage: size,
      totalItems: count,
      totalPages: Math.ceil(count / size),
    };
  }
}
