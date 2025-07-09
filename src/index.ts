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

async function main() {
  await createMovie();
  await createMultipleMovies();
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
