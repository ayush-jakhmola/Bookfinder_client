import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri:
      process.env.NODE_ENV === "production"
        ? "https://bookfinder-server.onrender.com/"
        : "http://localhost:4040",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
