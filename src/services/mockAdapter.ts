import { Post, Category, Author, Tag, ContentProvider, PostFilterOptions } from './types';

export const MOCK_AUTHORS: Record<string, Author> = {
  elena: {
    id: 'author-1',
    name: 'Elena Vance',
    slug: 'elena-vance',
    role: 'Principal Spatial Theorist & Essayist',
    bio: 'Fellow at the Zurich Institute for Spatial Studies. Her work examines acoustic architecture, tactile materialism, and the preservation of contemplative public environments.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    social: {
      twitter: 'https://twitter.com',
      website: 'https://elenavance.org',
      linkedin: 'https://linkedin.com',
    },
  },
  julian: {
    id: 'author-2',
    name: 'Julian Thorne',
    slug: 'julian-thorne',
    role: 'Editor-at-Large & Systems Architect',
    bio: 'Researches local-first software models, human-scale computing systems, and the preservation of the independent open web.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    social: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    },
  },
  beatrice: {
    id: 'author-3',
    name: 'Beatrice Fontaine',
    slug: 'beatrice-fontaine',
    role: 'Typographic Historian & Creative Director',
    bio: 'Lecturer in visual culture at the Royal College of Art. Specializes in Renaissance typography, editorial grid systems, and digital legibility.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    social: {
      website: 'https://beatricefontaine.design',
    },
  },
  arthur: {
    id: 'author-4',
    name: 'Arthur Pendelton',
    slug: 'arthur-pendelton',
    role: 'Senior Archival Fellow, Oxford',
    bio: 'Investigates physical and digital preservation infrastructures, parchment conservation, and centuries-long institutional memory.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
};

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-architecture',
    title: 'Architecture & Space',
    slug: 'architecture',
    description: 'Investigating physical enclosures, silence, acoustics, and built sanctuaries.',
    accentColor: '#9E472A',
    articleCount: 3,
  },
  {
    id: 'cat-technology',
    title: 'Technology & Craft',
    slug: 'technology',
    description: 'Human-scale computing, independent software, and anti-algorithmic tools.',
    accentColor: '#365347',
    articleCount: 4,
  },
  {
    id: 'cat-design',
    title: 'Design & Typography',
    slug: 'design',
    description: 'The invisible mechanics of letterforms, proportion, and aesthetic dignity.',
    accentColor: '#A6732E',
    articleCount: 2,
  },
  {
    id: 'cat-philosophy',
    title: 'Philosophy & Mind',
    slug: 'philosophy',
    description: 'Essays on attention, memory, stillness, and intellectual autonomy.',
    accentColor: '#2C3E50',
    articleCount: 3,
  },
  {
    id: 'cat-culture',
    title: 'Culture & Memory',
    slug: 'culture',
    description: 'Monuments, archives, literature, and the long horizon of preservation.',
    accentColor: '#6B4C35',
    articleCount: 2,
  },
];

