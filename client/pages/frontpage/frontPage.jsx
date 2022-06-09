import React from "react";
import { PreviewAllArticles } from "../news/previewAllArticles";

export function FrontPage() {
  return (
    <>
      <div>
        <h1 id={"frontpage-title"}>Everyday News!</h1>
      </div>
      <div>
        <PreviewAllArticles />
      </div>
    </>
  );
}
