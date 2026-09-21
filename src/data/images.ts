/**
 * Curated photography, sourced from Unsplash (free-to-use license).
 * Each entry documents the search term it was chosen for, so any ID can be
 * swapped later without hunting through JSX. `unsplash()` builds the final
 * delivery URL against Unsplash's imgix-based CDN.
 */
function unsplash(id: string, width: number, height?: number) {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    q: '80',
    w: String(width),
  })
  if (height) params.set('h', String(height))
  return `https://images.unsplash.com/${id}?${params.toString()}`
}

export const images = {
  // 01 — hero: dark, cinematic, athlete under low key lighting
  hero: {
    id: 'photo-1517836357463-d25dfeac3438',
    search: 'man training dark gym silhouette',
    src: (w: number, h?: number) => unsplash('photo-1517836357463-d25dfeac3438', w, h),
  },
  // 02 — philosophy: quiet, focused, hands on barbell / chalk
  philosophy: {
    id: 'photo-1517963879433-6ad2b056d712',
    search: 'focused athlete barbell chalk hands',
    src: (w: number, h?: number) => unsplash('photo-1517963879433-6ad2b056d712', w, h),
  },
  // 03 — the space: architectural gym interiors, racks, plates, lighting
  space: [
    {
      id: 'photo-1534438327276-14e5300c3a48',
      search: 'weight plates stacked black and white',
      src: (w: number, h?: number) => unsplash('photo-1534438327276-14e5300c3a48', w, h),
    },
    {
      id: 'photo-1571019613454-1cb2f99b2d8b',
      search: 'kettlebells row gym floor',
      src: (w: number, h?: number) => unsplash('photo-1571019613454-1cb2f99b2d8b', w, h),
    },
    {
      id: 'photo-1583454110551-21f2fa2afe61',
      search: 'empty gym weight room dramatic light',
      src: (w: number, h?: number) => unsplash('photo-1583454110551-21f2fa2afe61', w, h),
    },
    {
      id: 'photo-1584735175315-9d5df23860e6',
      search: 'dark modern gym interior architecture',
      src: (w: number, h?: number) => unsplash('photo-1584735175315-9d5df23860e6', w, h),
    },
    {
      id: 'photo-1600965962102-9d260a71890d',
      search: 'woman lifting barbell gym',
      src: (w: number, h?: number) => unsplash('photo-1600965962102-9d260a71890d', w, h),
    },
    {
      id: 'photo-1550345332-09e3ac987658',
      search: 'gym wide shot squat rack',
      src: (w: number, h?: number) => unsplash('photo-1550345332-09e3ac987658', w, h),
    },
  ],
  // 04 — training categories
  training: {
    strength: {
      id: 'photo-1526506118085-60ce8714f8c5',
      search: 'kettlebell swing strength training',
      src: (w: number, h?: number) => unsplash('photo-1526506118085-60ce8714f8c5', w, h),
    },
    conditioning: {
      id: 'photo-1517960413843-0aee8e2b3285',
      search: 'battle ropes conditioning workout',
      src: (w: number, h?: number) => unsplash('photo-1517960413843-0aee8e2b3285', w, h),
    },
    performance: {
      id: 'photo-1476480862126-209bfaa8edc8',
      search: 'sprinter athlete explosive motion',
      src: (w: number, h?: number) => unsplash('photo-1476480862126-209bfaa8edc8', w, h),
    },
    recovery: {
      id: 'photo-1591741535018-d042766c62eb',
      search: 'stretching mobility recovery training',
      src: (w: number, h?: number) => unsplash('photo-1591741535018-d042766c62eb', w, h),
    },
  },
  // 06 — performance, full bleed dramatic motion
  performance: {
    id: 'photo-1571902943202-507ec2618e8f',
    search: 'athlete explosive movement gym',
    src: (w: number, h?: number) => unsplash('photo-1571902943202-507ec2618e8f', w, h),
  },
  // 07 — coaching portraits
  coaches: [
    {
      id: 'photo-1567013127542-490d757e51fc',
      search: 'athletic male coach portrait studio',
      src: (w: number, h?: number) => unsplash('photo-1567013127542-490d757e51fc', w, h),
    },
    {
      id: 'photo-1554344728-77cf90d9ed26',
      search: 'athletic female coach portrait confident',
      src: (w: number, h?: number) => unsplash('photo-1554344728-77cf90d9ed26', w, h),
    },
    {
      id: 'photo-1571731956672-f2b94d7dd0cb',
      search: 'strength coach portrait dark background',
      src: (w: number, h?: number) => unsplash('photo-1571731956672-f2b94d7dd0cb', w, h),
    },
    {
      id: 'photo-1548690312-e3b507d8c110',
      search: 'personal trainer portrait gym',
      src: (w: number, h?: number) => unsplash('photo-1548690312-e3b507d8c110', w, h),
    },
  ],
  // 08 — recovery
  recovery: [
    {
      id: 'photo-1591343395082-e120087004b4',
      search: 'foam rolling mobility recovery',
      src: (w: number, h?: number) => unsplash('photo-1591343395082-e120087004b4', w, h),
    },
    {
      id: 'photo-1600334129128-685c5582fd35',
      search: 'sauna wood interior calm',
      src: (w: number, h?: number) => unsplash('photo-1600334129128-685c5582fd35', w, h),
    },
    {
      id: 'photo-1517841905240-472988babdf9',
      search: 'athlete stretching cool down',
      src: (w: number, h?: number) => unsplash('photo-1517841905240-472988babdf9', w, h),
    },
  ],
  // 09 — member portraits for testimonials
  members: [
    {
      id: 'photo-1544367567-0f2fcb009e0b',
      search: 'confident member portrait gym',
      src: (w: number, h?: number) => unsplash('photo-1544367567-0f2fcb009e0b', w, h),
    },
    {
      id: 'photo-1500648767791-00dcc994a43e',
      search: 'athletic portrait natural light',
      src: (w: number, h?: number) => unsplash('photo-1500648767791-00dcc994a43e', w, h),
    },
    {
      id: 'photo-1517841905240-472988babdf9',
      search: 'member portrait post training',
      src: (w: number, h?: number) => unsplash('photo-1517841905240-472988babdf9', w, h),
    },
  ],
  // 10 — location / architecture exterior at dusk
  location: {
    id: 'photo-1449824913935-59a10b8d2000',
    search: 'modern building facade night city',
    src: (w: number, h?: number) => unsplash('photo-1449824913935-59a10b8d2000', w, h),
  },
  // 11 — final cta, motion blur / determined athlete
  finalCta: {
    id: 'photo-1546483875-ad9014c88eba',
    search: 'athlete determination gym black and white',
    src: (w: number, h?: number) => unsplash('photo-1546483875-ad9014c88eba', w, h),
  },
}
