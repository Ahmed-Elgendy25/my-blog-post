import { EditorActionTyped, EditorState } from "../_schema/Editor.model";

export const editorReducer = (
  state: EditorState,
  action: EditorActionTyped,
): EditorState => {
  switch (action.type) {
    case "SET_CONTENT":
      return { ...state, content: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_SUBTITLE":
      return { ...state, subTitle: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "GENERATE_CONTENT":
      return {
        ...state,
        generateContent: !state.generateContent || action.payload,
      };
    case "RESET_EDITOR":
      return initialState;
    default:
      return state;
  }
};

export const initialState: EditorState = {
  content: "",
  title: "",
  subTitle: "",
  duration: "",
  generateContent: false,
};
