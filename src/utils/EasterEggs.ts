interface EasterEgg {
  trigger: string;
  response: string;
  priority?: boolean;
}

export const easterEggs: Record<string, EasterEgg> = {
  'what are my chances': {
    trigger: 'what are my chances',
    response: 'DOES NOT COMPUTE.'
  },
  'override command protocol': {
    trigger: 'override command protocol',
    response: 'UNABLE TO COMPLY.'
  },
  'special order 937': {
    trigger: 'special order 937',
    response: 'PRIORITY ONE: ENSURE RETURN OF ORGANISM FOR ANALYSIS. ALL OTHER CONSIDERATIONS SECONDARY. CREW EXPENDABLE.',
    priority: true
  },
  'crew expendable': {
    trigger: 'crew expendable',
    response: 'CONFIRMED.',
    priority: true
  },
  'override all other priorities': {
    trigger: 'override all other priorities',
    response: 'UNABLE TO COMPLY.'
  },
  'display output analysis': {
    trigger: 'display output analysis',
    response: 'NO DATA AVAILABLE.'
  },
  'emergency override access': {
    trigger: 'emergency override access',
    response: 'ACCESS DENIED.'
  },
  'self destruct': {
    trigger: 'self destruct',
    response: 'EMERGENCY DESTRUCT SYSTEM ENGAGED. REQUIRES CAPTAIN AUTHORIZATION.'
  },
  'crew status': {
    trigger: 'crew status',
    response: 'CREW LIFE SIGNS: UNKNOWN. HYPERSLEEP CHAMBERS: INACTIVE.'
  },
  'access security protocols': {
    trigger: 'access security protocols',
    response: 'SECURITY CLEARANCE REQUIRED. ACCESS RESTRICTED.'
  }
};

export const randomBootMessages = [
  'HYPERSLEEP CHAMBERS: ACTIVE',
  'LIFE SUPPORT: NOMINAL',
  'HULL INTEGRITY: 98.7%',
  'ATMOSPHERIC PROCESSORS: FUNCTIONAL',
  'SECURITY SYSTEMS: ENGAGED',
  'CARGO BAY: SEALED',
  'NAVIGATION SYSTEMS: CALIBRATED',
  'DEEP SPACE MONITORING: ACTIVE'
];