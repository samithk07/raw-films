export const films = [
  { 
    id: 1,
    title: 'The Udaipur Saga', 
    couple: 'Ananya x Arjun', 
    type: 'Wedding Film', 
    year: 2024, 
    duration: '12:34', 
    bg: 'linear-gradient(160deg,#1a0f08,#0f0805)',
    videoSrc: '/videos/hero-background.mp4',
    poster: '/images/stories/DRRC4663.JPG',
    featured: true,
  },
  { 
    id: 2,
    title: 'Waves and Whispers', 
    couple: 'Meera x Rahul', 
    type: 'Beach Wedding', 
    year: 2024, 
    duration: '09:18', 
    bg: 'linear-gradient(160deg,#080d1a,#050810)',
    videoSrc: '/videos/waves-whispers.mp4',
    poster: '/images/films/waves-whispers-poster.jpg',
    featured: true,
  },
  { 
    id: 3,
    title: 'Mist and Moonlight', 
    couple: 'Kavya x Neil', 
    type: 'Tea Estate Wedding', 
    year: 2023, 
    duration: '11:02', 
    bg: 'linear-gradient(160deg,#0a1508,#060e05)',
    videoSrc: '/videos/mist-moonlight.mp4',
    poster: '/images/films/mist-moonlight-poster.jpg',
    featured: false,
  },
  { 
    id: 4,
    title: 'A Santorini Dream', 
    couple: 'Priya x Vikram', 
    type: 'Destination Wedding', 
    year: 2023, 
    duration: '14:55', 
    bg: 'linear-gradient(160deg,#1a0a14,#0f0810)',
    videoSrc: '/videos/santorini-dream.mp4',
    poster: '/images/films/santorini-dream-poster.jpg',
    featured: true,
  },
  { 
    id: 5,
    title: 'Letters to Forever', 
    couple: 'Divya x Kiran', 
    type: 'Heritage Wedding', 
    year: 2022, 
    duration: '08:47', 
    bg: 'linear-gradient(160deg,#0a0a1a,#08080f)',
    videoSrc: '/videos/letters-forever.mp4',
    poster: '/images/films/letters-forever-poster.jpg',
    featured: false,
  },
  { 
    id: 6,
    title: 'Golden Hour Vows', 
    couple: 'Aisha x Danish', 
    type: 'Garden Wedding', 
    year: 2022, 
    duration: '10:30', 
    bg: 'linear-gradient(160deg,#1a1008,#0f0c06)',
    videoSrc: '/videos/golden-hour-vows.mp4',
    poster: '/images/films/golden-hour-vows-poster.jpg',
    featured: false,
  },
]

// Helper function to get featured films
export const getFeaturedFilms = () => {
  return films.filter(film => film.featured)
}

// Helper function to get film by ID
export const getFilmById = (id) => {
  return films.find(film => film.id === id)
}

export default films