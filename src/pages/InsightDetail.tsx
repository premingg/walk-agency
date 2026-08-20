import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { insights } from "@/data/site";

const InsightDetail = () => {
  const { slug } = useParams();
  const article = insights.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="container-walk py-56 text-center">
        <h1 className="display text-5xl">Article not found</h1>
        <Link to="/insights" className="mt-8 inline-block link-underline text-sm uppercase tracking-[0.2em]">
          Back to insights
        </Link>
      </div>
    );
  }

  return (
    <div className="surface-light bg-background text-foreground">
      <article className="container-walk max-w-3xl pb-16 pt-40 md:pt-48">
        <Link to="/insights" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Insights
        </Link>
        <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-brand-blue">
          {article.category} · {new Date(article.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </p>
        <h1 className="display mt-4 text-4xl md:text-6xl">{article.title}</h1>
        <img src={article.image} alt={article.title} loading="lazy" width={1920} height={1080} className="mt-10 w-full border border-border object-cover" />
        <div className="prose prose-lg mt-10 max-w-none text-foreground">
          <p className="lead">{article.excerpt}</p>
          <p>{article.body}</p>
        </div>
      </article>
    </div>
  );
};

export default InsightDetail;
