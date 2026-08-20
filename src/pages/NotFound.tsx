import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container-walk grid min-h-[70svh] place-items-center py-40 text-center">
    <div>
      <p className="display text-hero gradient-text">404</p>
      <p className="mt-4 text-muted-foreground">This route hasn't been built yet.</p>
      <Link to="/" className="mt-8 inline-block link-underline text-sm uppercase tracking-[0.2em]">
        Back home
      </Link>
    </div>
  </div>
);

export default NotFound;
