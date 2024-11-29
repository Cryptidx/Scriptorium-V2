// const bcrypt = require('bcrypt');

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// // Execute with: `node seed.js`
// /* GPT: create me a sys admin user  */
// const saltRounds = 10;


// // PRE POPULATED DB 
// // Log in 2 users 
// // Let usr 1 create a blog 
// // User one creates a comment in their own blog 
// // user 2 crreates a comment in user 1 blog 
// // user 1 makes a template and saves it 
// // user 2 makes 2 other blogs but no commets 

// async function loginUsr1(){

// }

// async function main() {
//   // Define sys admin details
//   const email = 'admin@example.com';
//   const password = 'SecurePassword123!';
//   const firstName = 'Sys';
//   const lastName = 'Admin';
//   const phoneNumber = '0000000000'; // Placeholder, adjust if needed
//   const role = 'SYS_ADMIN'; // Ensure this matches exactly with your schema

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, saltRounds);

//   try {
//     // Check if a sys admin user already exists
//     const existingSysAdmin = await prisma.user.findFirst({
//       where: { role: 'SYS_ADMIN' },
//     });

//     if (existingSysAdmin) {
//       console.log('A sys admin user already exists. Aborting.');
//       process.exit(1);
//     }

//     // Insert the new sys admin user into the database
//     const sysAdminUser = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         firstName,
//         lastName,
//         phoneNumber,
//         role,
//       },
//     });

//     console.log('Sys admin created successfully:', {
//       id: sysAdminUser.id,
//       email: sysAdminUser.email,
//       role: sysAdminUser.role,
//     });
//   } catch (error) {
//     console.error('Error creating sys admin:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   });


const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const saltRounds = 10;

async function createSysAdmin() {
  const email = 'admin@example.com';
  const password = 'SecurePassword123!';
  const firstName = 'Sys';
  const lastName = 'Admin';
  const phoneNumber = '0000000000';
  const role = 'SYS_ADMIN';

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const existingSysAdmin = await prisma.user.findFirst({ where: { role: 'SYS_ADMIN' } });

  if (existingSysAdmin) {
    console.log('A sys admin user already exists.');
    return existingSysAdmin;
  }

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      role,
    },
  });
}

async function createUsers() {
  const users = [
    {
      email: 'user1@example.com',
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      role: 'USER',
    },
    {
      email: 'user2@example.com',
      password: 'Password123!',
      firstName: 'Jane',
      lastName: 'Smith',
      phoneNumber: '0987654321',
      role: 'USER',
    },
  ];

  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, saltRounds),
    }))
  );

  return Promise.all(
    hashedUsers.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      })
    )
  );
}

async function createTags() {
  const tags = ['JavaScript', 'React', 'Prisma', 'Node.js', 'Database'];

  return Promise.all(
    tags.map((tag) =>
      prisma.tag.upsert({
        where: { name: tag },
        update: {},
        create: { name: tag },
      })
    )
  );
}

async function createTemplates(users, tags) {
  const templates = [
    {
      ownerId: users[0].id,
      code: 'console.log("Hello, world!");',
      language: 'JavaScript',
      title: 'Hello World',
      explanation: 'A basic JavaScript Hello World example.',
      tags: { connect: [{ id: tags[0].id }] },
    },
    {
      ownerId: users[1].id,
      code: '<div>Hello, React!</div>',
      language: 'React',
      title: 'React Basics',
      explanation: 'Introduction to React components.',
      tags: { connect: [{ id: tags[1].id }, { id: tags[2].id }] },
    },
    {
      ownerId: users[1].id,
      language: 'swift',
      code: "import Foundation\n\n// Read first input\nif let userInput1 = readLine() {\n    // Read second input\n    if let userInput2 = readLine() {\n        // Print both inputs\n        print(userInput1)\n        print(userInput2)\n    }\n}",
      title: "File 2",
      explanation: "A simple file I cannot edit",
      tags: { connect: [{ id: tags[0].id }] },
     
  }
  ];

  return Promise.all(
    templates.map((template) => prisma.template.create({ data: template }))
  );
}

async function createBlogs(users, templates, tags) {
  const blogs = [
    {
      authorId: users[0].id,
      title: 'My First Blog',
      description: 'This is my first blog post.',
      tags: { connect: [{ id: tags[0].id }, { id: tags[1].id }] },
      templates: { connect: [{ id: templates[0].id }] },
    },
    {
      authorId: users[1].id,
      title: 'React Tutorials',
      description: 'Learn React step-by-step.',
      tags: { connect: [{ id: tags[1].id }, { id: tags[2].id }] },
      templates: { connect: [{ id: templates[1].id }, { id: templates[2].id }] },
    },
  ];

  return Promise.all(
    blogs.map((blog) => prisma.blog.create({ data: blog }))
  );
}

async function createComments(users, blogs) {
  const comments = [
    {
      blogId: blogs[0].id,
      description: 'Great blog!',
      authorId: users[1].id,
    },
    {
      blogId: blogs[1].id,
      description: 'Helpful tutorial.',
      authorId: users[0].id,
    },
    {
      blogId: blogs[0].id,
      description: 'Looking forward to more content.',
      authorId: users[1].id,
    },
  ];

  return Promise.all(
    comments.map((comment) => prisma.comment.create({ data: comment }))
  );
}

async function main() {
  console.log('Starting database seed...');
  try {
    const sysAdmin = await createSysAdmin();
    console.log('Sys admin created:', sysAdmin);

    const users = await createUsers();
    console.log('Users created:', users);

    const tags = await createTags();
    console.log('Tags created:', tags);

    const templates = await createTemplates(users, tags);
    console.log('Templates created:', templates);

    const blogs = await createBlogs(users, templates, tags);
    console.log('Blogs created:', blogs);

    const comments = await createComments(users, blogs);
    console.log('Comments created:', comments);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