export const MOCK_TAGS: Tag[] = [
  { id: 'tag-1', title: 'Acoustics', slug: 'acoustics' },
  { id: 'tag-2', title: 'Local-First', slug: 'local-first' },
  { id: 'tag-3', title: 'Editorial', slug: 'editorial' },
  { id: 'tag-4', title: 'Parchment', slug: 'parchment' },
  { id: 'tag-5', title: 'Stillness', slug: 'stillness' },
  { id: 'tag-6', title: 'Craft', slug: 'craft' },
  { id: 'tag-7', title: 'Typography', slug: 'typography' },
  { id: 'tag-8', title: 'Memory', slug: 'memory' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'The Architecture of Silence: On the Erasure of Contemplative Enclosures',
    slug: 'the-architecture-of-silence',
    subtitle: 'How modern physical and digital environments steadily erode the sacred acoustic buffers necessary for deep human deliberation.',
    excerpt: 'True silence is no longer an ambient condition of existence; it has become a luxury commodity, enclosed behind heavy triple-glazed glass or engineered into expensive noise-cancelling silicon.',
    publishedAt: '2026-10-18T09:00:00Z',
    readingTimeMinutes: 7,
    featured: true,
    issueNumber: 'Vol. 14 — Autumn',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
      alt: 'Minimalist brutalist concrete cloister with soft morning daylight',
      caption: 'The cloister of La Tourette, Le Corbusier. A spatial envelope where acoustic dampening fosters focused reflection.',
      credit: 'Photography by Simon Menges / Architectural Archive',
    },
    author: MOCK_AUTHORS.elena,
    categories: [MOCK_CATEGORIES[0], MOCK_CATEGORIES[3]],
    tags: [MOCK_TAGS[0], MOCK_TAGS[4], MOCK_TAGS[2]],
    tableOfContents: [
      { id: 'the-disappearance-of-acoustic-shelter', text: 'The Disappearance of Acoustic Shelter', level: 2 },
      { id: 'materiality-and-the-echo', text: 'Materiality and the Echo: Stone vs. Drywall', level: 2 },
      { id: 'the-monastic-blueprint', text: 'The Monastic Blueprint for Modern Solitude', level: 3 },
      { id: 'cognitive-residue', text: 'Cognitive Residue and Constant Frequency', level: 2 },
      { id: 'building-the-sanctuary', text: 'Building the Sanctuary: A Spatial Protocol', level: 2 },
    ],
    seo: {
      metaTitle: 'The Architecture of Silence — Elena Vance | Chronicle',
      metaDescription: 'An essay on acoustic architecture, spatial enclosures, and the biological necessity of contemplative silence in modern life.',
      shareImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'To walk through the stone cloister of an eleventh-century Cistercian abbey is to experience sound not as a chaotic barrage of competing signals, but as a bounded, reverent substance. In these spaces, sound does not scatter into the endless friction of traffic, air-conditioning compressors, and electronic chimes. It ascends into limestone rib vaults, absorbs into thick lime plaster, and settles into an unhurried stillness.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Modern architecture, by contrast, has waged an unspoken war against silence. The rise of glass curtain walls, open-plan corporate panopticons, and lightweight gypsum board has stripped the built environment of its acoustic thermal mass. We inhabit reverberant resonant chambers of hyper-stimulation, where the sensory apparatus is under uninterrupted low-level siege.',
          },
        ],
      },
      {
        _type: 'callout',
        type: 'editorial',
        title: 'The Acoustic Baseline Principle',
        text: 'A society that cannot design quiet public rooms will inevitably produce citizens incapable of sustained inner monologue. Silence is not emptiness; it is the physical medium in which judgment forms.',
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Disappearance of Acoustic Shelter',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Consider the historical role of the vestibule. Before the industrial revolution, public buildings were organized around progressive thresholds. One did not step immediately from the cacophony of the cobblestone street into the reading room of a library or the nave of a cathedral. One passed through an narthex, a portico, a heavy leather-curtained threshold, and an antechamber.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _type: 'span',
            text: 'We shape our buildings; thereafter they shape our auditory nervous system. When walls become membranes of glass and paper, the mind is denied any perimeter.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Each layer functioned as a physical frequency low-pass filter, dampening mechanical noise and allowing the autonomic nervous system to downshift. Today, the glass revolving door thrusts the individual instantaneously into an atrium whose acoustic decay time approaches three full seconds—a dizzying bath of reflected voices and hard tile clatter.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Materiality and the Echo: Stone vs. Drywall',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The problem is fundamentally material. Drywall over light-gauge metal studs does not dissipate bass frequencies; it acts as a flexible drum head, vibrating sympathetically with external noise while failing to isolate low-frequency rumble. Heavy masonry, hemp-lime composites, and raw timber, however, possess visceral acoustic damping properties that ground the room in acoustic warmth.',
          },
        ],
      },
      {
        _type: 'codeBlock',
        language: 'python',
        filename: 'reverberation_decay.py',
        code: `# Sabine Formula: Reverberation Time (RT60) calculation
def calculate_rt60(room_volume_m3: float, total_absorption_sabins: float) -> float:
    """Calculates reverberation time required for sound to decay by 60 dB."""
    METRIC_CONSTANT = 0.161
    if total_absorption_sabins <= 0:
        raise ValueError("Total absorption must be positive")
    return (METRIC_CONSTANT * room_volume_m3) / total_absorption_sabins

# Modern Glass Open Plan: ~2.4 seconds (Fatiguing)
# Contemplative Library Reading Room: ~0.65 seconds (Centering)`,
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'The Monastic Blueprint for Modern Solitude',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'What would it look like to reclaim the monastic cell as an urban typology? Not as a punitive isolation cell, but as a deliberate retreat. Architects such as Peter Zumthor and John Pawson have demonstrated that minimal surfaces need not feel clinical. When proportion, natural texture, and sound dampening converge, the space itself breathes.',
          },
        ],
      },
      {
        _type: 'inlineImage',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        alt: 'High-contrast architectural angles of concrete and shadow',
        caption: 'The play of light against absorbent tactile concrete in Vals, Switzerland.',
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Cognitive Residue and Constant Frequency',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Psycholinguists and neuroscientists have demonstrated that background human speech—even when unintelligible—monopolizes up to 30% of working memory capacity. Because our evolutionary hardware is tuned to decipher human speech phonemes, the brain cannot simply "tune out" conversational noise in an open space.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Building the Sanctuary: A Spatial Protocol',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Reclaiming silence is ultimately not a passive desire but an active architectural discipline. We must insist on civic rooms where commercial transactions are prohibited, where screens are banned, and where acoustic comfort is treated as a baseline public health standard.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Until our cities and homes honor the sanctity of the acoustic threshold, true peace of mind will remain an unbuilt blueprint.',
          },
        ],
      },
    ],
  },
  {
    id: 'post-2',
    title: 'The Artisanal Web and the Renaissance of Independent Software',
    slug: 'the-artisanal-web-renaissance',
    subtitle: 'Why centralized walled gardens are losing their cultural luster to bespoke, self-hosted digital sanctuaries and craft-built tools.',
    excerpt: 'The pendulum of digital culture is swinging back. Exhausted by algorithmic manipulation and venture-scale homogeneity, a growing confederation of designers and engineers is building software like furniture makers.',
    publishedAt: '2026-10-14T11:30:00Z',
    readingTimeMinutes: 6,
    featured: false,
    issueNumber: 'Vol. 14 — Autumn',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=85',
      alt: 'Clean minimalist developer workspace with warm natural desk and monitor',
      caption: 'The quiet desk of an independent software creator: local-first files, plain text, and personal servers.',
      credit: 'Photography by Andrew Neel',
    },
    author: MOCK_AUTHORS.julian,
    categories: [MOCK_CATEGORIES[1], MOCK_CATEGORIES[2]],
    tags: [MOCK_TAGS[1], MOCK_TAGS[5], MOCK_TAGS[2]],
    tableOfContents: [
      { id: 'the-monoculture-of-scale', text: 'The Monoculture of Scale', level: 2 },
      { id: 'software-as-furniture', text: 'Software as Furniture: The Dignity of Small Tools', level: 2 },
      { id: 'the-local-first-guarantee', text: 'The Local-First Guarantee', level: 2 },
      { id: 'an-indie-manifesto', text: 'An Indie Web Manifesto for the Next Decade', level: 2 },
    ],
    seo: {
      metaTitle: 'The Artisanal Web & Independent Software — Julian Thorne',
      metaDescription: 'Why small, durable, self-hosted tools and local-first architecture are replacing bloated venture software.',
      shareImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'For twenty years, the gospel of Silicon Valley insisted that software is only worthwhile if it reaches planetary scale. If an application could not capture three hundred million monthly active users and monetize their attention through automated behavioral auction houses, it was deemed a failure by venture capital.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Monoculture of Scale',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The consequence of this ideology has been a bleak aesthetic and functional monoculture. Every interface looks like it was generated by the same component library; every interaction is optimized for engagement metrics rather than deep human utility. Users do not own their tools—they rent fragile licenses revocable at any moment.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _type: 'span',
            text: 'A tool you cannot inspect, modify, run offline, or bequeath to your grandchildren is not personal property. It is merely a surveillance terminal.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Software as Furniture: The Dignity of Small Tools',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Contrast this with a handcrafted cherrywood desk. It does not phone home to report how many books you have placed upon it. It does not push unsolicited notifications at three in the morning. It requires neither a monthly subscription nor a terms-of-service agreement. It simply stands, graceful and silent, ready to support your work for half a century.',
          },
        ],
      },
      {
        _type: 'codeBlock',
        language: 'typescript',
        filename: 'storageContract.ts',
        code: `// The Local-First Software Contract
interface LocalFirstDocument<T> {
  readonly id: string;
  readonly localPath: string; // Plain Markdown, SQLite, or JSON on disk
  readonly schemaVersion: number;
  
  // Offline by default; network sync is an optional auxiliary layer
  persistLocally(): Promise<void>;
  exportToStandardFormat(): Blob;
  verifyZeroTelemetry(): boolean;
}`,
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Local-First Guarantee',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The local-first movement is not merely a technical architecture; it is an ethical stance. By storing user data in durable, open formats on the local machine and treating the cloud as an optional synchronization pipe rather than a proprietary jail, we restore digital sovereignty to the individual.',
          },
        ],
      },
    ],
  },
  {
    id: 'post-3',
    title: 'Typography as Moral Architecture: The Invisible Contract of Reading',
    slug: 'typography-as-moral-architecture',
    subtitle: 'The subtle ethics of letterforms, line measure, leading, and the quiet contract between writer and reader.',
    excerpt: 'Typography is not decorative clothing draped over words; it is the atmospheric physics through which meaning travels from one consciousness to another. When poorly tuned, it creates subconscious friction.',
    publishedAt: '2026-10-08T14:15:00Z',
    readingTimeMinutes: 5,
    featured: false,
    issueNumber: 'Vol. 14 — Autumn',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=85',
      alt: 'Close-up of printed letterpress book page with rich paper texture and serif type',
      caption: 'Fine letterpress setting on 120gsm laid paper. Notice the rhythmic balance of character width and generous margins.',
      credit: 'Photography by Hope House Press',
    },
    author: MOCK_AUTHORS.beatrice,
    categories: [MOCK_CATEGORIES[2], MOCK_CATEGORIES[3]],
    tags: [MOCK_TAGS[6], MOCK_TAGS[2], MOCK_TAGS[4]],
    tableOfContents: [
      { id: 'the-invisible-craft', text: 'The Invisible Craft', level: 2 },
      { id: 'the-golden-measure', text: 'The Golden Measure: 65 Characters per Line', level: 2 },
      { id: 'the-politics-of-legibility', text: 'The Politics of Legibility and Dark Mode', level: 2 },
    ],
    seo: {
      metaTitle: 'Typography as Moral Architecture — Beatrice Fontaine',
      metaDescription: 'An inquiry into typographic pacing, line lengths, leading, and the ethical responsibility of designers.',
      shareImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Beatrice Warde once famously compared typography to a crystal goblet. An exquisite wine, she argued, is best served in a flawless glass of absolute clarity, not a carved golden cup that obscures the vintage. For nearly a century, this metaphor has stood as the touchstone of modernist graphic discipline.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Invisible Craft',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Yet Warde’s metaphor is incomplete. The glass does not merely reveal the wine; its curvature directs the bouquet to the olfactory receptors, and its rim determines the velocity with which the liquid meets the palate. Typography does not merely convey semantic statements; it regulates cognitive tempo.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Golden Measure: 65 Characters per Line',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'When a web page stretches text across the entire width of a wide monitor—spanning 120 or 150 characters per line—the human eye must perform muscular gymnastics to find the beginning of the next sentence. Fatigue sets in within two paragraphs. The optimal measure remains what Robert Bringhurst identified: between 55 and 75 characters.',
          },
        ],
      },
      {
        _type: 'callout',
        type: 'note',
        title: 'Editorial Rule of Proportion',
        text: 'A reading column should breathe. Margins are not wasted whitespace; they are the buffer zone that protects the text from the visual entropy of the room.',
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Politics of Legibility and Dark Mode',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Too many dark themes make the grave error of setting pure #FFFFFF text against pure #000000 voids. The resulting halation—the bleeding of stark light into the surrounding darkness—strains the retina. True editorial dark mode requires warmth: charcoal, deep bronze, and linen-tinted ink.',
          },
        ],
      },
    ],
  },
  {
    id: 'post-4',
    title: 'The Long Now of Memory: Physical Archives in an Ephemeral Era',
    slug: 'the-long-now-of-memory',
    subtitle: 'In an epoch where digital records evaporate into bit rot and abandoned servers, what does it mean to build monuments that outlast a century?',
    excerpt: 'We produce more documentation per hour than seventeenth-century Europe produced in an entire decade, yet our civilization is at risk of leaving behind a vast digital dark age.',
    publishedAt: '2026-09-28T16:40:00Z',
    readingTimeMinutes: 8,
    featured: false,
    issueNumber: 'Vol. 13 — Summer',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=85',
      alt: 'Atmospheric library vault with dark mahogany shelves and leather-bound volumes',
      caption: 'The Bodleian Library stacks. Acid-free vellum and oak gall ink that have survived six centuries of damp European weather.',
      credit: 'Photography by Giammarco Boscaro',
    },
    author: MOCK_AUTHORS.arthur,
    categories: [MOCK_CATEGORIES[4], MOCK_CATEGORIES[3]],
    tags: [MOCK_TAGS[7], MOCK_TAGS[3], MOCK_TAGS[2]],
    tableOfContents: [
      { id: 'the-peril-of-bit-rot', text: 'The Peril of Bit Rot and Cloud Amnesia', level: 2 },
      { id: 'parchment-vs-magnetic-tape', text: 'Parchment vs. Magnetic Tape', level: 2 },
      { id: 'the-curators-responsibility', text: 'The Curator’s Institutional Responsibility', level: 2 },
    ],
    seo: {
      metaTitle: 'The Long Now of Memory — Arthur Pendelton | Chronicle',
      metaDescription: 'A meditation on physical preservation, digital obsolescence, and how institutions safeguard collective knowledge.',
      shareImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'In the deep vaults beneath Oxford, there exists a fragment of vellum penned in 1240. The iron gall ink has browned slightly with the passage of seven hundred and eighty years, but the Latin script remains crisp, legible, and uncorrupted. No operating system update is required to read it; no proprietary driver stands between the human retina and the inscription.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Peril of Bit Rot and Cloud Amnesia',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'By contrast, attempt to open a Word document saved on a 3.5-inch floppy disk in 1994, or retrieve an essay published on a startup platform that shut down its servers five years ago. Digital information does not decay gracefully; it vanishes catastrophically.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _type: 'span',
            text: 'Our ancestors carved their treaties into basalt. We entrust our civilizational inheritance to transient corporate entities whose average life expectancy is twelve years.',
          },
        ],
      },
    ],
  },
  {
    id: 'post-5',
    title: 'Quiet Systems: Designing for Stillness in an Era of High Urgency',
    slug: 'quiet-systems-stillness',
    subtitle: 'Why the most durable engineering architectures prioritize predictability, gentle failure modes, and cognitive calm over hyper-reactivity.',
    excerpt: 'Modern software architecture has become obsessively reactive—pushing realtime web sockets, instant badges, and synthetic urgency into every corner of human work. But calm systems endure.',
    publishedAt: '2026-09-15T08:00:00Z',
    readingTimeMinutes: 5,
    featured: false,
    issueNumber: 'Vol. 13 — Summer',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
      alt: 'Misty alpine lake surrounded by quiet pine forest at dawn',
      caption: 'Lake Bohinj at dawn. Still water reflects mountain contours with zero latency, zero turbulence.',
      credit: 'Photography by Ales Krivec',
    },
    author: MOCK_AUTHORS.julian,
    categories: [MOCK_CATEGORIES[1], MOCK_CATEGORIES[3]],
    tags: [MOCK_TAGS[4], MOCK_TAGS[1], MOCK_TAGS[5]],
    tableOfContents: [
      { id: 'the-cult-of-realtime', text: 'The Cult of Realtime', level: 2 },
      { id: 'asynchronous-grace', text: 'Asynchronous Grace and Static Files', level: 2 },
      { id: 'dignity-in-slowness', text: 'Dignity in Slowness', level: 2 },
    ],
    seo: {
      metaTitle: 'Quiet Systems — Julian Thorne | Chronicle',
      metaDescription: 'How to build calm, static, durable software systems that respect user attention.',
      shareImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'When Mark Weiser and John Seely Brown authored their seminal 1996 paper "The Coming Age of Calm Technology," they foresaw a future where computers would fade gently into the periphery of our attention. Instead, our devices have colonized the focal center of consciousness with predatory notifications.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Cult of Realtime',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Every dashboard now pretends to be a nuclear power plant monitoring console. We are inundated with live tickers, blinking status indicators, and pulsating badges for events that could comfortably wait until tomorrow afternoon.',
          },
        ],
      },
    ],
  },
  {
    id: 'post-6',
    title: 'The Ecology of Light: Night Skies, Circadian Architecture, and Solitude',
    slug: 'the-ecology-of-light',
    subtitle: 'Reclaiming darkness as an essential biological, creative, and psychological territory in the modern city.',
    excerpt: 'Artificial light has extended human commerce into the midnight hours, but at a profound cost to the subconscious mind. What happens when the night sky is erased from human experience?',
    publishedAt: '2026-08-30T20:10:00Z',
    readingTimeMinutes: 4,
    featured: false,
    issueNumber: 'Vol. 13 — Summer',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85',
      alt: 'Silhouetted stone ridge beneath starry indigo night sky',
      caption: 'The night sky over the Atacama Desert. Unbroken cosmic blackness revealing the Milky Way.',
      credit: 'Photography by Benjamin Voros',
    },
    author: MOCK_AUTHORS.elena,
    categories: [MOCK_CATEGORIES[0], MOCK_CATEGORIES[4]],
    tags: [MOCK_TAGS[4], MOCK_TAGS[7]],
    tableOfContents: [
      { id: 'the-erasure-of-night', text: 'The Erasure of Night', level: 2 },
      { id: 'circadian-recalibration', text: 'Circadian Recalibration', level: 2 },
    ],
    seo: {
      metaTitle: 'The Ecology of Light — Elena Vance | Chronicle',
      metaDescription: 'Reclaiming true darkness and silence as essential biological and creative spaces.',
      shareImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Over 80 percent of the world’s population lives beneath light-polluted skies. In most modern metropolises, a child can grow to adulthood without once looking up to see the luminous spiral arm of the Milky Way arching across the firmament.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Erasure of Night',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'To lose the night is not merely an aesthetic tragedy; it is an ontological rupture. The nocturnal sky provided humanity with its original calendar, its original mythology, and its most humbling confrontation with cosmic scale.',
          },
        ],
      },
    ],
  },
];

