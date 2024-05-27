import React from "react";
import { useLogout, useGetIdentity, HttpError, useNavigation } from "@refinedev/core";

import { Link } from "react-router-dom";

interface Identity {
  name: string
}

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity  } = useGetIdentity() as {data: Identity}

  // You can also use methods like list or create to trigger navigation.
  // We're using url methods to provide more semantically correct html.
  const { listUrl, createUrl } = useNavigation();

  return (
    <>
      <h2>
        <span>Welcome, </span>
        <span>{identity?.name ?? ""}</span>
      </h2>
      <Link to={listUrl("protected-products")}>List Products</Link>
      <Link to={createUrl("protected-products")}>Create Product</Link>
      <button
        type="button"
        disabled={isLoading}
        onClick={()=>mutate()}
      >
        Logout
      </button>
      
    </>
  );
};