import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, siteUrl } from '@/lib/content';
import ProjectVisual from '@/components/ProjectVisual';

export function generateStaticParams() { return projects.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find(p => p.slug === slug);
  return { title: p?.name, description: p?.summary, alternates: { canonical: `/work/${slug}/` }, openGraph: { title: `${p?.name} — Ahmed Ali`, description: p?.summary, url: `${siteUrl}/work/${slug}/` } };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  const next = projects.find(p => p.slug !== slug)!;
  const schema = { '@context': 'https://schema.org', '@type': 'SoftwareSourceCode', name: project.name, description: project.summary, codeRepository: project.repo, author: { '@type': 'Person', name: 'Ahmed Ali' }, url: `${siteUrl}/work/${slug}/` };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/><a href="#case-content" className="skip-link">Skip to project</a><header className="case-nav"><Link href="/#work">↖ Back to selected work</Link><span className="eyebrow">FIELD NOTES / {project.number}</span></header><main className="case-page" id="case-content"><p className="eyebrow">{project.category}</p><h1>{project.name}</h1><p className="case-lead">{project.summary}</p><div className="case-meta"><p><span className="eyebrow">MY ROLE</span>{project.role}</p><a href={project.repo} className="pill-link" target="_blank" rel="noopener noreferrer">View source on GitHub ↗</a></div><ProjectVisual variant={project.visual}/><div className="case-content"><section><span className="eyebrow">01 / THE STARTING POINT</span><h2>A reason to build.</h2><p>{project.problem}</p></section><section><span className="eyebrow">02 / THE APPROACH</span><h2>Putting the pieces together.</h2><p>{project.approach}</p><ul className="tags">{project.stack.map(t => <li key={t}>{t}</li>)}</ul></section><section><span className="eyebrow">03 / THE APPLICATION</span><h2>What it brings together.</h2><ul className="feature-list">{project.features.map(f => <li key={f}>{f}</li>)}</ul></section><section><span className="eyebrow">04 / LOOKING BACK</span><h2>From a project to practice.</h2><p>{project.reflection}</p></section></div><div className="case-next"><span className="eyebrow">KEEP EXPLORING</span><Link href={`/work/${next.slug}/`}>{next.name} ↗</Link></div></main><footer><span>Ahmed Ali — Own Orbit</span><Link href="/#connect">Let’s connect ↗</Link></footer></>;
}
