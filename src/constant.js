export let API_ENDPOINT;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  console.log("dev code");
  API_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";
} else {
  console.log("dev Prod");
  API_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";
}
