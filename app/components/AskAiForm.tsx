"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { PostForm } from "./PostForm";
import { useState } from "react";
import { ShimmeringText } from "@/components/animate-ui/text/shimmering";
import { validateUserKeyword } from "../lib/validation";

export function AskAiForm() {

  const [userInput, setUserInput] = useState<string>("");
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const placeholders = [
    "✏️ Enter a keyword or topic to generate your blog post",
    "📝 Start with a keyword — we’ll craft the post",
    "💡 Type a keyword to spark your next blog post"
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const input = (e.currentTarget.elements[0] as HTMLInputElement)?.value;
    if (input) {
      const result = validateUserKeyword.safeParse(input); // sync
      if (result.success) {
        setError("");
        setUserInput(input.trim());
      } else {
        setError("Must start with a letter and contain only letters or numbers");
      }
    }
  };

  const updatePlaceholder = (value: boolean) => {
    setIsPlaceholder(value);
  }
  const updateLoading = (value: boolean) => {
    setIsLoading(value);
  }

  return (
    <>
      <div className="w-full">
      {
        isPlaceholder &&

          <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      }

        {
          error && (
            <span className="text-red-500 text-center text-[13px] mt-2 block mx-auto">{error}</span>
          )
        }

      {
          isLoading &&
          <div className="px-5 w-max mx-auto py-2">
              <ShimmeringText
                className="opacity-70 select-none font-medium text-black text-center"
                text="Our agent is crafting the best content for you..."
                shimmeringColor=""
                wave
              />
            </div>
        }
      </div>
      <PostForm showPlaceholder={updatePlaceholder} showLoading={updateLoading} userRequest={userInput} />
    </>
  );
}
