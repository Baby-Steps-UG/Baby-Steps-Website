import { readFileSync } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";

interface LegalDocumentProps {
  source: "privacy_policy.md" | "terms_of_service.md";
  eyebrow: string;
  summary: string;
}

interface HeadingItem {
  text: string;
  id: string;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function resolveHref(href: string) {
  const normalized = href.toLowerCase();
  if (normalized.includes("privacy_policy")) return "/privacy";
  if (normalized.includes("delete-account")) return "/privacy#10-account-and-data-deletion";
  return href;
}

function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g).filter(Boolean);

  return tokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={index}>{token.slice(2, -2)}</strong>;
    }

    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return <a key={index} href={resolveHref(linkMatch[2])}>{linkMatch[1]}</a>;
    }

    if (token.startsWith("`") && token.endsWith("`")) {
      return <code key={index}>{token.slice(1, -1)}</code>;
    }

    return token;
  });
}

export function LegalDocument({ source, eyebrow, summary }: LegalDocumentProps) {
  const markdown = readFileSync(path.join(process.cwd(), "legal", source), "utf8").replace(/\r\n/g, "\n");
  const lines = markdown.split("\n");
  const headings: HeadingItem[] = lines
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.slice(3).trim();
      return { text, id: slugify(text) };
    });

  const blocks: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (!listItems.length) return;
    const items = listItems;
    listItems = [];
    blocks.push(
      <ul key={`list-${blocks.length}`}>
        {items.map((item, index) => <li key={index}>{renderInline(item)}</li>)}
      </ul>,
    );
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      return;
    }

    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      return;
    }

    flushList();

    if (line.startsWith("# ")) {
      blocks.push(<h1 key={`h1-${blocks.length}`}>{renderInline(line.slice(2))}</h1>);
    } else if (line.startsWith("## ")) {
      const text = line.slice(3);
      blocks.push(<h2 id={slugify(text)} key={`h2-${blocks.length}`}>{renderInline(text)}</h2>);
    } else if (line.startsWith("### ")) {
      blocks.push(<h3 key={`h3-${blocks.length}`}>{renderInline(line.slice(4))}</h3>);
    } else {
      blocks.push(<p key={`p-${blocks.length}`}>{renderInline(line)}</p>);
    }
  });
  flushList();

  return (
    <section className="legal-page">
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <span className="section-label">{eyebrow}</span>
          <p>{summary}</p>
        </div>
      </div>

      <div className="legal-layout">
        <aside className="legal-toc" aria-label="On this page">
          <p>On this page</p>
          <nav>
            {headings.map((heading) => <a href={`#${heading.id}`} key={heading.id}>{heading.text}</a>)}
          </nav>
          <a className="legal-contact" href="mailto:hello@babystepslearn.com">Need help? Email us →</a>
        </aside>
        <article className="legal-content">{blocks}</article>
      </div>
    </section>
  );
}
