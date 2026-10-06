import Image from "next/image";

import Panel from "@/components/panel";
import { projects } from "@/lib/content";

import DotLabel from "./dot-label";
import SectionHeading from "./section-heading";

/**
 * Projects section: one full-width case study per project. The screenshot
 * sits in a dark frame, like a device, with the write-up beneath it.
 * @returns The projects panel
 */
const Projects = () => {
  return (
    <Panel
      aria-labelledby="projects-heading"
      className="px-6 py-16 sm:px-10 lg:px-14 lg:py-24"
      id="projects"
    >
      <SectionHeading id="projects-heading">Projects</SectionHeading>

      <ul className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
        {projects.map((project) => (
          <li key={project.id}>
            <article aria-labelledby={`project-${project.id}`}>
              <div className="panel-inverse bg-paper rounded-2xl p-3 sm:p-5 lg:p-8">
                <Image
                  alt={project.image.alt}
                  className="h-auto w-full rounded-lg"
                  height={project.image.height}
                  sizes="(min-width: 1440px) 1300px, 92vw"
                  src={project.image.src}
                  width={project.image.width}
                />
              </div>

              <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <h3
                    className="text-4xl tracking-tight sm:text-5xl"
                    id={`project-${project.id}`}
                  >
                    {project.title}
                  </h3>
                  <dl className="border-line mt-8 border-t">
                    {project.details.map((detail) => (
                      <div
                        className="border-line flex justify-between gap-6 border-b py-3"
                        key={detail.label}
                      >
                        <dt className="text-muted">{detail.label}</dt>
                        <dd className="text-right">{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  <p className="text-xl leading-relaxed tracking-tight sm:text-2xl">
                    {project.summary}
                  </p>
                  <ul className="text-muted mt-8 space-y-3 text-lg leading-relaxed">
                    {project.highlights.map((highlight) => (
                      <li
                        className="border-line border-l-2 pl-4"
                        key={highlight}
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <a
                    className="group mt-10 inline-block rounded-sm text-xl"
                    href={project.link.href}
                  >
                    <DotLabel>{project.link.label}</DotLabel>
                  </a>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Panel>
  );
};

Projects.displayName = "Projects";

export default Projects;
