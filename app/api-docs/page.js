// app/api-docs/page.js
"use client";

import dynamic from "next/dynamic";

const RedocStandalone = dynamic(
  () => import("redoc").then((mod) => mod.RedocStandalone),
  { ssr: false }
);

export default function ApiDocsPage() {
  return <RedocStandalone specUrl="/api/docs" />;
}