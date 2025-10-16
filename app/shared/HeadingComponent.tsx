"use client";
import React from "react";
import style from "./_styles/shared.module.css";
import BlurText from "@/components/BlurText";

function HeadingComponent({
  title,
  subtitle,
  children,
  headingStyle,
  overrideStyle,
  overrideInlineStyle,
  inlineStyle,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  headingStyle?: string;
  overrideStyle?: boolean;
  overrideInlineStyle?: boolean;
  inlineStyle?: React.CSSProperties;
}) {
  const defaultStyle = ` ${style.dmSans} font-bold p-5 text-[#222222]`;
  const defaultInlineStyle: React.CSSProperties = { fontSize: "4.5vmax" };
  let styledComponent = defaultStyle;
  let inlineStyledComponent: React.CSSProperties = defaultInlineStyle;

  if (headingStyle) {
    styledComponent = overrideStyle
      ? `${defaultStyle} ${headingStyle}`
      : headingStyle;
  }
  if (inlineStyle) {
    inlineStyledComponent = overrideInlineStyle
      ? {
          ...defaultInlineStyle,
          ...inlineStyle,
        }
      : inlineStyle;
  }
  return (
    <>
      <BlurText
        text={title}
        delay={150}
        animateBy="words"
        direction="top"
        threshold={0}
        className={`${styledComponent} justify-center`}
        style={inlineStyledComponent}
      />
      {subtitle && (
        <p className="text-center text-gray-600 mt-2 mb-4">{subtitle}</p>
      )}
      {children}
    </>
  );
}

export default HeadingComponent;
