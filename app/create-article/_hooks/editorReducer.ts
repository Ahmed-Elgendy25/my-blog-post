import { EditorAction, EditorState } from "../_schema/Editor.model";

export const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
    switch (action.type) {
      case 'SET_CONTENT':
        return { ...state, content: action.payload };
      case 'SET_TITLE':
        return { ...state, title: action.payload };
      case 'SET_SUBTITLE':
        return { ...state, subTitle: action.payload };
      case 'SET_DURATION':
        return { ...state, duration: action.payload };
      default:
        return state;
    }
  };
  
  export const initialState: EditorState = {
    content: '',
    title: '',
    subTitle: '',
    duration: ''
  };