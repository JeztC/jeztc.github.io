# Portfolio

Welcome to my open source portfolio built using React with npm, TypeScript and MUI. Anyone can use and modify this code to create their own portfolio website.

## Installation

1. Clone the repository from ``https://github.com/JeztC/jesseportfolio.git``
2. Run ``npm install`` to install all dependencies
3. Create ``.env`` file to the root of the repository.
4. Add these to the .env file:
```
#.env file
REACT_APP_AUTHOR_NAME=YOUR NAME
REACT_APP_SERVICE_ID=YOUR EMAIL JS SERVICE
REACT_APP_TEMPLATE_ID=YOUR EMAIL JS TEMPLATE
REACT_APP_PUBLIC_KEY=YOUR EMAIL JS PUBLIC KEY
REACT_APP_GITHUB_PROFILE=YOUR GITHUB PROFILE URL
REACT_APP_EMAIL=YOUR EMAIL ADDRESS
REACT_APP_GITHUB=YOUR GITHUB API URL
REACT_APP_GITHUB_STARRED=YOUR GITHUB API STARRED URL
```

## Running the project

1. Run ``npm run start`` to start the development server
2. Open http://localhost:3000 in your browser to view the project

Example of how site looks:
![alt text](https://i.imgur.com/BXupj75.png)

## Adding data

1. Create a new file called ``data.tsx`` in the ``src`` folder
2. Copy the following code and replace it with your own data.


```javascript
const skillsList = [
    { title: 'Your Skill', value: 0 },
    { title: 'Your Skill', value: 0 },
    // Add more skills as needed
]

const education = [
    {
        id: 0,
        school: 'Your school',
        schoolLogo: 'path/to/school-logo.jpg',
        links: {
            website: 'https://your-school-website.com',
            facebook: 'https://www.facebook.com/your-school/',
            instagram: 'https://www.instagram.com/your-school/',
        },
        courses: [
            {
                courseName: 'Your course',
                courseLink: 'https://your-course-link.com',
                schoolLink: 'https://your-school-link.com',
                schoolName: 'Your school',
                dateFinished: 'yyyy-mm-dd',
                grade: 0,
            },
        // Add more courses as needed
        ]
    },
    // Add more education as needed
]

export { skillsList, education }
```

## Assets
1. Create a new folder called ``assets`` in the ``src`` folder
2. Inside the ``assets`` folder, create a new folder called ``pictures``
3. Add your ``avatar.jpg`` to the pictures folder
4. Inside the ``assets`` folder, create a new file called ``en.json`` and ``fi.json`` for i18n. You can create it for any other language too. You just need to make some changes to the code in order to achieve that.

Example of ``en.json``:
```json
{
  "language": "en",
  "menu_about": "About",
  "menu_projects": "Projects",
  "menu_education": "Education",
  "menu_contact": "Contact",
  "menu_links": "Links",
  "links_email": "Email",
  "name_required": "Name is required",
  "course_name": "Course name",
  "school_name": "School",
  "completed_date": "Date finished",
  "grade": "Grade",
  "show_courses": "Show courses",
  "hide_courses": "Hide courses",
  "invalid_email": "Email address is not valid",
  "message_required": "Message is required",
  "email_required": "Email address is required",
  "about_desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna id bibendum malesuada, risus est bibendum nulla, a suscipit lorem ipsum id augue. Sed malesuada quam vitae magna luctus, nec convallis ligula euismod.",
  "experience_0_overview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna id bibendum malesuada, risus est bibendum nulla, a suscipit lorem ipsum id augue. Sed malesuada quam vitae magna luctus, nec convallis ligula euismod.",
  "experience_0_duration": "MM YYYY - Present",
  "experience_1_overview": "Sed auctor, magna id bibendum malesuada, risus est bibendum nulla, a suscipit lorem ipsum id augue. Sed malesuada quam vitae magna luctus, nec convallis ligula euismod.",
  "experience_2_overview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna id bibendum malesuada, risus est bibendum nulla, a suscipit lorem ipsum id augue. Sed malesuada quam vitae magna luctus, nec convallis ligula euismod.",
  "experience_1_duration": "MM YYYY - MM YYYY",
  "experience_2_duration": "MM YYYY - MM YYYY",
  "contact_full_name": "Full name",
  "contact_email": "Email address",
  "view_project": "View Project",
  "contact_message": "Message",
  "message_sent": "Your message has been successfully sent, i'll reply as soon as possible.",
  "experience_0_education": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "experience_1_education": "Sed auctor, magna id bibendum malesuada, risus est bibendum nulla, a suscipit lorem ipsum id augue. Sed malesuada quam vitae magna luctus, nec convallis ligula euismod.",
  "experience_2_education": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna id bibendum malesuada, risus est bibendum nulla, a suscipit lorem ipsum id augue. Sed malesuada quam vitae magna luctus, nec convallis ligula euismod.",
  "contact_btn": "Send Message"
}
```

Note: The version you have cloned should contain some private information like this, so you should make your own data similar to that. Make sure to not share your personal information if you make your own repository, as it's recommended to only try it locally.

Please don't hesitate to reach out if you have any questions or issues. 

My contact email for inquiries is: ``jeztc@tutanota.com``