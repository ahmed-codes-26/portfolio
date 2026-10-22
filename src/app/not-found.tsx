import Link from 'next/link';
export default function NotFound() { return <main className="not-found"><span className="eyebrow">404 / A LITTLE OFF COURSE</span><h1>This route is<br /><em>uncharted.</em></h1><p>Let’s find our way back to the story.</p><Link href="/" className="pill-link">Back to the beginning ↗</Link></main>; }
