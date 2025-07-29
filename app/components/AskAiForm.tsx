"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { PostForm } from "./PostForm";
import { useState } from "react";
import { ShimmeringText } from "@/components/animate-ui/text/shimmering";

export function AskAiForm() {

  const [userInput, setUserInput] = useState<string>("");
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const placeholders = [
    "Ask me anything, literally anything...",
    "What’s the best movie twist you’ve seen?",
    "Tell me something weird you just learned!",
    "How does AI actually work? 🤖",
    "What's on your mind right now?",
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.currentTarget.elements[0] as HTMLInputElement)?.value;
    if (input) {
      setUserInput(input.trim())
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
      {
        isPlaceholder &&

        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      }

      {
        isLoading &&
        <ShimmeringText
          className="opacity-70 select-none font-semibold"
          text="Our agent is crafting the best content for you..."
          shimmeringColor=""
          wave
        />
      }

      <PostForm showPlaceholder={updatePlaceholder} showLoading={updateLoading} userRequest={userInput} />
    </>
  );
}
