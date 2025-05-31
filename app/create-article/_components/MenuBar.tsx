/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Pilcrow,
  Strikethrough,
} from 'lucide-react';

import { Toggle } from '@/components/ui/toggle';
import { uploadImage } from '../_actions/UploadImage';

function MenuBar({ editor,title,bannerRef }: { editor: Editor | null ,title:string ,bannerRef:React.RefObject<string> }) {

  const handleUploadImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    
    input.onchange = async () => {
      const file = input.files?.[0];
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
                
           
              } catch (error) {
                console.error('Upload error:', error);
                // Keep the base64 image if upload fails
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
                // Update bannerRef with the image URL and filename
                if (bannerRef.current !== undefined) {
                  bannerRef.current = uploadResult?.data;
                  console.log(bannerRef.current)
                }
              } catch (error) {
                console.error('Upload error:', error);
                alert('Failed to upload banner image. Please try again.');
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
    }
  ];

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
}

export default MenuBar;
