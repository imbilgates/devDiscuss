import axios from "axios";

export const runCode = async (language, code, stdin = "") => {
  try {
    const fileExtensions = {
      javascript: "js",
      python: "py",
      java: "java",
      c: "c",
      cpp: "cpp",
      go: "go",
      ruby: "rb",
      php: "php",
    };

    const fileName = `main.${fileExtensions[language] || "txt"}`;

    const response = await axios.post(
      import.meta.env.VITE_API_URL,
      {
        language,
        stdin, // Pass user input dynamically
        files: [{ name: fileName, content: code }],
      },
      {
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
          "X-RapidAPI-Host": "onecompiler-apis.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return { stderr: "Error executing code" };
  }
};
