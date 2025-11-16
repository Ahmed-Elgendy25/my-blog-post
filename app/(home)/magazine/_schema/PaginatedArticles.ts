// Post data structure
export interface Post {
  id: number;
  title: string;
  sub_title: string;
  date: string;
  duration_read: string;
  authorId: number;
  authorName: string;
  banner: string;
}

// Sort details
interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// Pagination details
interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: SortInfo;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// Main API response
export interface BlogPostsResponse {
  content: Post[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: SortInfo;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
