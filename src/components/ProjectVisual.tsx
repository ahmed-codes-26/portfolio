export default function ProjectVisual({ variant }: { variant: 'academy' | 'konekt' }) {
  return <div className={`project-visual ${variant}`} aria-label={variant === 'academy' ? 'System diagram: admin, teacher, and student workflows connected to MyAcademy Portal' : 'Concept diagram: people connected through posts and real-time events'} role="img">
    <span className="diagram-label">{variant === 'academy' ? '01 / A CONNECTED CLASSROOM' : '02 / CONNECTIONS, IN REAL TIME'}</span>
    <svg viewBox="0 0 600 350" aria-hidden="true">
      <defs><radialGradient id={`glow-${variant}`}><stop stopColor={variant === 'academy' ? '#6CCBD0' : '#8B79E6'} stopOpacity=".2"/><stop offset="1" stopColor="#0B0D12" stopOpacity="0"/></radialGradient></defs>
      <circle cx="300" cy="175" r="175" fill={`url(#glow-${variant})`}/>
      <g className="diagram-orbits" fill="none" stroke="currentColor" strokeOpacity=".25"><ellipse cx="300" cy="175" rx="200" ry="95" transform="rotate(-20 300 175)"/><ellipse cx="300" cy="175" rx="145" ry="145"/><ellipse cx="300" cy="175" rx="230" ry="125" transform="rotate(22 300 175)"/></g>
      <g fill="none" stroke="currentColor" strokeOpacity=".65"><path d="M145 94L300 175L470 96M300 175L326 293"/><path d="M145 94Q295 0 470 96Q520 230 326 293Q106 255 145 94" strokeDasharray="3 8"/></g>
      <g className="diagram-core"><circle cx="300" cy="175" r="49" fill="#121920" stroke="currentColor"/><circle cx="300" cy="175" r="57" fill="none" stroke="currentColor" strokeOpacity=".3"/><text x="300" y="172" textAnchor="middle" fill="#F3F0E9">{variant === 'academy' ? 'MyAcademy' : 'Konekt'}</text><text className="small" x="300" y="190" textAnchor="middle" fill="currentColor">{variant === 'academy' ? 'PORTAL' : 'SOCKET.IO'}</text></g>
      {[{ x: 145, y: 94, label: variant === 'academy' ? 'Admin' : 'People' }, { x: 470, y: 96, label: variant === 'academy' ? 'Teacher' : 'Posts' }, { x: 326, y: 293, label: variant === 'academy' ? 'Student' : 'Events' }].map(n => <g key={n.label}><circle cx={n.x} cy={n.y} r="7" fill="currentColor"/><circle cx={n.x} cy={n.y} r="16" fill="none" stroke="currentColor" strokeOpacity=".3"/><text x={n.x} y={n.y + 34} textAnchor="middle" fill="#F3F0E9">{n.label}</text></g>)}
    </svg>
    <span className="diagram-caption">{variant === 'academy' ? 'System overview' : 'Conceptual network'} <span>AUTHENTICATION → INTERACTION → PERSISTENCE</span></span>
  </div>;
}
