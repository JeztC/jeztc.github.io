const skillsList = [
    { title: 'JavaScript', value: 75 },
    { title: 'TypeScript', value: 75 },
    { title: 'Fullstack', value: 75 },
    { title: 'React', value: 75 },
    { title: 'React Native', value: 75 },
    { title: 'UI/UX', value: 75 },
    { title: 'Express JS ', value: 70 },
    { title: 'Node JS ', value: 60 },
    { title: 'Microsoft Office', value: 75 },
    { title: 'Python', value: 75 },
    { title: 'Java', value: 75 },
    { title: 'Kotlin', value: 75 },
    { title: 'GraphQL', value: 75 },
    { title: 'MUI', value: 80 },
    { title: 'C#', value: 75 },
    { title: 'C++', value: 70 },
    { title: 'SQL', value: 60 },
    { title: 'Linux', value: 60 },
    { title: 'NixOS', value: 70 },
    { title: 'Redux ', value: 70 },
    { title: 'MongoDB ', value: 70 },
    { title: 'Cypress & Jest ', value: 70 },
    { title: 'CI/CD', value: 70 },
    { title: 'CCNA', value: 60 },
]

const education = [
    {
        id: 0,
        school: 'Centria University of Applied Sciences',
        schoolLogo: 'https://i.imgur.com/zzcLfJX.png',
        links: {
            website: 'https://net.centria.fi/',
            facebook: 'https://www.facebook.com/centriaamk/',
            instagram: 'https://www.instagram.com/centriaamk/',
        },
        courses: [
            {
                courseName: 'FullStackOpen',
                courseLink: 'https://fullstackopen.com',
                schoolLink: 'https://www.helsinki.fi/fi',
                schoolName: 'University of Helsinki',
                dateFinished: '19.9.2022',
                grade: 4,
            },
            {
                courseName: 'Tietokannat (SQL)',
                courseLink: 'https://centria.github.io/tietokannat/',
                schoolLink: 'https://net.centria.fi/',
                schoolName: 'Centria UAS',
                dateFinished: '4.3.2024',
                grade: 5,
            }
        ]
    },
    {
        id: 1,
        school: 'Kokkolan suomalainen lukio',
        schoolLogo: 'https://elakeliitto.fi/sites/default/files/inline-images/lataus.png',
        links: {
            website: 'https://ksl2016.blogspot.com/',
        },
    },
    {
        id: 2,
        schoolLogo: 'https://i.imgur.com/8bnJJDC.png',
        school: 'Hakalahden koulu',
        links: {
            website : 'https://hakalahdenkoulu.wordpress.com/',
            instagram : 'https://www.instagram.com/hakalahden_koulu/',
        },
    },
]

export { skillsList, education }