/* eslint-disable react/display-name */
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ClipboardPaste,
  ImageIcon,
  ImageUpscale,
  Italic,
  List,
  ListOrdered,
  Minus,
  Sparkles,
  Strikethrough,
  Table,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { uploadImage } from "../_actions/UploadImage";
import { toast } from "sonner";
import { CodeBlock, YoutubeLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { EditorActionTyped } from "../_schema/Editor.model";
import { memo } from "react";

import { marked } from "marked";
import DOMPurify from "dompurify";
const MenuBar = memo(
  ({
    editor,
    title,
    bannerRef,
    generateContent,
    dispatch,
  }: {
    editor: Editor | null;
    title: string;
    bannerRef: React.RefObject<string>;
    generateContent: boolean;
    dispatch: React.Dispatch<EditorActionTyped>;
  }) => {
    const handleUploadImage = async () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.click();
      input.onchange = async () => {
        const file = input.files?.[0];
        toast("Uploading Image ⏳...");

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
                  const uploadResult = await uploadImage(
                    file,
                    file.name,
                    `/upload/${title}`,
                  );
                  toast(`${uploadResult?.message}`);
                } catch (error) {
                  // Keep the base64 image if upload fails
                  toast(`${error}`);
                  console.log("error: ", error);
                }
              }
            };
            reader.readAsDataURL(file);
          } catch (error) {
            console.error("Error handling image:", error);
            alert("Failed to process image. Please try again.");
          }
        }
      };
    };

    const handleUploadBanner = async () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        toast("Uploading Banner ⏳...");
        if (file) {
          try {
            // Read the file as a data URL (base64) for immediate preview
            const reader = new FileReader();
            reader.onload = async (e) => {
              const result = e.target?.result as string;
              if (result) {
                try {
                  // Upload to Supabase
                  const uploadResult = await uploadImage(
                    file,
                    file.name,
                    `/upload/${title}/banner`,
                  );
                  toast(`${uploadResult?.message}`);
                  // Update bannerRef with the image URL and filename
                  if (bannerRef.current !== undefined) {
                    bannerRef.current = uploadResult!.data;
                  }
                } catch (error) {
                  toast(`${error}`);
                }
              }
            };
            reader.readAsDataURL(file);
          } catch (error) {
            console.error("Error handling image:", error);
            alert("Failed to process image. Please try again.");
          }
        }
      };
    };

    const addYoutubeVideo = () => {
      const url = prompt("Enter YouTube URL");

      if (url) {
        editor!.commands.setYoutubeVideo({
          src: url,
          width: 640,
          height: 480,
        });
      }
    };

    if (!editor) {
      return null;
    }

    marked.setOptions({
      gfm: true, // Enable GitHub-Flavored Markdown
      breaks: true, // Line breaks
    });

    const handlePasteMarkdown = async () => {
      const markdownText = await navigator.clipboard.readText();
      const html = await marked.parse(markdownText);
      const cleanHTML = DOMPurify.sanitize(html);
      editor.commands.setContent(cleanHTML);
    };

    const textFormatting = [
      {
        element: <Bold className="size-4" />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        isActive: editor.isActive("bold"),
      },
      {
        element: <Italic className="size-4" />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        isActive: editor.isActive("italic"),
      },
      {
        element: <Strikethrough className="size-4" />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        isActive: editor.isActive("strike"),
      },
    ];

    const alignment = [
      {
        element: <AlignLeft className="size-4" />,
        onClick: () => editor.chain().focus().setTextAlign("left").run(),
        isActive: editor.isActive({ textAlign: "left" }),
      },
      {
        element: <AlignCenter className="size-4" />,
        onClick: () => editor.chain().focus().setTextAlign("center").run(),
        isActive: editor.isActive({ textAlign: "center" }),
      },
      {
        element: <AlignRight className="size-4" />,
        onClick: () => editor.chain().focus().setTextAlign("right").run(),
        isActive: editor.isActive({ textAlign: "right" }),
      },
      {
        element: <AlignJustify className="size-4" />,
        onClick: () => editor.chain().focus().setTextAlign("justify").run(),
        isActive: editor.isActive({ textAlign: "justify" }),
      },
    ];

    const lists = [
      {
        element: <List className="size-4" />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        isActive: editor.isActive("bulletList"),
      },
      {
        element: <ListOrdered className="size-4" />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: editor.isActive("orderedList"),
      },
    ];

    const media = [
      {
        element: <ImageIcon className="size-4" />,
        onClick: handleUploadImage,
        isActive: editor.isActive("image"),
      },
      {
        element: <ImageUpscale className="size-4" />,
        onClick: handleUploadBanner,
        isActive: !!bannerRef.current,
      },
      {
        element: <YoutubeLogoIcon className="size-4" />,
        onClick: () => addYoutubeVideo(),
        isActive: editor.isActive("youtube"),
      },
      {
        element: <CodeBlock className="size-4" />,
        onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: editor.isActive("codeBlock"),
      },
    ];

    const utilities = [
      {
        element: <Table className="size-4" />,
        onClick: () => {
          editor.commands.insertTable({
            rows: 3,
            cols: 3,
            withHeaderRow: true,
          });
        },
        isActive: editor.isActive("table"),
      },
      {
        element: <Minus className="size-4" />,
        onClick: () => editor.chain().focus().setHorizontalRule().run(),
        isActive: editor.isActive("horizontalRule"),
      },
      {
        element: <Sparkles className="size-4" />,
        onClick: () => dispatch({ type: "GENERATE_CONTENT" }),
        isActive: generateContent,
      },
      {
        element: <ClipboardPaste className="size-4" />,
        onClick: () => handlePasteMarkdown(),
        isActive: false,
      },
    ];

    console.log("GenerateContent: ", generateContent);

    return (
      <div className="border-b bg-muted/50 px-4 py-3">
        <div className="flex flex-wrap items-center gap-1">
          {textFormatting.map((option, index) => (
            <Toggle
              key={`text-${index}`}
              pressed={option.isActive}
              onPressedChange={option.onClick}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              {option.element}
            </Toggle>
          ))}

          <Separator orientation="vertical" className="mx-1 h-6" />

          {alignment.map((option, index) => (
            <Toggle
              key={`align-${index}`}
              pressed={option.isActive}
              onPressedChange={option.onClick}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              {option.element}
            </Toggle>
          ))}

          <Separator orientation="vertical" className="mx-1 h-6" />

          {lists.map((option, index) => (
            <Toggle
              key={`list-${index}`}
              pressed={option.isActive}
              onPressedChange={option.onClick}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              {option.element}
            </Toggle>
          ))}

          <Separator orientation="vertical" className="mx-1 h-6" />

          {media.map((option, index) => (
            <Toggle
              key={`media-${index}`}
              pressed={option.isActive}
              onPressedChange={option.onClick}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              {option.element}
            </Toggle>
          ))}

          <Separator orientation="vertical" className="mx-1 h-6" />

          {utilities.map((option, index) => (
            <Toggle
              key={`util-${index}`}
              pressed={option.isActive}
              onPressedChange={option.onClick}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              {option.element}
            </Toggle>
          ))}
        </div>
      </div>
    );
  },
);

export default MenuBar;
