import { projectData } from "@/app/lib/ProjectData";
import Project from "./Project";

const ProjectCard = () => {
  return (
    <div>
      {projectData.map((item, i) => {
        return (
          <Project
            key={i}
            i={i}
            title={item.title}
            image={item.image}
            description={item.description}
            color={item.color}
          />
        );
      })}
    </div>
  );
};

export default ProjectCard;
