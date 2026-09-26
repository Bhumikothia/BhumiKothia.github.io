/**
 * Illustrative science photos (openly licensed, from Wikimedia Commons).
 * These are NOT images of Bhumi's own isolates or lab. Every use shows
 * a credit line and an "Illustrative" note.
 *
 * To add or replace one: put the file in src/assets/images/science/,
 * import it below, and fill in every field (licence terms require the credit).
 */
import type { ImageMetadata } from 'astro';
import gramStain from '../assets/images/science/bacillus-subtilis-gram-stain.jpg';
import colonies from '../assets/images/science/bacillus-subtilis-colonies.jpg';
import floc from '../assets/images/science/activated-sludge-floc.jpg';
import licheniformis from '../assets/images/science/bacillus-licheniformis-plate.jpg';
import clarifiers from '../assets/images/science/wastewater-clarifiers-aerial.jpg';
import aeration from '../assets/images/science/aeration-tank-bengaluru.jpg';
import plantAerial from '../assets/images/science/treatment-plant-bengaluru-aerial.jpg';

export interface SciencePhoto {
  src: ImageMetadata;
  alt: string;
  caption: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
}

export const photos = {
  gramStain: {
    src: gramStain,
    alt: 'Purple rod-shaped bacteria in chains on a pale background, seen through a light microscope',
    caption: 'Gram-stained Bacillus subtilis: rod-shaped, Gram-positive cells of the genus studied in this work.',
    author: 'Riraq25',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Bacillus_subtilis_Gram_stain.jpg',
  },
  colonies: {
    src: colonies,
    alt: 'Petri dish with cream-coloured bacterial colonies streaked across the agar',
    caption: 'Bacillus subtilis colonies streaked on an agar plate: the first step in isolating a pure culture.',
    author: 'A doubt',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Bacillus_subtilis_CLA_colonies_102.jpg',
  },
  floc: {
    src: floc,
    alt: 'Glowing blue and yellow cluster of microbial cells on a black background, seen under a fluorescence microscope',
    caption: 'A microbial cluster from activated sludge under fluorescence microscopy (DAPI stain): cells and particles held together in a floc.',
    author: 'BJMWW',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Cluster_of_PAOs.jpg',
  },
  licheniformis: {
    src: licheniformis,
    alt: 'Red blood-agar plate with pale Bacillus colonies streaked in zigzag lines',
    caption: 'Bacillus licheniformis growing on blood agar.',
    author: 'Stefan Walkowski',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Bacillus_licheniformis.jpg',
  },
  clarifiers: {
    src: clarifiers,
    alt: 'Aerial view of three round clarifier tanks at a wastewater treatment plant',
    caption: 'Clarifiers at a wastewater treatment plant, where solids settle out of the water: the step bioflocculants aim to improve.',
    author: 'Roen Wainscoat',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Wastewater_Clarifiers.jpg',
  },
  aeration: {
    src: aeration,
    alt: 'Large round aeration tank of brown, frothing wastewater at a treatment plant surrounded by trees',
    caption: 'Aeration tank of an activated-sludge sewage treatment plant in Bengaluru, India.',
    author: 'Vraj Acharya, WELL Labs',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Aeration_tank_activated_sludge_process_STP_Bengaluru_India.jpg',
  },
  plantAerial: {
    src: plantAerial,
    alt: 'Aerial view of circular sewage treatment tanks beside a green lake in Bengaluru',
    caption: 'A sewage treatment plant beside Doddabommasandra Lake, Bengaluru, India.',
    author: 'Vraj Acharya, WELL Labs',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Doddabommasandra_Lake_STP_Bengaluru_sewage_treatment_plant_aerial_view_India.jpg',
  },
} satisfies Record<string, SciencePhoto>;

export type PhotoKey = keyof typeof photos;
