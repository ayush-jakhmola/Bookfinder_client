import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://localhost:4040",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
