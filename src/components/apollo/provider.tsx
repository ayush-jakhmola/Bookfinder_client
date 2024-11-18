"use client";
import { ApolloProvider as Provider } from "@apollo/client";
import createApolloClient from "./client";

const client = createApolloClient();

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider client={client}>{children}</Provider>;
}
