"use client";
import { useReducer, useRef } from "react";
import Preview from "./Preview";
import RichTextEditor from "./RichTextEditor";
import ButtonComponent from "@/app/shared/ButtonComponent";
import createPost from "../_actions/CreatePost";
import InputComponent from "@/app/shared/InputComponent";
import { editorReducer, initialState } from "../_hooks/editorReducer";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { NotifyUsers } from "../_actions/NotifyUsers";

function EditorWrapper() {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const bannerRef = useRef<string>("");

  // Get the current pathname
  const pathname = usePathname();
  const handlePublish = async () => {
    const postData = {
      content: state.content,
      title: state.title,
      durationRead: state.duration,
      subTitle: state.subTitle,
    };
    if (!state.title.trim()) {
      return;
    }

    const response = await createPost(postData, bannerRef.current);
    dispatch({ type: "SET_CONTENT", payload: "" });
    dispatch({ type: "SET_TITLE", payload: "" });
    dispatch({ type: "SET_SUBTITLE", payload: "" });
    dispatch({ type: "SET_DURATION", payload: "" });
    bannerRef.current = "";
    if (response?.success) {
      toast("Post created successfully");

      // Notify users about the new post using Promise.allSettled for independent execution
      Promise.allSettled([NotifyUsers(state.title, pathname)])
        .then(([notificationResult]) => {
          if (notificationResult.status === "fulfilled") {
            console.log(
              "Notification sent successfully:",
              notificationResult.value,
            );
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
      // Instead of just logging, handle the error more gracefully

      toast(`${response?.error}`);
    }
  };

  /*
   * You might want to add a success notification or redirect here "Toast component"
   *
   */
  const { pending } = useFormStatus();
  return (
    <form
      action={handlePublish}
      className="flex flex-col  lg:flex-row    justify-between w-full"
    >
      <section className="md:w-[50rem] mx-auto lg:p-5 bg-[#f6f6f6ec] mb-[10rem]">
        <div className="flex flex-wrap justify-between  bg-amber-400  ">
          <section className="w-1/2">
            <InputComponent
              input={
                <input
                  type="text"
                  placeholder="Enter The Title"
                  name="title"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_TITLE",
                      payload: e.target.value,
                    })
                  }
                  className="w-full p-5 bg-[#222222] text-[#e7e8e2] font-medium text-3xl focus-visible:outline-0 "
                />
              }
            />
          </section>
          <section className="w-1/2">
            <InputComponent
              input={
                <input
                  type="text"
                  placeholder="Enter The Duration"
                  name="duration"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_DURATION",
                      payload: e.target.value,
                    })
                  }
                  className="w-full p-5 bg-[#222222] text-[#e7e8e2] font-medium text-3xl focus-visible:outline-0 "
                  min={1}
                  max={35}
                />
              }
            />
          </section>
          <section className="w-full">
            <InputComponent
              input={
                <input
                  type="text"
                  placeholder="Enter The SubTitle"
                  name="subTitle"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_SUBTITLE",
                      payload: e.target.value,
                    })
                  }
                  className="w-full p-5 bg-[#222222] text-[#e7e8e2] font-medium text-3xl focus-visible:outline-0 "
                />
              }
            />
          </section>
        </div>

        <RichTextEditor
          dispatch={dispatch}
          title={state.title}
          bannerRef={bannerRef}
          generateContent={state.generateContent}
        />

        <ButtonComponent
          type="submit"
          overrideStyle={true}
          style="min-w-full  mt-3"
          onClick={handlePublish}
          pending={pending}
        >
          Publish
        </ButtonComponent>
      </section>

      <section className="md:w-[50rem] mx-auto p-5 bg-[#f6f6f6ec] w-full mb-[10rem] ">
        <Preview content={state.content} />
      </section>
    </form>
  );
}

export default EditorWrapper;
