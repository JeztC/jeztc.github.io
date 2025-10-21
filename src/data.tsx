import type { Project } from "./interfaces/project";

const jobs = [
    { company: 'Vitec Alma OY', duration: 'May 2025', name: 'vitec', link: 'https://www.vitec-alma.com/' },
];

const projectData: Project[] = [
    {
        title: "Freegle",
        href: "https://github.com/JeztC/freegle",
        imgSrc: "./media/demo.gif",
    },
    {
        title: "Portfolio",
        href: "https://github.com/JeztC/jeztc.github.io/",
        imgSrc: "./media/img.png",
    },
];

const skillsList = [
    { title: 'TypeScript', value: 0.85 },
    { title: 'React', value: 0.85 },
    { title: 'React Native', value: 0.85 },
    { title: 'UI/UX', value: 0.75 },
    { title: 'Express JS ', value: 0.75 },
    { title: 'Node JS ', value: 0.60 },
    { title: 'Python', value: 0.80 },
    { title: 'Java', value: 0.5 },
    { title: 'Kotlin', value: 0.5 },
    { title: 'GraphQL', value: 0.5 },
    { title: 'MUI', value: 0.80 },
    { title: 'C#', value: 0.50 },
    { title: 'C++', value: 0.50 },
    { title: 'SQL', value: 0.80 },
    { title: 'Linux', value: 1 },
    { title: 'Redux', value: 0.70 },
    { title: 'MongoDB ', value: 0.70 },
    { title: 'Playwright & Vitest', value: 0.70 },
    { title: 'CI/CD & Github Actions', value: 0.70 },
    { title: 'CCNA', value: 0.60 },
]

const education = [
    {
        id: 0,
        school: 'Centria University of Applied Sciences',
        schoolAlias: 'centria',
        links: {
            website: 'https://net.centria.fi/',
            facebook: 'https://www.facebook.com/centriaamk/',
            instagram: 'https://www.instagram.com/centriaamk/',
            x: 'https://x.com/centriaamk',
        },
    },
    {
        id: 1,
        school: 'Kokkolan suomalainen lukio',
        schoolAlias: 'ksl',
        links: {
            website: 'https://ksl2016.blogspot.com/',
            x : 'https://twitter.com/KokkolaKarleby',
        },
    },
    {
        id: 2,
        schoolAlias: 'hakalahti',
        school: 'Hakalahden koulu',
        links: {
            website : 'https://hakalahdenkoulu.wordpress.com/',
            instagram : 'https://www.instagram.com/hakalahden_koulu/',
            x : 'https://twitter.com/KokkolaKarleby',
        },
    },
]

export { skillsList, education, jobs, projectData }