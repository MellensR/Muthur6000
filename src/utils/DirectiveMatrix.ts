type Protocol = 'Alpha' | 'Beta' | 'Gamma' | 'Delta' | 'Epsilon' | 'Zeta';

interface DirectiveEntry {
  protocol: Protocol;
  number: number;
  directive: string;
}

export const directiveMatrix: DirectiveEntry[] = [
  // Alpha Protocol
  { protocol: 'Alpha', number: 1, directive: "Investigate... Distress Signal... Unknown Entity... Gravity Failure..." },
  { protocol: 'Alpha', number: 2, directive: "Repair... Communication... Space Debris... Toxic Gas..." },
  { protocol: 'Alpha', number: 3, directive: "Evacuate... Civilians... Saboteur... Reactor Meltdown..." },
  { protocol: 'Alpha', number: 4, directive: "Defend... Safe Zone... Xenomorph... Hull Breach..." },
  { protocol: 'Alpha', number: 5, directive: "Retrieve... Data Logs... Hostile Android... Electrical Malfunction..." },
  { protocol: 'Alpha', number: 6, directive: "Rescue... Scientist... Fire... Oxygen Leak..." },
  
  // Beta Protocol
  { protocol: 'Beta', number: 1, directive: "Negotiate... Trade Deal... Rival Corporation... Airlock Failure..." },
  { protocol: 'Beta', number: 2, directive: "Study... Alien Specimen... Research Team... Cryo Chamber Failure..." },
  { protocol: 'Beta', number: 3, directive: "Disable... Weapon System... Armed Drones... Fuel Leak..." },
  { protocol: 'Beta', number: 4, directive: "Escort... VIP... Rebel Faction... Thruster Malfunction..." },
  { protocol: 'Beta', number: 5, directive: "Quarantine... Infected Area... Contaminated Crew... Biohazard..." },
  { protocol: 'Beta', number: 6, directive: "Secure... Artifact... Smugglers... Radiation Leak..." },
  
  // Gamma Protocol
  { protocol: 'Gamma', number: 1, directive: "Fortify... Defense Systems... Incoming Fleet... System Overload..." },
  { protocol: 'Gamma', number: 2, directive: "Decode... Alien Language... Ancient Ruins... Power Surge..." },
  { protocol: 'Gamma', number: 3, directive: "Divert... Course... Space Pirates... Navigation Error..." },
  { protocol: 'Gamma', number: 4, directive: "Establish... Outpost... Settlers... Food Shortage..." },
  { protocol: 'Gamma', number: 5, directive: "Survey... Planet Surface... Storms... Extreme Temperatures..." },
  { protocol: 'Gamma', number: 6, directive: "Extract... Mineral Samples... Wildlife... Cave-in..." },
  
  // Delta Protocol
  { protocol: 'Delta', number: 1, directive: "Reboot... System... Malware... System Corruption..." },
  { protocol: 'Delta', number: 2, directive: "Transmit... SOS Signal... Rescuers... Signal Jammed..." },
  { protocol: 'Delta', number: 3, directive: "Recruit... Allies... Mercenaries... Trust Issues..." },
  { protocol: 'Delta', number: 4, directive: "Capture... Fugitive... Bounty Hunters... Ambush..." },
  { protocol: 'Delta', number: 5, directive: "Sabotage... Engine Room... Surveillance... Explosive Device..." },
  { protocol: 'Delta', number: 6, directive: "Infiltrate... Enemy Base... Guards... Alarm Triggered..." },
  
  // Epsilon Protocol
  { protocol: 'Epsilon', number: 1, directive: "Upgrade... Equipment... Tech Vendors... Equipment Malfunction..." },
  { protocol: 'Epsilon', number: 2, directive: "Train... Recruits... Drill Sergeant... Training Accident..." },
  { protocol: 'Epsilon', number: 3, directive: "Harvest... Resources... Scavengers... Resource Depletion..." },
  { protocol: 'Epsilon', number: 4, directive: "Mediate... Dispute... Colonists... Civil Unrest..." },
  { protocol: 'Epsilon', number: 5, directive: "Catalog... Species... Alien Fauna... Contagious Disease..." },
  { protocol: 'Epsilon', number: 6, directive: "Preserve... Ecosystem... Poachers... Environmental Collapse..." },
  
  // Zeta Protocol
  { protocol: 'Zeta', number: 1, directive: "Explore... Unknown Planet... First Contact... Hostile Environment..." },
  { protocol: 'Zeta', number: 2, directive: "Bypass... Nebula... Space Anomalies... Sensor Disruption..." },
  { protocol: 'Zeta', number: 3, directive: "Intervene... Conflict... Warring Factions... Crossfire..." },
  { protocol: 'Zeta', number: 4, directive: "Trade... Goods... Alien Merchants... Fraudulent Deal..." },
  { protocol: 'Zeta', number: 5, directive: "Dock... Space Station... Traders... Docking Failure..." },
  { protocol: 'Zeta', number: 6, directive: "Observe... Black Hole... Cosmic Phenomenon... Time Dilation..." }
];

export const getRandomDirective = (): DirectiveEntry => {
  return directiveMatrix[Math.floor(Math.random() * directiveMatrix.length)];
};