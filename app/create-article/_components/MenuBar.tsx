/* eslint-disable react/display-name */
import { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  ImageUpscale,
  Italic,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Sparkles,
  Strikethrough,
  
  
  
} from 'lucide-react';

import { Toggle } from '@/components/ui/toggle';
import { uploadImage } from '../_actions/UploadImage';
import { toast } from "sonner"
import { CodeBlock, YoutubeLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { EditorAction } from '../_schema/Editor.model';
import { memo } from 'react';

const MenuBar= memo(({ editor,title,bannerRef,generateContent,dispatch}: { editor: Editor | null ,title:string ,bannerRef:React.RefObject<string>,generateContent:boolean,dispatch: React.Dispatch<EditorAction> }) => {


  const handleUploadImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      toast("Uploading Image ⏳...")

      if (file) {
        try {
          // Read the file as a data URL (base64) for immediate preview
          const reader = new FileReader();
          reader.onload = async (e) => {
            const result = e.target?.result as string;
            if (result) {
              // Display the image immediately using base64
              editor?.chain().focus().setImage({ src: result }).run();
              
              try {
                // Upload to Supabase
                const uploadResult = await uploadImage(file, file.name,`/upload/${title}`);
                toast(`${uploadResult?.message}`)

           
              } catch (error) {
                // Keep the base64 image if upload fails
                toast(`${error}`)
                console.log("error: ", error)

              }
            }
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.error('Error handling image:', error);
          alert('Failed to process image. Please try again.');
        }
      }
    };
  }


  const handleUploadBanner = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    
    input.onchange = async () => {
      const file = input.files?.[0];
            toast("Uploading Banner ⏳...")
      if (file) {
        try {
          // Read the file as a data URL (base64) for immediate preview
          const reader = new FileReader();
          reader.onload = async (e) => {
            const result = e.target?.result as string;
            if (result) {
              try {
                // Upload to Supabase
                const uploadResult = await uploadImage(file, file.name, `/upload/${title}/banner`);
                toast(`${uploadResult?.message}`)
                // Update bannerRef with the image URL and filename
                if (bannerRef.current !== undefined) {
                  bannerRef.current = uploadResult!.data;
                }
              } catch (error) {
                toast(`${error}`)
  
              }
            }
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.error('Error handling image:', error);
          alert('Failed to process image. Please try again.');
        }
      }
    };
  }


  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor!.commands.setYoutubeVideo({
        src: url,
        width:  640,
        height:  480,
      })
    }
  }
  
  if (!editor) {
    return null;
  }

  const MenuOptions = [
    {
      element: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
    },
    {
      element: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
    },
    {
      element: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
    },
    {
      element: <Pilcrow className="size-4" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive('paragraph'),
    },
    {
      element: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
    },
    {
      element: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
    },

    {
      element: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
    },
    {
      element: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      isActive: editor.isActive('highlight'),
    },

    {
      element: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: editor.isActive({ textAlign: 'left' }),
    },
    {
      element: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: editor.isActive({ textAlign: 'center' }),
    },

    {
      element: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: editor.isActive({ textAlign: 'right' }),
    },
    {
      element: <AlignJustify className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('justify').run(),
      isActive: editor.isActive({ textAlign: 'justify' }),
    },
    {
      element: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      element: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    },
    {
      element: <ImageIcon className="size-4" />,
      onClick: handleUploadImage,
      isActive: editor.isActive('image'),
    },
    {
      element: <ImageUpscale className="size-4" />,
      onClick: handleUploadBanner,
      isActive: !!bannerRef.current,
    },
    {
      element: <CodeBlock className="size-4" />,
      onClick: ()=>editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
    },
    {
      element:<Minus className="size-4"/>,
      onClick: ()=>editor.chain().focus().setHorizontalRule().run(),
      isActive: editor.isActive('horizontalRule'),
    },
    {
      element:<YoutubeLogoIcon className="size-4"/>,
      onClick: ()=>addYoutubeVideo(),
      isActive: editor.isActive('youtube'),
    },
    {
      element:<Sparkles className="size-4"/>,
      onClick:()=> dispatch({type:"GENERATE_CONTENT"}) ,
      isActive: generateContent,
    }

  ];  
console.log("GenerateContent: ", generateContent)

  return (
    <div>
      {MenuOptions.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.isActive}
          onPressedChange={option.onClick}
        >
          {option.element}
        </Toggle>
      ))}
    </div>
  );
})

export default MenuBar;
