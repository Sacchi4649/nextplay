// Custom Gaming SVG Icons with gradients and effects
export function GameControllerIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="controller-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path d="M52 20H12C8.68629 20 6 22.6863 6 26V38C6 41.3137 8.68629 44 12 44H20L24 50H40L44 44H52C55.3137 44 58 41.3137 58 38V26C58 22.6863 55.3137 20 52 20Z" stroke="url(#controller-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="44" cy="28" r="3" fill="url(#controller-grad)"/>
      <circle cx="50" cy="34" r="3" fill="url(#controller-grad)"/>
      <circle cx="44" cy="40" r="3" fill="url(#controller-grad)"/>
      <circle cx="38" cy="34" r="3" fill="url(#controller-grad)"/>
      <path d="M16 28V40" stroke="url(#controller-grad)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M10 34H22" stroke="url(#controller-grad)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

export function RocketLaunchIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rocket-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="flame-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <path d="M32 6C32 6 20 18 20 36C20 40 21 44 24 48L32 44L40 48C43 44 44 40 44 36C44 18 32 6 32 6Z" stroke="url(#rocket-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="26" r="4" fill="url(#rocket-grad)"/>
      <path d="M24 48L20 58L32 52L44 58L40 48" stroke="url(#flame-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 30C14 30 18 32 20 36" stroke="url(#rocket-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M50 30C50 30 46 32 44 36" stroke="url(#rocket-grad)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function SparkleStarIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <path d="M32 4L38 24L58 24L42 38L48 58L32 46L16 58L22 38L6 24L26 24L32 4Z" stroke="url(#star-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="url(#star-grad)" fillOpacity="0.2"/>
      <circle cx="50" cy="12" r="2" fill="url(#star-grad)"/>
      <circle cx="14" cy="14" r="1.5" fill="url(#star-grad)"/>
      <circle cx="54" cy="44" r="1.5" fill="url(#star-grad)"/>
    </svg>
  );
}

export function ShieldLockIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <path d="M32 6L8 16V30C8 44 18 54 32 58C46 54 56 44 56 30V16L32 6Z" stroke="url(#shield-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="24" y="28" width="16" height="14" rx="2" stroke="url(#shield-grad)" strokeWidth="2"/>
      <path d="M28 28V24C28 21.7909 29.7909 20 32 20C34.2091 20 36 21.7909 36 24V28" stroke="url(#shield-grad)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="32" cy="35" r="2" fill="url(#shield-grad)"/>
    </svg>
  );
}

export function CommunityIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="community-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="18" r="8" stroke="url(#community-grad)" strokeWidth="3"/>
      <circle cx="14" cy="26" r="6" stroke="url(#community-grad)" strokeWidth="2"/>
      <circle cx="50" cy="26" r="6" stroke="url(#community-grad)" strokeWidth="2"/>
      <path d="M20 46C20 38.268 25.268 32 32 32C38.732 32 44 38.268 44 46" stroke="url(#community-grad)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M6 50C6 44.477 9.582 40 14 40" stroke="url(#community-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M58 50C58 44.477 54.418 40 50 40" stroke="url(#community-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M26 54H38" stroke="url(#community-grad)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

export function GlobeNetworkIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="globe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="24" stroke="url(#globe-grad)" strokeWidth="3"/>
      <ellipse cx="32" cy="32" rx="10" ry="24" stroke="url(#globe-grad)" strokeWidth="2"/>
      <path d="M8 32H56" stroke="url(#globe-grad)" strokeWidth="2"/>
      <path d="M12 20H52" stroke="url(#globe-grad)" strokeWidth="1.5" strokeDasharray="4 2"/>
      <path d="M12 44H52" stroke="url(#globe-grad)" strokeWidth="1.5" strokeDasharray="4 2"/>
      <circle cx="32" cy="32" r="4" fill="url(#globe-grad)"/>
      <circle cx="20" cy="20" r="2" fill="url(#globe-grad)"/>
      <circle cx="44" cy="44" r="2" fill="url(#globe-grad)"/>
    </svg>
  );
}

export function TargetAimIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="target-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="24" stroke="url(#target-grad)" strokeWidth="3"/>
      <circle cx="32" cy="32" r="16" stroke="url(#target-grad)" strokeWidth="2"/>
      <circle cx="32" cy="32" r="8" stroke="url(#target-grad)" strokeWidth="2"/>
      <circle cx="32" cy="32" r="3" fill="url(#target-grad)"/>
      <path d="M32 4V12" stroke="url(#target-grad)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M32 52V60" stroke="url(#target-grad)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M4 32H12" stroke="url(#target-grad)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M52 32H60" stroke="url(#target-grad)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

export function TrophyIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trophy-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path d="M18 8H46V24C46 32.8366 38.8366 40 30 40H34C25.1634 40 18 32.8366 18 24V8Z" stroke="url(#trophy-grad)" strokeWidth="3"/>
      <path d="M18 14H10C10 14 8 14 8 18C8 22 12 26 18 26" stroke="url(#trophy-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M46 14H54C54 14 56 14 56 18C56 22 52 26 46 26" stroke="url(#trophy-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 40V48" stroke="url(#trophy-grad)" strokeWidth="3"/>
      <path d="M22 56H42" stroke="url(#trophy-grad)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M26 48H38V52C38 54.2091 36.2091 56 34 56H30C27.7909 56 26 54.2091 26 52V48Z" fill="url(#trophy-grad)" fillOpacity="0.3" stroke="url(#trophy-grad)" strokeWidth="2"/>
      <circle cx="32" cy="20" r="6" stroke="url(#trophy-grad)" strokeWidth="2"/>
      <text x="32" y="24" textAnchor="middle" fill="url(#trophy-grad)" fontSize="10" fontWeight="bold">1</text>
    </svg>
  );
}

