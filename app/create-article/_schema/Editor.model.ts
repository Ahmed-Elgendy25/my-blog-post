export type EditorState = {
  content: string;
  title: string;
  subTitle: string;
  duration: string;
  generateContent?: boolean;
  thumbnail: File | null;
};

export type EditorActionTyped =
  | { type: "SET_CONTENT"; payload: string }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_SUBTITLE"; payload: string }
  | { type: "SET_DURATION"; payload: string }
  | { type: "GENERATE_CONTENT"; payload?: boolean }
  | { type: "SET_THUMBNAIL"; payload: File | null }
  | { type: "RESET_EDITOR" };
