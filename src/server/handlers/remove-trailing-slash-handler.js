import { format as formatUrl } from 'url';

export default function removeTrailingSlash(req, res) {
  const urlPath = formatUrl({
    pathname: req.path.replace(/\/$/, ''),
    query: req.query,
  });

  return res.redirect(301, urlPath);
}
