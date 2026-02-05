import React from "react";
import EmailIcon from "@/icons/EmailIcon";
import PhoneIcon from "@/icons/PhoneIcon";
import LinkedinIcon from "@/icons/LinkedinIcon";
import Markdown from "@/components/Markdown";
import ObfuscatedText from "@/components/ObfuscatedText";
import { twJoin } from "tailwind-merge";
import fs from "node:fs";
import YAML from "yaml";
import { Space_Mono } from "next/font/google";
import Image from "next/image";
import profileImg from "../../public/profile.jpg";
import tardisImg from "../../public/tardis.svg";
import type { Curriculum } from "./types";

const titleFont = Space_Mono({ weight: '400', subsets: ['latin'] })

const getCurriculum = (): Curriculum => {
  const cv = fs.readFileSync(`${process.cwd()}/src/data/new-cv.yml`);

  return YAML.parse(cv.toString());
};

const Title = ({ className, ...props }: React.PropsWithChildren & { className?: string }) => {
  return <h2 className={twJoin(
    'text-base',
    'bg-gradient-to-r from-primary/90 via-blue-500 to-secondary',
    'rounded flex items-center gap-3 text-white pl-2 py-1',
    className
  )} {...props} />
}

const InfoCol = ({ data }: { data: Curriculum }) => {
  return (
    <div className="float-left w-[24%] h-[277mm] mr-4">
      <div className="flex flex-col gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={profileImg.src} className="w-40 rounded-full h-40 mx-auto object-cover border-4 border-[#4460aa]"
             alt=""/>

        <h1 className={twJoin('text-4xl uppercase font-bold text-center', titleFont.className)}>{data.name}</h1>
        <div className="flex flex-col gap-1 text-xs">

          <p><EmailIcon className="text-xl mr-2"/><ObfuscatedText encoded={data.email}/></p>
          <p><PhoneIcon className="text-xl mr-2"/><ObfuscatedText encoded={data.phone}/></p>
          <p>
            <LinkedinIcon className="text-xl mr-2"/>
            <a href={`https://${data.url}`} target="_blank">{data.url}</a>
          </p>
        </div>

        <div className="text-xs">
          <Markdown className="m-0">{data.about}</Markdown>
        </div>

        <div className="text-xs">
          <Title className="mb-5 uppercase">Compétences</Title>
          <div>
            <h3 className="uppercase font-bold mb-2">Techniques</h3>
            <p className="mb-2">
              {data.technicalSkills.map((skill, index) => (
                <React.Fragment key={skill.name}>
                  {index > 0 && ', '}
                  <span className={twJoin([skill.color && `${skill.color} font-bold`])}>{skill.name}</span>
                </React.Fragment>
              ))}
            </p>
          </div>

          <h3 className="uppercase mb-2 font-bold">Contributions</h3>
          <div className="mb-2">- Recruteur technique chez Xebia</div>
          <div>
            - Talks à <a className="underline"
                         href="https://fr.slideshare.net/slideshow/xebicon17-entrevue-avec-vuejs-thomas-champion-et-ludovic-ladeu/83407085">Devoxx
            2018</a> & <a className="underline" href="https://www.youtube.com/watch?v=MfN6bdxm5BU">FrontSide 2020</a>
          </div>
        </div>

        <div className="text-xs">
          <Title className="mb-5 uppercase">Formation</Title>

          <div className="flex flex-col gap-2">
            {data.education.map((edu) => (
              <div key={edu.dates} className="flex gap-3 items-center">
                <div>
                  <span className="flex flex-col">
                    <span className="font-bold">{edu.degreeInfos}</span>
                    {edu.school}
                  </span>
                  <span>{edu.dates}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Main = ({ data }: { data: Curriculum }) => {
  const yearsOfExperience = Math.floor((Date.now() - new Date(data.experienceStart).getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  return (
    <div className="h-[277mm] flex flex-col">
      <h2 className={`text-2xl font-semibold text-center uppercase ${titleFont.className}`}>{data.headline}</h2>
      <h3
        className={`text-md text-center uppercase ${titleFont.className}`}>{data.city} &middot; {yearsOfExperience} années
        d&rsquo;expérience</h3>

      <Title className="mb-5 mt-3 uppercase">Expériences professionnelles</Title>

      <div className="text-[0.70rem] flex-grow flex flex-col gap-2 border-l pl-4 border-secondary">
        {data.projects.map((project, index) => (
          <div key={project.dates} className="relative">
            <div className="mb-2">
              <div className="font-bold text-blue-600 ">
                {index === 0 ?
                  <span className="h-2 w-3 block bg-white rounded-full absolute -left-5 -top-1"></span> : null}
                <span
                  className="block absolute -left-8 top-0">
                  <Image src={tardisImg} alt="TARDIS" width={32} height={0}/>
                </span>

                <span className="">{project.dates}</span> - <span className="">{project.title} <span
                className=" text-primary">- {project.company}</span></span>
              </div>
              {project.stack ? <Markdown className="italic m-0">{project.stack}</Markdown> : null}
            </div>
            <div className="flex">
              <Markdown className="[&_ul]:m-0 [&_ul]:pl-5">{project.description}</Markdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Mini() {
  const data = getCurriculum();

  return (
    <div className="h-full relative">
      <InfoCol data={data}/>
      <Main data={data}/>
    </div>
  )
}
