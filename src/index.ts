import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

async function main() {
  await createMovie();
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
