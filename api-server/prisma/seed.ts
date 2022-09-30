import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

const todoData: Array<Todo> = [
  {
    id: 1,
    title: 'Todo1',
    content: 'Todo1 content',
  },
  {
    id: 2,
    title: 'Todo2',
    content: 'Todo2 content',
  },
  {
    id: 3,
    title: 'Todo3',
    content: 'Todo3 content',
  },
];

const dbSeed = async () => {
  const todos = [];
  todoData.forEach((todo) => {
    const createTodos = prisma.todo.create({
      data: todo,
    });
    todos.push(createTodos);
  });
  return await prisma.$transaction(todos);
};

const main = async () => {
  console.log('Start seeding ...');

  await dbSeed();

  console.log('Seeding finished.');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
