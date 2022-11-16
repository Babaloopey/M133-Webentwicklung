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
  return Math.max(...(data.map((movie) => movie.id) + 1));
}

function insert(movie) {
  movie.id = getNextId();
  data.push(movie);
}

function update(movie) {
  // TODO
}

export function getAll() {
  return Promise.resolve(data);
}

export function get(id) {
  // TODO
}

export function remove(id) {
 data.filter(function(item){
    return item.id = id;
 })  
}

  export function save(movie) {
    if(movie.id === ''){
        insert(movie);
    } else {
        update(movie);
    }
    return Promise.resolve();

  }
