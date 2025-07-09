import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Add a movie to the database
async function createMovie() {
  const newMovie = await prisma.movie.create({
    data: {
      title: "Inception",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      genre: "Science Fiction",
      releaseDate: new Date("2010-07-16"),
      rating: 8.8,
    },
  });
}

// Add multiple movies to the database
async function createMultipleMovies() {
  const movies = await prisma.movie.createMany({
    data: [
      {
        title: "The Dark Knight",
        description:
          "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
        genre: "Action",
        releaseDate: new Date("2008-07-18"),
        rating: 9.0,
      },
      {
        title: "Alien Covenant",
        description:
          "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        genre: "Adventure",
        releaseDate: new Date("2014-11-07"),
        rating: 8.6,
      },
    ],
  });
}

// Get all movies from the database
async function getAllMovies() {
  const movies = await prisma.movie.findMany();
  console.log(movies);
}

// Get specific movie by id
async function getMovieById(movieId: number) {
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });
  console.log(movie);
}

// Update movie by id
async function updateMovie(
  movieId: number,
  updatedTitle: string,
  updatedDescription: string
) {
  const updatedMovie = await prisma.movie.update({
    where: { id: movieId },
    data: {
      title: updatedTitle,
      description: updatedDescription,
    },
  });
  console.log(updatedMovie);
}

// Delete movie by id
async function deleteMovie(movieId: number) {
  const deletedMovie = await prisma.movie.delete({
    where: { id: movieId },
  });
  console.log(deletedMovie);
}

async function main() {
  await createMovie();
  await createMultipleMovies();
  await getAllMovies();
  await getMovieById(1);
  await updateMovie(
    1,
    "Inception Updated",
    "Updated description for Inception"
  );
  await deleteMovie(1);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
