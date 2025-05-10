import AddTodoPage from "@/components/templates/AddTodoPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function AddTodo() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" && router.pathname !== "/login") {
      router.replace("/login");
    }
  }, [status, router]);

  return <AddTodoPage />;
}

export default AddTodo;
