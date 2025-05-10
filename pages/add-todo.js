import AddTodoPage from "@/components/templates/AddTodoPage";
import { getSession } from "next-auth/react";
import React from "react";

function AddTodo() {
  return <AddTodoPage />;
}

export default AddTodo;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
