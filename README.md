# Chess OCR Backend

This is a simple backend server that accepts a PNG/JPG image of a chessboard,
sends it to an OCR service, extracts the FEN string, and returns it to the client.

## Endpoint

### `POST /upload`

Form field: `image` (file)

Returns: FEN string or `"ERROR"`.

## Tech Stack
- Node.js
- Express
- Multer (file upload)
- node-fetch
- Hosted on Render

## Usage Example

```js
const form = new FormData();
form.append("image", file);

const res = await fetch("https://YOUR-SERVICE.onrender.com/upload", {
  method: "POST",
  body: form
});

console.log(await res.text());
