import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import ChapterLabel from '@/components/ChapterLabel';
import ProjectVisual from '@/components/ProjectVisual';
import Experience from '@/components/Experience';
import Navigation from '@/components/Navigation';
import { archive, capabilities, profile, projects, siteUrl } from '@/lib/content';

const OrbitStage = dynamic(() => import('@/components/OrbitStage'));

const Arrow = () => <span aria-hidden="true">↗</span>;
export default function Home() {
  const schema = {
    '@context': 'https://schema.org', '@type': 'ProfilePage', '@id': `${siteUrl}/#profile`,
    url: siteUrl, name: 'Ahmed Ali — Own Orbit',
    mainEntity: { '@type': 'Person', name: profile.name, description: profile.description, url: siteUrl, image: `${siteUrl}/images/hero-1200.webp`, sameAs: [profile.github, profile.linkedin, profile.instagram], knowsAbout: ['Full-stack development', 'Computer Science education', 'JavaScript', 'React', 'Node.js', 'Video editing'] },
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <a className="skip-link" href="#about">Skip introduction</a>
    <Navigation />
    <Experience />
    <main id="main">
      <section className="hero" id="beginning" aria-labelledby="hero-heading">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-topline"><span className="eyebrow">A PERSONAL EXPLORATION / VOL. 01</span><span className="eyebrow">BASED IN PAKISTAN <span className="status-dot" /></span></div>
        <div className="hero-copy">
          <p className="eyebrow hero-kicker"><span className="tiny-line" /> FULL-STACK DEVELOPER & EDUCATOR</p>
          <h1 id="hero-heading"><span className="hero-line">Built</span><span className="hero-line">off-script<span className="ember">.</span></span></h1>
          <p className="hero-serif">At my own pace.</p>
          <p className="hero-intro">I’m Ahmed Ali. I build useful things,<br className="desktop-break" /> share what I learn, and follow my curiosity.</p>
          <div className="hero-actions">
            <a href="#work" className="pill-link">Explore my work <span aria-hidden="true">↘</span></a>
            <a href="/CV/Ahmed%20Ali.pdf" className="pill-link" download="Ahmed Ali CV.pdf">Download CV <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-portrait">
          <span className="portrait-coordinate eyebrow">01. HUMAN, BEFORE ANYTHING.</span>
          <div className="portrait-frame"><Image src="/images/hero.jpg" alt="Ahmed Ali outdoors, wearing a black polo shirt and sunglasses" fill sizes="(max-width: 700px) 90vw, 42vw" priority /></div>
          <div className="portrait-caption"><span>AHMED ALI</span><span>DEVELOPER. TEACHER. STILL LEARNING.</span></div>
        </div>
        <svg className="hero-orbit" viewBox="0 0 1440 900" fill="none" aria-hidden="true"><defs><linearGradient id="hero-trail" x1="150" y1="800" x2="1350" y2="150" gradientUnits="userSpaceOnUse"><stop stopColor="#F4A261" stopOpacity="0"/><stop offset=".4" stopColor="#F4A261"/><stop offset="1" stopColor="#8B79E6" stopOpacity=".18"/></linearGradient></defs><path d="M-180 815C260 800 1040 870 1328 446C1555 112 927 52 817 184C679 349 1152 553 1467 449" stroke="url(#hero-trail)" strokeWidth="1.3"/><circle cx="1236" cy="558" r="4" fill="#F4A261"/></svg>
        <div className="hero-bottom"><a href="#deviation" className="scroll-cue"><span>↓</span> SCROLL TO FIND YOUR OWN WAY</a><span className="eyebrow">OWN ORBIT — AN ONGOING STORY</span></div>
      </section>

      <section id="deviation" className="deviation section-pad" aria-labelledby="deviation-title">
        <ChapterLabel number="00" title="THE DEVIATION" extra="NO FIXED TRAJECTORY" />
        <div className="deviation-layout"><div className="deviation-copy"><p className="eyebrow">THERE’S ALWAYS A PATH LAID OUT FOR US.</p><h2 id="deviation-title" data-reveal>I understand<br />the map.<br /><span className="muted">Then I choose</span><br /><em>my route.</em></h2><p>I like to understand how a system works before deciding how to move within it. Curiosity sets the direction. Consistency keeps me going.</p></div><OrbitStage /></div>
        <div className="section-footnote"><span>STRUCTURE IS A STARTING POINT.</span><span>EXPLORATION IS THE REST. ↘</span></div>
      </section>

      <section className="about section-pad" id="about" aria-labelledby="about-title">
        <ChapterLabel number="01" title="THE HUMAN" extra="A LITTLE CONTEXT" />
        <div className="about-layout"><div className="about-photo" data-reveal><Image src="/images/about.jpg" alt="Ahmed standing among trees in a white shirt" fill sizes="(max-width: 700px) 90vw, 36vw" loading="lazy" /><span className="photo-note">Somewhere between learning & becoming.</span></div>
          <div className="about-copy"><p className="eyebrow">HELLO, I’M AHMED.</p><h2 id="about-title" data-reveal>One person.<br /><em>A few orbits.</em></h2><p className="lead">A developer’s curiosity.<br />A teacher’s patience.<br />A creative mind that wanders.</p><p>I’m a Computer Science undergraduate in Pakistan. My path has moved from C++ experiments to full-stack applications, with a classroom running alongside it.</p><p>Teaching has a way of revealing what you really understand. Building has a way of showing what you still need to learn. I like being in both places.</p><div className="about-details"><div><span className="eyebrow">STUDYING</span><span>BS Computer Science<br />Quaid-i-Azam University affiliated program</span></div><div><span className="eyebrow">EXPLORING</span><span>Backend engineering<br />Useful, thoughtful software</span></div></div></div>
        </div>
      </section>

      <section className="work section-pad" id="work" aria-labelledby="work-title">
        <ChapterLabel number="02" title="THE BUILDER" extra="IDEAS, MADE TANGIBLE" />
        <div className="section-heading"><h2 id="work-title" data-reveal>Less hypothetical.<br /><em>More built.</em></h2><p>Things I’ve made to understand a little more — and solve something along the way.</p></div>
        <div className="projects">{projects.map(project => <article className="project" key={project.slug} data-reveal><Link href={`/work/${project.slug}/`} className="project-art-link" aria-label={`Explore ${project.name}`}><ProjectVisual variant={project.visual} /><span className="project-open" aria-hidden="true">↗</span></Link><div className="project-copy"><span className="eyebrow">{project.number} / {project.category}</span><h3><Link href={`/work/${project.slug}/`}>{project.name}</Link></h3><p>{project.summary}</p><ul className="tags" aria-label="Technologies">{project.stack.map(t => <li key={t}>{t}</li>)}</ul><Link className="text-link" href={`/work/${project.slug}/`}>Explore the project <Arrow /></Link></div></article>)}</div>
        <div className="archive-header"><span className="eyebrow">OTHER STEPS ALONG THE WAY</span><a className="text-link" href={profile.github} target="_blank" rel="noopener noreferrer">All repositories <Arrow /></a></div>
        <div className="archive">{archive.map((item, i) => <div className="archive-row" key={item.name}><span className="eyebrow">0{i + 3}</span><h3>{item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer">{item.name}</a> : item.name}</h3><span>{item.type}</span>{item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.name} repository`}><Arrow /></a> : <span className="eyebrow">PERSONAL PROJECT</span>}</div>)}</div>
        <div className="capabilities"><div><span className="eyebrow">TOOLS, WITH CONTEXT</span><h3>The working<br /><em>toolbox.</em></h3><p>Different tools. Different depths of experience. Always room to learn.</p></div><div>{capabilities.map(group => <div className="skill-row" key={group.title}><div><h4>{group.title}</h4><span>{group.detail}</span></div><p>{group.skills}</p></div>)}</div></div>
      </section>

      <section className="teaching section-pad" id="teaching" aria-labelledby="teaching-title">
        <ChapterLabel number="03" title="THE EDUCATOR" extra="KNOWLEDGE GOES FURTHER WHEN SHARED" />
        <div className="teaching-heading"><h2 id="teaching-title" data-reveal>Understanding it<br />is one thing.<br /><em>Passing it on is another.</em></h2><span className="teaching-asterisk" aria-hidden="true">✳</span></div>
        <div className="teaching-body"><p className="lead">The classroom has been part of my life for about five years. It’s also where some of my best software questions began.</p><div><h3>MyAcademy</h3><p>Through my home-based academy, I’ve taught Computer Science and other academic subjects to more than 100 students in grades 6–10. Explaining, listening, and adapting are part of the work every day.</p><h3>Skills beyond the textbook</h3><p>I organized MyAcademy Skills Corner: a four-month initiative for around 14 students, exploring Word, Excel, introductory web development, and practical AI tools.</p><Link href="/work/myacademy-portal/" className="text-link">See how teaching became software <Arrow /></Link></div></div>
        <div className="teaching-stats"><div><strong>~5</strong><span>years of teaching</span></div><div><strong>100+</strong><span>students taught</span></div><div><strong>14</strong><span>Skills Corner participants, approximately</span></div></div>
      </section>

      <section className="creative section-pad" id="creative" aria-labelledby="creative-title">
        <ChapterLabel number="04" title="THE CREATIVE MIND" extra="A DIFFERENT KIND OF TIMELINE" />
        <div className="section-heading"><h2 id="creative-title" data-reveal>Sometimes,<br /><em>the medium changes.</em></h2><p>Outside the code editor, I work with rhythm, footage, and the feeling of a well-timed cut.</p></div>
        <div className="creative-layout"><div className="creative-still"><Image src="/images/creative.jpg" alt="Personal outdoor portrait of Ahmed looking down while standing in a garden" fill sizes="(max-width: 700px) 90vw, 42vw" loading="lazy" /><div className="viewfinder" aria-hidden="true"/><span className="eyebrow">A PERSONAL FRAME / AHMED ALI</span></div><div className="creative-notes"><p className="eyebrow">VIDEO EDITING / ADOBE PREMIERE PRO</p><div className="creative-entry"><span>01</span><div><h3>Cricket, cut to a rhythm.</h3><p>Montages and match highlights — working with timing, music, and the energy already in the footage.</p></div></div><div className="creative-entry"><span>02</span><div><h3>Conversations, shaped.</h3><p>Podcast-style edits, organizing spoken content into something clear and engaging.</p></div></div><div className="creative-entry"><span>03</span><div><h3>Moments, kept.</h3><p>Filming and editing a Mehndi video, taking a story from the camera to the finished sequence.</p></div></div><p className="media-note">A few notes from my editing practice. Film excerpts aren’t part of this collection yet.</p></div></div>
      </section>

      <section className="between section-pad" id="between" aria-labelledby="between-title">
        <ChapterLabel number="05" title="THE SPACE BETWEEN" extra="PAUSE IS PART OF THE PROCESS" />
        <div className="between-layout"><div><span className="eyebrow">OFF THE CLOCK. STILL MYSELF.</span><h2 id="between-title" data-reveal>Not every<br />moment has to<br />be a <em>milestone.</em></h2><p>There’s room for cricket. For a good film. For games, a photograph, or an evening with no particular plan.</p><p>I care about making progress. I also care about enjoying the life around it.</p><span className="handwritten">Room to breathe. Room to become.</span></div><div className="between-photo"><div className="between-media"><Image src="/images/pause.jpg" alt="Ahmed sitting outdoors beside green plants, taking a quiet moment" fill sizes="(max-width: 700px) 85vw, 40vw" loading="lazy" /></div><div className="photo-corner-label">NO DEADLINE FOR THIS MOMENT.</div></div></div>
      </section>

      <section className="connect section-pad" id="connect" aria-labelledby="connect-title">
        <ChapterLabel number="06" title="STILL BECOMING" extra="THERE IS NO FINISH LINE" />
        <div className="currently"><span className="status-dot"/><span className="eyebrow">CURRENT ORBIT</span><p>Deeper backend understanding.<br />Stronger fundamentals. More useful things.</p></div>
        <h2 id="connect-title" data-reveal>The story’s still<br /><em>being written.</em></h2><div className="connect-bottom"><p>I enjoy meeting people who build, teach, create,<br className="desktop-break" /> or ask interesting questions. Let’s compare notes.</p><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="connect-cta">Let’s connect <Arrow /></a></div>
        <div className="socials"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a><a href={profile.instagram} target="_blank" rel="noopener noreferrer">Instagram <Arrow /></a></div>
        <svg className="closing-orbit" viewBox="0 0 1000 400" fill="none" aria-hidden="true"><ellipse cx="500" cy="260" rx="470" ry="120" transform="rotate(-16 500 260)" stroke="#F4A261" strokeOpacity=".2"/></svg>
      </section>
    </main>
    <footer><span>© {new Date().getFullYear()} Ahmed Ali</span><span>BUILT OFF-SCRIPT. AT MY OWN PACE.</span><a href="#beginning">Back to the beginning ↑</a></footer>
  </>;
}


