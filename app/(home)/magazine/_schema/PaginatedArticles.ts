// Post data structure
export interface Post {
    id: number;
    title: string;
    date: string;
    durationRead: string;
    authorId: number;
    authorName: string;
    postImg: string;
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
  