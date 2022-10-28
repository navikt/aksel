export default function exit(req, res) {
  // Exit current user from preview mode
  res.clearPreviewData();

  // Redirect user back to the index page
  res.writeHead(307, { Location: "/" });
  res.end();
}
