import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/admin/AdminPage";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal | Addepalli Pavani Portfolio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});
