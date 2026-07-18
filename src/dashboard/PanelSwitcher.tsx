import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Shield, User } from 'lucide-react';

interface PanelItem {
  id: string;
  label: string;
  description: string;
  icon: typeof Shield;
  hash: string;
}

const ADMIN_PANELS: PanelItem[] = [
  {
    id: 'admin',
    label: 'Admin Panel',
    description: 'Administrator',
    icon: Shield,
    hash: '#/dashboard',
  },
  {
    id: 'client-preview',
    label: 'Client Panel (Preview)',
    description: 'Preview client view',
    icon: User,
    hash: '#/client-dashboard',
  },
];

function getActivePanelId(): string {
  const hash = window.location.hash;
  if (hash === '#/client-dashboard') return 'client-preview';
  return 'admin';
}

export default function PanelSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(getActivePanelId);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onHashChange() {
      setActiveId(getActivePanelId());
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(hash: string) {
    setOpen(false);
    window.location.hash = hash;
  }

  const activePanel = ADMIN_PANELS.find((p) => p.id === activeId) ?? ADMIN_PANELS[0];

  return (
    <div ref={ref} className="ps-root">
      <button
        className="ps-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <div className="ps-icon-wrap">
          <activePanel.icon className="ps-icon" />
        </div>
        <div className="ps-text">
          <span className="ps-label">{activePanel.label}</span>
          <span className="ps-sub">{activePanel.description}</span>
        </div>
        <span className="ps-badge">ADMIN</span>
        <ChevronDown
          className={`ps-chevron ${open ? 'ps-chevron-open' : ''}`}
        />
      </button>

      {open && (
        <div className="ps-dropdown" role="listbox">
          {ADMIN_PANELS.map((panel) => (
            <button
              key={panel.id}
              className={`ps-option ${panel.id === activeId ? 'ps-option-active' : ''}`}
              onClick={() => handleSelect(panel.hash)}
              role="option"
              aria-selected={panel.id === activeId}
            >
              <div className="ps-option-icon-wrap">
                <panel.icon className="ps-option-icon" />
              </div>
              <div className="ps-option-text">
                <span className="ps-option-label">{panel.label}</span>
                <span className="ps-option-desc">{panel.description}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      <style>{`
        .ps-root {
          position: relative;
        }

        .ps-trigger {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          width: 100%;
          padding: 0.625rem 0.75rem;
          border-radius: 12px;
          border: 1.5px solid #E5E7EB;
          background: linear-gradient(135deg, #FAFBFF 0%, #FFFFFF 100%);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .ps-trigger:hover {
          border-color: #C7D2FE;
          background: linear-gradient(135deg, #F0F4FF 0%, #FAFBFF 100%);
          box-shadow: 0 1px 4px rgba(30, 64, 175, 0.06);
        }

        .ps-trigger:focus {
          outline: none;
          border-color: #1E40AF;
          box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.08);
        }

        .ps-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
          flex-shrink: 0;
        }

        .ps-icon {
          width: 16px;
          height: 16px;
          color: #FFFFFF;
        }

        .ps-text {
          display: flex;
          flex-direction: column;
          gap: 0.0625rem;
          flex: 1;
          min-width: 0;
        }

        .ps-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #0B0B0B;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ps-sub {
          font-size: 0.6875rem;
          font-weight: 500;
          color: #9CA3AF;
          line-height: 1.2;
        }

        .ps-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.125rem 0.4375rem;
          border-radius: 6px;
          background: rgba(30, 64, 175, 0.08);
          color: #1E40AF;
          font-size: 0.5625rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          line-height: 1;
          flex-shrink: 0;
        }

        .ps-chevron {
          width: 14px;
          height: 14px;
          color: #9CA3AF;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .ps-chevron-open {
          transform: rotate(180deg);
        }

        .ps-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          padding: 0.375rem;
          box-shadow: 0 4px 24px -4px rgba(0, 0, 0, 0.08), 0 8px 40px -8px rgba(0, 0, 0, 0.04);
          z-index: 50;
          animation: psDropIn 0.18s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes psDropIn {
          from {
            opacity: 0;
            transform: translateY(-4px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .ps-option {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          width: 100%;
          padding: 0.5rem 0.625rem;
          border-radius: 10px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .ps-option:hover {
          background: #F9FAFB;
        }

        .ps-option-active {
          background: rgba(30, 64, 175, 0.05);
        }

        .ps-option-active:hover {
          background: rgba(30, 64, 175, 0.08);
        }

        .ps-option-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: #F3F4F6;
          flex-shrink: 0;
          transition: background 0.15s ease;
        }

        .ps-option:hover .ps-option-icon-wrap {
          background: rgba(30, 64, 175, 0.08);
        }

        .ps-option-icon {
          width: 14px;
          height: 14px;
          color: #6B7280;
        }

        .ps-option:hover .ps-option-icon {
          color: #1E40AF;
        }

        .ps-option-text {
          display: flex;
          flex-direction: column;
          gap: 0.0625rem;
        }

        .ps-option-label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #374151;
          line-height: 1.2;
        }

        .ps-option:hover .ps-option-label {
          color: #0B0B0B;
        }

        .ps-option-active .ps-option-label {
          color: #1E40AF;
          font-weight: 600;
        }

        .ps-option-desc {
          font-size: 0.6875rem;
          color: #9CA3AF;
          line-height: 1.2;
        }
      `}</style>
    </div>
  );
}
