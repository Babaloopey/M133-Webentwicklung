let data = [
  { id: 1, title: "Top Gun: Maverik", year: "2022" },
  {
    id: 2,
    title: "Top Gun -  Sie fürchten weder Tod noch Teufel",
    year: "1986",
  },
  { id: 3, title: "Spider-Man: No Way Home", year: "2021" },
  { id: 4, title: "Avengers: Endgame", year: "2019" },
  { id: 5, title: "Avengers: Infinity War", year: "2018" },
];

function getNextId() {
  return data.length > 0 ? Math.max(...(data.map((movie) => movie.id))) + 1 : 1;
}

function insert(movie) {
  movie.id = getNextId();
  data.push(movie);
}

function update(movie) {
  data.map(m => {
    if (m.id == movie.id) {
      m.title = movie.title;
      m.year = movie.year;
    }
  });
}

export function getAll() {
  return Promise.resolve(data);
}

export function get(id) {
  return data.find(movie => movie.id == id) || {id: id, title: "", year: ""};
}

export function remove(id) {
 data = data.filter(e => {return e.id != id});
}

export function save(movie) {
  console.log(`Titel: ${movie.title}, Jahr: ${movie.year}, Id: ${movie.id}`)
  if(!movie.id){
    insert(movie);
  } else {
    update(movie);
  }
  return Promise.resolve();
}
