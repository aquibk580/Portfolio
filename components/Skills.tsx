export default function Skills() {
    const skills = [
      {
        text:"HTML5",
        imageUrl:"/HTML-icon.png"
      },
      {
        text:"CSS3",
        imageUrl:"/css-icon.png"
      },
      {
        text:"JavaScript",
        imageUrl:"/js-icon.png"
      },
      {
        text:"React",
        imageUrl:"/React-icon.webp"
      },
      {
        text:"NodeJs",
        imageUrl:"/nodejs-icon.png"
      },
      {
        text:"ExpressJs",
        imageUrl:"/express-js-icon.png"
      },
      {
        text:"MongoDB",
        imageUrl:"/mongoDB-icon.png"
      },
      {
        text:"MySQL",
        imageUrl:"/Mysql-icon.png"
      },
      {
        text:"PHP",
        imageUrl:"/PHP-icon.png"
      },
      {
        text:"Tailwind CSS",
        imageUrl:"/tailwind-icon.png"
      },
      {
        text:"NextJs",
        imageUrl:"/nextjs-icon.png"
      },
      {
        text:"GitHub",
        imageUrl:"/github-icon.png"
      },

    ]

    return (
      <section id="skills" className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-6 gap-4 ">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-300/20 p-4 flex flex-col rounded-lg place-items-center space-y-4">
              <img src={skill.imageUrl} className="md:w-[100px] md:h-[100px] w-[80px] h-[80px]" alt={skill.text} />
              <p className="text-lg font-medium">{skill.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  