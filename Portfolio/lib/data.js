
/** Projects information */
const data = [
    {

        id: 1,
        image: "/Images/metropolitan museum.jpg",
        title: "Metropolitan Museum of Art",
        text: `The project was inspired by the Metropolitan Museum that displays artworks, paintings, furniture, and other items. The app allows users to browse, search, and interact with the museum's collection. The app provides a seamless and engaging experience for art lovers.`,
        technologies: ['JavaScript', 'NextJS', 'ExpressJS', 'NodeJS', 'Bootstrap', 'MongoDB', 'Rest APIs', 'JWT'],
        webUrl: 'https://metropolican-meseum.vercel.app/',
        githubUrl: 'https://github.com/Festus-Osayi/Assets/tree/master/Metropolican-Meseum',
        category: 'Fullstack Development',
        url: true


    },
    {

        id: 2,
        image: "/Images/ecommerce-front.jpg",
        title: "E-commerce Front app",
        text: `E-commerce front app with a user-friendly and visually beautiful interface that enables customers to browse, search for, and purchase products or services. It features intuitive navigation, visually appealing product displays, secure payment processing, and convenient checkout options. Users can create accounts, save items to their wishlist or cart, and track orders. The app provides a seamless shopping experience, allowing users to explore a wide range of products, and make purchases from the comfort of their devices, whether it's a computer, tablet, or smartphone`,
        technologies: ['JavaScript', 'NodeJS', 'NextJS', 'Styled-component', 'MongoDB', 'Stripe', 'Rest APIs', 'GCP', 'next-auth'],
        webUrl: 'https://ecommerce-front-neon.vercel.app/',
        githubUrl: 'https://github.com/Festus-Osayi/Assets/tree/master/ecommerce-front',
        category: 'Fullstack Development',
        url: true


    },
    {

        id: 3,
        image: "/Images/ecommerce-admin.jpg",
        title: "E-commerce Admin",
        text: `An intuitive and feature-rich admin dashboard for managing e-commerce operations, streamlining inventory management, order processing, and customer relationship management. Leveraged modern web technologies to create a robust and scalable solution that empowers administrators to efficiently oversee and optimize the e-commerce platform. PS: (only administrator access and login)`,
        technologies: ['JavaScript', 'NodeJS', 'NextJS', 'Tailwind CSS', 'MongoDB', 'CSS', 'next-auth', 'AWS S3 Bucket'],
        webUrl: 'https://ecommerce-admin-zeta-rose.vercel.app/',
        githubUrl: 'https://github.com/Festus-Osayi/Assets/tree/master/ecommerce-admin',
        category: 'Fullstack Development',
        url: true


    },
    {

        id: 4,
        image: "/Images/blog-post.jpg",
        title: "Blog Post",
        text: `A comprehensive CRUD (Create, Read, Update, Delete) blog post application, employing full-stack technologies to empower users to create, manage, and share their content seamlessly. Leveraged vanilla JavaScript, Bootstrap and handlebars for the front end, and Node.js with Express.js for the back end, ensuring robust functionality and efficient data management throughout the application lifecycle.`,
        technologies: ['JavaScript', 'ExpressJS', 'NodeJS', 'Bootstrap', 'PostgreSQL', 'Handlebars', 'MongoDB', 'HTML5', 'CSS', 'bcryptjs'],
        webUrl: 'https://clean-cap-ox.cyclic.app/blog',
        githubUrl: 'https://github.com/Festus-Osayi/Assets/tree/master/blogpost',
        category: 'Fullstack Development',
         url: true

    },
    {

        id: 5,
        image: "/Images/assemblyline.jpg",
        title: "Assembly Line",
        text: `The assembly line consists of a set of workstations each of which holds a set of stock items, which are specific to the station. A line manager moves customer orders along the line filling the orders at each station, as requested. Each customer order consists of a list of items that need to be filled. Each station processes a queue of orders by filling the next order in the queue if that order requests the station's item and that item is in stock.`,
        technologies: ['C++', 'File  handling', 'OOP', 'String', 'STL Containers', 'Classes', 'Inheritance', 'Polymorphism'],
        githubUrl: 'https://github.com/Festus-Osayi/Assets/tree/master/Assembly%20Line',
        category: 'C++',
        url: false


    },

    {

        id: 6,
        image: "/Images/parking.png",
        title: "Valet Parking",
        text: `A valet parking application in C++ that involved creating classes to represent vehicles, parking spots, and the parking lot itself, as well as implementing logic for parking and retrieving vehicles. With A graphical or command-line interface that allows parking attendants to interact with the system, inputting vehicle information, and executing parking and retrieval commands. `,
        technologies: ['C++', 'OOP', 'File handling', 'Classes', 'Inheritance', 'Polymorphism', 'Character', 'memory handling'],
        githubUrl: 'https://github.com/Festus-Osayi/Assets/tree/master/Valet%20Parking',
        category: 'C++',
        url: false


    },

    {

        id: 7,
        image: "/Images/pingPongGame.jpg",
        title: "The Ping Pong Game",
        text: `The Ping Pong game implemented in Python with Turtle graphics offers a classic arcade experience where two players compete against each other in a virtual table tennis match. The game is designed to be simple yet engaging, providing players with intuitive controls and clear visual feedback`,
        technologies: ['Python', 'Turtle Graphic', 'OOP', 'File handling'],
        githubUrl: 'https://github.com/Festus-Osayi/Assets/tree/master/The-pongGame',
        category: 'Python/Turtle Graphic',
        url: false

    },

    {

        id: 8,
        image: "/Images/Snake Game.jpg",
        title: "Snake Game",
        githubUrl: 'https://github.com/Festus-Osayi/Assets/tree/master/snake-project',
        url: false
        

    },


]



export default data
