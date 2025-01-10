import React from "react";

interface SkillCardProps {
  name: string;
  image: string;
}

const SkillCard = ({ name, image }: SkillCardProps) => {
  return (
    <div className="bg-gray-300/20 p-4 flex flex-col rounded-lg place-items-center space-y-4">
      <img
        src={image}
        className="md:w-[100px] md:h-[100px] w-[80px] h-[80px]"
        alt={name}
      />
      <p className="text-lg font-medium">{name}</p>
    </div>
  );
};

export default SkillCard;
