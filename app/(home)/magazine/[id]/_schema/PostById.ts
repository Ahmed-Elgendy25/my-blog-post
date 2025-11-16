export type SpecificPostTyped = {
  content: string;
  author_id: string; // Support snake_case from database
  duration_read: string;
  banner: string;
  title: string;
  date: string;
  sub_title: string;
};

export type UserTyped = {
  email: string;
  first_name: string;
  last_name: string;
  user_img: string;
  author_id: string;
};

export type imageUrls = {
  data: {
    publicUrl: string;
  };
};