// Mission/Discovery Icon - represents finding and exploring games
export function DiscoveryIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="discovery-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="compass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      {/* Outer compass ring */}
      <circle cx="32" cy="32" r="26" stroke="url(#discovery-grad)" strokeWidth="3"/>
      {/* Direction markers */}
      <path d="M32 8V14" stroke="url(#discovery-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 50V56" stroke="url(#discovery-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 32H14" stroke="url(#discovery-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M50 32H56" stroke="url(#discovery-grad)" strokeWidth="2" strokeLinecap="round"/>
      {/* Compass needle pointing to discovery */}
      <path d="M32 18L38 32L32 46L26 32L32 18Z" fill="url(#compass-grad)" fillOpacity="0.3" stroke="url(#compass-grad)" strokeWidth="2" strokeLinejoin="round"/>
      {/* Center gaming element */}
      <circle cx="32" cy="32" r="6" fill="url(#discovery-grad)" fillOpacity="0.2" stroke="url(#discovery-grad)" strokeWidth="2"/>
      {/* Play symbol in center */}
      <path d="M30 28L36 32L30 36V28Z" fill="url(#discovery-grad)"/>
      {/* Sparkle effects */}
      <circle cx="46" cy="18" r="2" fill="url(#compass-grad)"/>
      <circle cx="18" cy="46" r="1.5" fill="url(#discovery-grad)"/>
    </svg>
  );
}

// Gaming Journey Icon - represents the path to finding perfect games  
export function JourneyIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="journey-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      {/* Winding path */}
      <path d="M8 52C8 52 16 44 24 44C32 44 32 52 40 52C48 52 56 44 56 36" stroke="url(#path-grad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 4"/>
      {/* Starting point - player */}
      <circle cx="8" cy="52" r="4" fill="url(#journey-grad)"/>
      {/* Checkpoints */}
      <circle cx="24" cy="44" r="3" stroke="url(#journey-grad)" strokeWidth="2"/>
      <circle cx="40" cy="52" r="3" stroke="url(#journey-grad)" strokeWidth="2"/>
      {/* Destination - game controller */}
      <rect x="48" cy="28" width="12" height="8" rx="2" stroke="url(#path-grad)" strokeWidth="2"/>
      <circle cx="51" cy="32" r="1" fill="url(#path-grad)"/>
      <circle cx="57" cy="32" r="1" fill="url(#path-grad)"/>
      {/* Flag at destination */}
      <path d="M54 20V28" stroke="url(#path-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M54 20L62 24L54 28" fill="url(#path-grad)" fillOpacity="0.5" stroke="url(#path-grad)" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Stars along the way */}
      <path d="M18 36L19.5 32L21 36L17 33.5H23L19 36Z" fill="#fbbf24"/>
      <path d="M44 40L45 37.5L46 40L43.5 38.5H46.5Z" fill="#fbbf24" transform="scale(0.8) translate(8, 6)"/>
    </svg>
  );
}
