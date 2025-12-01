const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const server = http.createServer(async (req, res) => {
  if (req.method !== "GET") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
    return;
  }
  try {
    const { pathname } = new URL(req.url, "http://localhost:8000");
    let fileName;
    let statusCode = 200;
    if (pathname === "/") {
      fileName = "index.html";
      // statusCode = 200;
    } else if (pathname === "/about") {
      fileName = "about.html";
    } else if (pathname === "/contact-me") {
      fileName = "contact-me.html";
    } else {
      fileName = "404.html";
      statusCode = 404;
    }

    const filePath = path.join(__dirname, fileName);
    const html = await fs.readFile(filePath, "utf8");

    res.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  } catch (err) {
    console.error("Error:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
