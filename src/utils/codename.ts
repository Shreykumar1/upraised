
const baseCodeNames : string[] = [
  'The Falcon',
  'The Leviathan',
  'The Hydra',
  'The Cobra',
  'The Specter',
  'The Hawk',
  'The Wolf',
  'The Panther',
  'The Cipher',
  'The Raptor',
  'The Aurora',
  'The Sentinel',
  'The Ghost',
  'The Avenger',
  'The Nomad',
  'The Voyager',
  'The Alpha',
  'The Maverick',
  'The Whisper',
];

  
  // Function to generate a random suffix
  const getRandomSuffix : () => string = () => {
    const suffixes = ['X', '2023', 'Alpha', 'Bravo', 'Charlie', 'Delta'];
    return suffixes[Math.floor(Math.random() * suffixes.length)];
  };
  
  const generateCodename : (prisma : any) => Promise<string> = async (prisma : any) => {
    if (!prisma) throw new Error('Prisma instance is undefined in generateCodename');

    let codename : string = '';
    let exists : boolean = true;
    while (exists) {
      // Randomly select a base codename
      const index : number = Math.floor(Math.random() * baseCodeNames.length);
      const baseCodeName : string = baseCodeNames[index];

      // Generate a new codename with a random suffix
      codename = `${baseCodeName} ${getRandomSuffix()}`;
      
      const gadget : any = await prisma.gadget.findUnique({ where: { codename } });
      exists = !!gadget;
    }
    return codename;
  };
  
  export default generateCodename;