export type SpecificPostTyped = {
  content: string;
  authorId: number;
  author_id?: number; // Support snake_case from database
  duration_read: string;
  banner: string;
  title: string;
  date: string;
  sub_title: string;
};

export type UserTyped = {
  email: string;
  firstName: string;
  lastName: string;
  userImg: string;
};

export type imageUrls = {
  data: {
    publicUrl: string;
  };
};
