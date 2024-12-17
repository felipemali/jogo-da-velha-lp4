import { server } from "./app";

const port = process.env.PORT || 3001;

console.log({ port });

server.listen(port, () => console.log("API em execução"));
