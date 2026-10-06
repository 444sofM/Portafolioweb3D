import { useEffect, useRef } from 'react'
import { zones } from '../data/content.js'
import './ZonePanel.css'

function Links({ links }) {
  return (
    <ul className="panel__links">
      {links.map((l) => (
        <li key={l.url}>
          <a href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
        </li>
      ))}
    </ul>
  )
}

export default function ZonePanel({ zoneId, onClose }) {
  const closeRef = useRef(null)
  const zone = zoneId ? zones[zoneId] : null

  useEffect(() => {
    if (!zone) return undefined
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zone, onClose])

  if (!zone) return null

  return (
    <aside className="panel" role="dialog" aria-labelledby="panel-title">
      <button ref={closeRef} type="button" className="panel__close" onClick={onClose} aria-label="Cerrar">
        ×
      </button>
      <h2 id="panel-title">{zone.title}</h2>
      {zone.subtitle && <p className="panel__subtitle">{zone.subtitle}</p>}

      {zone.paragraphs?.map((p) => <p key={p}>{p}</p>)}

      {zone.chips && (
        <ul className="panel__chips">
          {zone.chips.map((c) => <li key={c}>{c}</li>)}
        </ul>
      )}

      {zone.timeline?.map((t) => (
        <div className="panel__card" key={t.period + t.role}>
          <span className="panel__period">{t.period}</span>
          <h3>{t.role}</h3>
          <p className="panel__place">{t.place}</p>
          <p>{t.text}</p>
        </div>
      ))}

      {zone.groups?.map((g) => (
        <div key={g.name}>
          <h3>{g.name}</h3>
          <ul className="panel__chips">
            {g.items.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
      ))}

      {zone.projects?.map((p) => (
        <div className="panel__card" key={p.name}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <ul className="panel__chips">
            {p.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <a className="panel__cta" href={p.url} target="_blank" rel="noopener noreferrer">
            Ver proyecto →
          </a>
        </div>
      ))}

      {zone.links && <Links links={zone.links} />}
    </aside>
  )
}