export interface PostTyped {
  id?: number;
  title: string;
  author: string;
  date: string;
  readTime: string;
  description?: string;
  category?: string;
  imageUrl?: string;
}

export const posts: PostTyped[] = [
  {
    id: 1,
    title: 'Hope dies last',
    author: 'Anne Henry',
    date: 'Mar 28, 2022',
    readTime: '10 Min',
    category: 'ART',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    imageUrl: '/post/post1_v2.jpg',
  },
  {
    id: 2,
    title: 'The best art museums',
    author: 'Louise Jensen',
    date: 'Mar 28, 2022',
    readTime: '10 Min',
    category: 'SCULPTURES',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    imageUrl: '/post/post2_v2.jpg',
  },
  {
    id: 3,
    title: 'The devil is in the details',
    author: 'Jane Cooper',
    date: 'Mar 28, 2022',
    readTime: '35 Min',
    category: 'ART',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    imageUrl: '/post/post3_v2.jpg',
  },
  {
    id: 4,
    title: 'An indestructible hope',
    author: 'Louise Jensen',
    date: 'Mar 30, 2022',
    readTime: '12 Min',
    category: 'ART',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    imageUrl: '/post/post4_v2.jpg',
  },
  {
    id: 5,
    title: 'Street art festival',
    author: 'Cristofer Vaccaro',
    date: 'Mar 28, 2022',
    readTime: '5 Min',
    category: 'STREET ART',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    imageUrl: '/post/post5_v2.jpg',
  },
  {
    id: 6,
    title: 'The chains of our lives',
    author: 'Louise Jensen',
    date: 'Mar 28, 2022',
    readTime: '30 Min',
    category: 'SCULPTURES',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    imageUrl: '/post/post6_v2.jpg',
  },
];
