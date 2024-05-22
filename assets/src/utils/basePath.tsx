let devMode: boolean = process.env.NODE_ENV === "development";
export const basePath: string = devMode ? "http://localhost:3000" : "http://127.0.0.1:9090";