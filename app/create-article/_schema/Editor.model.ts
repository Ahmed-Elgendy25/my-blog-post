export type EditorState = {
    content: string;
    title: string;
    subTitle: string;
    duration: string;
    generateContent:boolean;
  };
  
  export type EditorAction = 
    | { type: 'SET_CONTENT'; payload: string }
    | { type: 'SET_TITLE'; payload: string }
    | { type: 'SET_SUBTITLE'; payload: string }
    | { type: 'SET_DURATION'; payload: string }
    | { type: 'GENERATE_CONTENT';  }
    | { type: 'RESET_EDITOR';};
