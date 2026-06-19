// data/instagram.js

export const instagramFeed = [
  {
    id: 1,
    image: '/images/instagram/Image-506.jpg',
    alt: 'Wedding photography',
    label: 'Wedding',
    likes: 312,
    comments: 45,
    url: 'https://www.instagram.com/_raw_films/p/DYAWxt7madH/',
  },
  {
    id: 2,
    image: '/images/instagram/Image-400.jpg',
    alt: 'Film photography',
    label: 'Film',
    likes: 487,
    comments: 62,
    url: 'https://www.instagram.com/_raw_films/p/DYAWEuCGcQL/',
  },
  {
    id: 3,
    image: '/images/instagram/Image-394.jpg',
    alt: 'Pre-wedding photography',
    label: 'PreWedding',
    likes: 203,
    comments: 28,
    url: 'https://www.instagram.com/_raw_films/p/DYASE0VGVD-/',
  },
  {
    id: 4,
    image: '/images/instagram/Image-536.jpg',
    alt: 'Candid photography',
    label: 'Candid',
    likes: 361,
    comments: 51,
    url: 'https://www.instagram.com/_raw_films/p/DYARf3xibJL/',
  },
  {
    id: 5,
    image: '/images/instagram/Image-674.jpg',
    alt: 'Destination wedding',
    label: 'Destination',
    likes: 528,
    comments: 73,
    url: 'https://www.instagram.com/_raw_films/p/DX9nVZohNXq/',
  },
  {
    id: 6,
    image: '/images/instagram/Image-727.jpg',
    alt: 'Portrait photography',
    label: 'Portrait',
    likes: 194,
    comments: 23,
    url: 'https://www.instagram.com/_raw_films/p/DX9nEYHP7hN/',
  },
  {
    id: 7,
    image: '/images/instagram/Image-228.jpg',
    alt: 'Wedding photography',
    label: 'Wedding',
    likes: 456,
    comments: 58,
    url: 'https://www.instagram.com/_raw_films/p/DXIuOOfGfHd/',
  },
  {
    id: 8,
    image: '/images/instagram/Image-994.jpg',
    alt: 'Film photography',
    label: 'Film',
    likes: 80,
    comments: 1,
    url: 'https://www.instagram.com/_raw_films/p/DXIswwoGcZG/',
  },
  {
    id: 9,
    image: '/images/instagram/Image-417.jpg',
    alt: 'Film photography',
    label: 'Film',
    likes: 246,
    comments: 6,
    url: 'https://www.instagram.com/_raw_films/p/DXIsOmHmW5g/',
  },
  {
    id: 10,
    image: '/images/instagram/Image-735.jpg',
    alt: 'Film photography',
    label: 'Film',
    likes: 231,
    comments: 8,
    url: 'https://www.instagram.com/_raw_films/p/DUfv7RYknY4/',
  },
  {
    id: 11,
    image: '/images/instagram/Image-676.jpg',
    alt: 'Film photography',
    label: 'Film',
    likes: 176,
    comments: 34,
    url: 'https://www.instagram.com/_raw_films/p/DUfJfKEkrtK/',
  },
  {
    id: 12,
    image: '/images/instagram/Image-650.jpg',
    alt: 'Film photography',
    label: 'Film',
    likes: 242,
    comments: 14,
    url: 'https://www.instagram.com/_raw_films/p/DUfJDKtkjhf/',
  },
]

// Helper function to get all Instagram posts
export const getAllPosts = () => {
  return instagramFeed
}

// Helper function to get post by ID
export const getPostById = (id) => {
  return instagramFeed.find(post => post.id === id)
}

// Helper function to get posts by label
export const getPostsByLabel = (label) => {
  return instagramFeed.filter(post => post.label.toLowerCase() === label.toLowerCase())
}

// Helper function to get featured posts (top liked)
export const getFeaturedPosts = (limit = 4) => {
  return [...instagramFeed].sort((a, b) => b.likes - a.likes).slice(0, limit)
}

// Helper function to get unique labels
export const getAllLabels = () => {
  const labels = new Set()
  instagramFeed.forEach(post => {
    if (post.label) {
      labels.add(post.label)
    }
  })
  return Array.from(labels)
}

export default instagramFeed