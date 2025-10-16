"use client";
import { useReducer, useRef, useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import createPost from "../_actions/CreatePost";
import { editorReducer, initialState } from "../_hooks/editorReducer";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { NotifyUsers } from "../_actions/NotifyUsers";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentPreview } from "@/app/create-article/_components/content-preview";
import { FileText, Eye, Edit3 } from "lucide-react";
import { ThumbnailUpload } from "./ThumbnailUpload";
import { uploadImage } from "../_actions/UploadImage";
import { contentSchema } from "../_schema/contentValidation";
import { ZodError } from "zod";

function EditorWrapper() {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const bannerRef = useRef<string>("");
  const [activeView, setActiveView] = useState<"edit" | "preview">("edit");
  const [isPending, setIsPending] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<{
    title?: string;
    subtitle?: string;
    duration?: string;
    thumbnail?: string;
    content?: string;
  }>({});

  // Get the current pathname
  const pathname = usePathname();

  // Set initial time on client side only
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  // Clear content validation error when content changes
  useEffect(() => {
    if (validationErrors.content && state.content) {
      setValidationErrors((prev) => ({
        ...prev,
        content: undefined,
      }));
    }
  }, [state.content, validationErrors.content]);

  const handlePublish = async () => {
    // Clear previous validation errors
    setValidationErrors({});

    // Validate the form data
    try {
      const validatedData = contentSchema.parse({
        title: state.title,
        subtitle: state.subTitle,
        duration: state.duration,
        thumbnail: state.thumbnail,
        content: state.content,
      });

      setIsPending(true);

      // Upload thumbnail
      let thumbnailUrl = "";
      if (validatedData.thumbnail) {
        toast("Uploading thumbnail ⏳...");
        try {
          const uploadResult = await uploadImage(
            validatedData.thumbnail,
            validatedData.thumbnail.name,
            `/upload/${validatedData.title}/banner`,
          );
          if (uploadResult?.data) {
            thumbnailUrl = uploadResult.data;
            toast("Thumbnail uploaded successfully ✅");
          }
        } catch (error) {
          toast("Failed to upload thumbnail");
          console.error("Thumbnail upload error:", error);
          setIsPending(false);
          return;
        }
      }

      const postData = {
        content: validatedData.content,
        title: validatedData.title,
        durationRead: validatedData.duration,
        subTitle: validatedData.subtitle,
      };

      const response = await createPost(postData, thumbnailUrl);

      if (response?.success) {
        dispatch({ type: "SET_CONTENT", payload: "" });
        dispatch({ type: "SET_TITLE", payload: "" });
        dispatch({ type: "SET_SUBTITLE", payload: "" });
        dispatch({ type: "SET_DURATION", payload: "" });
        dispatch({ type: "SET_THUMBNAIL", payload: null });
        bannerRef.current = "";
        toast("Post created successfully");

        // Notify users about the new post using Promise.allSettled for independent execution
        Promise.allSettled([NotifyUsers(state.title, pathname)])
          .then(([notificationResult]) => {
            if (notificationResult.status === "fulfilled") {
              toast("Subscribers notified! 🎉");
            } else {
              console.error("Notification failed:", notificationResult.reason);
              toast("Post published, but notification failed");
            }
          })
          .catch((error) => {
            console.error("Unexpected notification error:", error);
          });
      } else {
        toast(`${response?.error}`);
      }
      setIsPending(false);
    } catch (error) {
      if (error instanceof ZodError) {
        // Extract validation errors
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as string;
          errors[path] = err.message;
        });
        setValidationErrors(errors);

        // Show the first error in a toast
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Validation error:", error);
      }
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-5xl p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Content Editor
              </h1>
              <p className="text-sm text-muted-foreground">
                Create and publish your content
              </p>
            </div>
          </div>
          <Button
            onClick={handlePublish}
            size="lg"
            className="gap-2"
            disabled={isPending}
          >
            {isPending ? "Publishing..." : "Publish"}
          </Button>
        </div>

        <Tabs
          value={activeView}
          onValueChange={(v) => setActiveView(v as "edit" | "preview")}
          className="space-y-6"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="edit" className="gap-2">
              <Edit3 className="h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          {/* Edit View */}
          <TabsContent value="edit" className="space-y-0">
            {/* Main Editor Card */}
            <Card className="overflow-hidden">
              {/* Metadata Section */}
              <div className="border-b bg-card p-6 lg:p-8">
                <div className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-[1fr,auto]">
                    <section className="space-y-2">
                      <Label htmlFor="title" className="text-base font-medium">
                        Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter your title here..."
                        value={state.title}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_TITLE",
                            payload: e.target.value,
                          });
                          // Clear title error when user starts typing
                          if (validationErrors.title) {
                            setValidationErrors((prev) => ({
                              ...prev,
                              title: undefined,
                            }));
                          }
                        }}
                        className="text-lg"
                      />
                      {validationErrors.title && (
                        <p className="text-sm text-destructive">
                          {validationErrors.title}
                        </p>
                      )}
                    </section>
                    <section className="space-y-2 lg:w-48">
                      <Label
                        htmlFor="duration"
                        className="text-base font-medium"
                      >
                        Duration
                      </Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 5 min"
                        value={state.duration}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_DURATION",
                            payload: e.target.value,
                          });
                          // Clear duration error when user starts typing
                          if (validationErrors.duration) {
                            setValidationErrors((prev) => ({
                              ...prev,
                              duration: undefined,
                            }));
                          }
                        }}
                      />
                      {validationErrors.duration && (
                        <p className="text-sm text-destructive">
                          {validationErrors.duration}
                        </p>
                      )}
                    </section>
                  </div>

                  <section className="space-y-2">
                    <Label htmlFor="subtitle" className="text-base font-medium">
                      Subtitle
                    </Label>
                    <Input
                      id="subtitle"
                      placeholder="Add a subtitle or description..."
                      value={state.subTitle}
                      onChange={(e) => {
                        dispatch({
                          type: "SET_SUBTITLE",
                          payload: e.target.value,
                        });
                        // Clear subtitle error when user starts typing
                        if (validationErrors.subtitle) {
                          setValidationErrors((prev) => ({
                            ...prev,
                            subtitle: undefined,
                          }));
                        }
                      }}
                    />
                    {validationErrors.subtitle && (
                      <p className="text-sm text-destructive">
                        {validationErrors.subtitle}
                      </p>
                    )}
                  </section>

                  <ThumbnailUpload
                    value={state.thumbnail}
                    onChange={(file) => {
                      dispatch({ type: "SET_THUMBNAIL", payload: file });
                      // Clear thumbnail error when user uploads a file
                      if (validationErrors.thumbnail) {
                        setValidationErrors((prev) => ({
                          ...prev,
                          thumbnail: undefined,
                        }));
                      }
                    }}
                    error={validationErrors.thumbnail}
                  />
                </div>
              </div>

              {/* Rich Text Editor with Toolbar */}
              <RichTextEditor
                dispatch={dispatch}
                title={state.title}
                bannerRef={bannerRef}
                generateContent={state.generateContent}
                content={state.content}
              />
              {validationErrors.content && (
                <div className="border-t bg-destructive/10 px-6 py-3">
                  <p className="text-sm text-destructive">
                    {validationErrors.content}
                  </p>
                </div>
              )}
            </Card>

            {/* Footer Info */}
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <p>{currentTime && `Auto-saved at ${currentTime}`}</p>
              <p>{state.content.length} characters</p>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-0">
            <ContentPreview
              title={state.title}
              subtitle={state.subTitle}
              duration={state.duration}
              content={state.content}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default EditorWrapper;
