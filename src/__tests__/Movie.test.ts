import Movie from '../Movie.js';

describe('Movie', () => {
  it('stores all required movie information', () => {
    const movie = new Movie(
      100,
      'Мстители',
      500,
      2012,
      'США',
      'Avengers Assemble',
      ['фантастика', 'боевик', 'фэнтези', 'приключения'],
      '137 мин. / 02:17'
    );

    expect(movie.id).toBe(100);
    expect(movie.name).toBe('Мстители');
    expect(movie.price).toBe(500);
    expect(movie.year).toBe(2012);
    expect(movie.country).toBe('США');
    expect(movie.slogan).toBe('Avengers Assemble');
    expect(movie.genres).toEqual(['фантастика', 'боевик', 'фэнтези', 'приключения']);
    expect(movie.duration).toBe('137 мин. / 02:17');
  });
});