export class MockContentAdapter implements ContentProvider {
  name = 'Mock Editorial Provider (Fallback)';
  isFallback = true;

  async getPosts(options?: PostFilterOptions): Promise<Post[]> {
    let posts = [...MOCK_POSTS];

    if (options?.categorySlug) {
      posts = posts.filter((p) =>
        p.categories.some((c) => c.slug.toLowerCase() === options.categorySlug?.toLowerCase())
      );
    }

    if (options?.tagSlug) {
      posts = posts.filter((p) =>
        p.tags.some((t) => t.slug.toLowerCase() === options.tagSlug?.toLowerCase())
      );
    }

    if (options?.searchQuery) {
      const q = options.searchQuery.toLowerCase().trim();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.name.toLowerCase().includes(q) ||
          p.categories.some((c) => c.title.toLowerCase().includes(q))
      );
    }

    if (options?.excludeSlug) {
      posts = posts.filter((p) => p.slug !== options.excludeSlug);
    }

    if (options?.featuredOnly) {
      posts = posts.filter((p) => p.featured);
    }

    if (options?.offset) {
      posts = posts.slice(options.offset);
    }

    if (options?.limit) {
      posts = posts.slice(0, options.limit);
    }

    return posts;
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    const post = MOCK_POSTS.find((p) => p.slug === slug);
    return post || null;
  }

  async getFeaturedPost(): Promise<Post | null> {
    const featured = MOCK_POSTS.find((p) => p.featured) || MOCK_POSTS[0];
    return featured || null;
  }

  async getSecondarySpotlights(limit: number = 2): Promise<Post[]> {
    const nonFeatured = MOCK_POSTS.filter((p) => !p.featured);
    return nonFeatured.slice(0, limit);
  }

  async getRelatedPosts(currentSlug: string, categorySlug?: string, limit: number = 3): Promise<Post[]> {
    return MOCK_POSTS.filter((p) => {
      if (p.slug === currentSlug) return false;
      if (categorySlug && p.categories.some((c) => c.slug === categorySlug)) return true;
      return true;
    }).slice(0, limit);
  }

  async getCategories(): Promise<Category[]> {
    return MOCK_CATEGORIES;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return MOCK_CATEGORIES.find((c) => c.slug === slug) || null;
  }

  async getTags(): Promise<Tag[]> {
    return MOCK_TAGS;
  }

  async getAdjacentPosts(currentSlug: string): Promise<{
    prev: Pick<Post, 'slug' | 'title' | 'coverImage'> | null;
    next: Pick<Post, 'slug' | 'title' | 'coverImage'> | null;
  }> {
    const index = MOCK_POSTS.findIndex((p) => p.slug === currentSlug);
    if (index === -1) return { prev: null, next: null };

    const prev = index > 0 ? {
      slug: MOCK_POSTS[index - 1].slug,
      title: MOCK_POSTS[index - 1].title,
      coverImage: MOCK_POSTS[index - 1].coverImage,
    } : null;

    const next = index < MOCK_POSTS.length - 1 ? {
      slug: MOCK_POSTS[index + 1].slug,
      title: MOCK_POSTS[index + 1].title,
      coverImage: MOCK_POSTS[index + 1].coverImage,
    } : null;

    return { prev, next };
  }
}
