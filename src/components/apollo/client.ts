import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://bookfinder-server.onrender.com/",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
