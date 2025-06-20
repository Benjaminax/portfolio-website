import React, { useState } from "react";
import flappyImg from "../assets/images/flappy.png";
import knowledgeHubImg from "../assets/images/knowlegde hub.png";
import targetHittingThumb from "../assets/images/target hitting game .mp4";
import mediaSorterImg from "../assets/images/media sorter.png"; // Add this import

const projects = [
	{
		title: "Knowledge Hub",
		description:
			"Full-stack event booking platform with mobile-first UI, Framer Motion animations, real-time email notifications (NodeMailer), and XLSX spreadsheet generation. Built with React, Tailwind CSS, Express.js, and MongoDB. Deployed on Vercel/Render.",
		image: knowledgeHubImg,
		link: "https://knowledge-hub-e6dh.vercel.app",
		tags: ["React", "Tailwind", "Express.js", "MongoDB", "Full Stack"],
	},
	{
		title: "Mediaflix",
		description:
			"Automated Python program that organizes downloaded files into movies and series using naming conventions, file sizes, and formats. Handles edge cases, Blu-ray tags, and special characters for accurate sorting.",
		image: mediaSorterImg, // Use the new thumbnail here
		link: "https://github.com/Benjaminax/Media-Sorter",
		tags: ["Python", "Automation", "File System"],
	},
	{
		title: "Flappy Bird Game",
		description:
			"A Flappy Bird clone built in Unity. Features smooth gameplay and classic mechanics.",
		image: flappyImg,
		link: "https://github.com/Benjaminax/Flappy-Bird",
		tags: ["Unity", "C#", "Game Dev"],
	},
	{
		title: "Target Hitting Game",
		description:
			"A 3D target hitting game made in Unreal Engine. Practice your aim and reflexes!",
		image: targetHittingThumb,
		link: "https://github.com/Benjaminax/Target-Hitting-Game",
		tags: ["Unreal Engine", "C++", "Game Dev"],
	},
];

const allTags = [
	...new Set(projects.flatMap((project) => project.tags)),
];

const Projects = () => {
	const [selectedTag, setSelectedTag] = useState("All");

	const filteredProjects =
		selectedTag === "All"
			? projects
			: projects.filter((project) => project.tags.includes(selectedTag));

	return (
		<section
			id="projects"
			className="px-4 md:px-16 lg:px-[130px] py-20 text-[#9EF170] backdrop-blur-sm"
		>
			<h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center tracking-tight">
				My Projects
			</h2>
			{/* Filter */}
			<div className="flex flex-wrap gap-3 justify-center mb-10">
				<button
					className={`px-4 py-1 rounded-full border border-[#9EF170] text-sm font-semibold transition ${
						selectedTag === "All"
							? "bg-[#9EF170] text-[#232323]"
							: "bg-transparent text-[#9EF170] hover:bg-[#232323]/60"
					}`}
					onClick={() => setSelectedTag("All")}
				>
					All
				</button>
				{allTags.map((tag) => (
					<button
						key={tag}
						className={`px-4 py-1 rounded-full border border-[#9EF170] text-sm font-semibold transition ${
							selectedTag === tag
								? "bg-[#9EF170] text-[#232323]"
								: "bg-transparent text-[#9EF170] hover:bg-[#232323]/60"
						}`}
						onClick={() => setSelectedTag(tag)}
					>
						{tag}
					</button>
				))}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
				{filteredProjects.map((project, idx) => (
					<div
						key={idx}
						className="bg-[#181818]/80 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col border border-[#333] hover:scale-[1.025] transform-gpu backdrop-blur"
					>
						{project.title === "Target Hitting Game" ? (
							<video
								src={project.image}
								className="h-48 w-full object-cover"
								autoPlay
								loop
								muted
								playsInline
							/>
						) : (
							<img
								src={project.image}
								alt={project.title}
								className="h-48 w-full object-cover"
							/>
						)}
						<div className="p-6 flex flex-col flex-1">
							<h3 className="text-xl font-bold mb-2 text-[#9EF170]">
								{project.title}
							</h3>
							<p className="text-[#AEAEAE] mb-4 flex-1">
								{project.description}
							</p>
							<div className="flex flex-wrap gap-2 mb-4">
								{project.tags.map((tag, i) => (
									<span
										key={i}
										className="bg-[#232323] border border-[#9EF170] text-[#9EF170] text-xs font-semibold px-2 py-1 rounded"
									>
										{tag}
									</span>
								))}
							</div>
							<a
								href={project.link}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-auto inline-block text-[#232323] bg-[#9EF170] hover:bg-[#b6ff8a] px-4 py-2 rounded-lg font-semibold transition"
							>
								View Project
							</a>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Projects;