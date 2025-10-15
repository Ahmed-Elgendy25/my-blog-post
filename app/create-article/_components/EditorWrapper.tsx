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

function EditorWrapper() {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const bannerRef = useRef<string>("");
  const [activeView, setActiveView] = useState<"edit" | "preview">("edit");
  const [isPending, setIsPending] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  // Get the current pathname
  const pathname = usePathname();

  // Set initial time on client side only
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  const handlePublish = async () => {
    const postData = {
      content: state.content,
      title: state.title,
      durationRead: state.duration,
      subTitle: state.subTitle,
    };

    if (!state.title.trim()) {
      toast("Please enter a title");
      return;
    }

    setIsPending(true);
    const response = await createPost(postData, bannerRef.current);

    if (response?.success) {
      dispatch({ type: "SET_CONTENT", payload: "" });
      dispatch({ type: "SET_TITLE", payload: "" });
      dispatch({ type: "SET_SUBTITLE", payload: "" });
      dispatch({ type: "SET_DURATION", payload: "" });
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
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-base font-medium">
                        Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter your title here..."
                        value={state.title}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_TITLE",
                            payload: e.target.value,
                          })
                        }
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-2 lg:w-48">
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
                        onChange={(e) =>
                          dispatch({
                            type: "SET_DURATION",
                            payload: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle" className="text-base font-medium">
                      Subtitle
                    </Label>
                    <Input
                      id="subtitle"
                      placeholder="Add a subtitle or description..."
                      value={state.subTitle}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SUBTITLE",
                          payload: e.target.value,
                        })
                      }
                    />
                  </div>
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
