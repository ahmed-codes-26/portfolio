export default function ChapterLabel({ number, title, extra }: { number: string; title: string; extra?: string }) {
  return <div className="chapter-label"><span><b>{number}</b> / {title}</span>{extra && <span>{extra}</span>}</div>;
}
