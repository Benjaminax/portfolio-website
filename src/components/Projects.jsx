import React, { useState } from "react";
import flappyImg from "../assets/images/flappy.png";
import knowledgeHubImg from "../assets/images/knowlegde hub.png";
import targetHittingThumb from "../assets/images/target hitting game .mp4";
import thirdPersonShooterThumb from "../assets/images/Third Person Shooter.web.mp4";
import cineStreamThumb from "../assets/images/cine.web.mp4";
import blxstImg from "../assets/images/blxst.png"; // Add this import

const projects = [
	{
		title: "Third Person Shooter (UE 5.7)",
		description:
			"A third-person shooter built in Unreal Engine 5.7 featuring sprint/crouch animation logic, aim offset and camera zoom while aiming, line-trace shooting, muzzle flash/audio effects, AI pawn sensing, enemy damage, and player/enemy health bars.",
		image: thirdPersonShooterThumb,
		link: "https://github.com/Benjaminax/portfolio-website",
		tags: ["Unreal Engine", "Blueprints", "Animation", "Game Dev"],
		isVideo: true,
	},
	{
		title: "Knowledge Hub",
		description:
			"Full-stack event booking platform with mobile-first UI, Framer Motion animations, real-time email notifications (NodeMailer), and XLSX spreadsheet generation. Built with React, Tailwind CSS, Express.js, and MongoDB. Deployed on Vercel/Render.",
		image: knowledgeHubImg,
		link: "https://knowledge-hub-e6dh.vercel.app",
		tags: ["React", "Tailwind", "Express.js", "MongoDB", "Full Stack"],
	},
	{
		title: "BLXST - Block Puzzle Game",
		description:
			"A modern, visually stunning block puzzle game built with React, featuring smooth animations, immersive sound effects, and a beautiful dark theme. Includes drag & drop gameplay, combo system, audio controls, and auto-save functionality.",
		image: blxstImg,
		link: "https://blxst-game.vercel.app/",
		tags: ["React", "Jotai", "Framer Motion", "Tailwind", "Game Dev"],
	},
	{
		title: "CineStream",
		description:
			"Desktop movie and TV hub built with React + TypeScript in Electron. It combines TMDB discovery, local media library scanning, metadata enrichment, and VLC-based playback controls for a streaming-style experience with local file support.",
		image: cineStreamThumb,
		link: "https://github.com/Benjaminax/cinema.git",
		tags: ["Electron", "React", "TypeScript", "TMDB", "VLC"],
		isVideo: true,
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
		isVideo: true,
	},
];

const normalizeTag = (tag) => tag.toLowerCase().trim();

const filterTags = [
	{ label: "All", value: "all" },
	{ label: "React", value: "react" },
	{ label: "Electron", value: "electron" },
	{ label: "TypeScript", value: "typescript" },
	{ label: "Game Dev", value: "game dev" },
	{ label: "Unreal Engine", value: "unreal engine" },
	{ label: "Unity", value: "unity" },
	{ label: "C#", value: "c#" },
	{ label: "C++", value: "c++" },
	{ label: "Python", value: "python" },
	{ label: "Express.js", value: "express.js" },
	{ label: "MongoDB", value: "mongodb" },
	{ label: "Tailwind", value: "tailwind" },
	{ label: "Full Stack", value: "full stack" },
	{ label: "TMDB", value: "tmdb" },
	{ label: "VLC", value: "vlc" },
	{ label: "Blueprints", value: "blueprints" },
	{ label: "Animation", value: "animation" },
	{ label: "Framer Motion", value: "framer motion" },
	{ label: "Jotai", value: "jotai" },
	{ label: "Automation", value: "automation" },
	{ label: "File System", value: "file system" },
];

const Projects = () => {
	const [selectedTag, setSelectedTag] = useState("all");

	const filteredProjects =
		selectedTag === "all"
			? projects
			: projects.filter((project) =>
				project.tags.some((tag) => normalizeTag(tag) === selectedTag),
		  );

	return (
		<section
			id="projects"
			className="px-4 md:px-16 lg:px-[130px] py-20 text-[#9EF170] backdrop-blur-sm"
		>
			<h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center tracking-tight">
				My Projects
			</h2>
			{/* Filter */}
			<div className="flex flex-wrap gap-2 justify-center mb-12 px-4">
				{filterTags.map((tag) => (
					<button
						key={tag.value}
						className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
							selectedTag === tag.value
								? "bg-gradient-to-r from-[#9EF170] to-[#b6ff8a] text-[#0a0a0a] shadow-lg shadow-[#9EF170]/50"
								: "bg-[#1a1a1a] text-[#9EF170] border border-[#9EF170]/40 hover:border-[#9EF170] hover:shadow-md hover:shadow-[#9EF170]/20"
						}`}
						onClick={() => setSelectedTag(tag.value)}
					>
						{tag.label}
					</button>
				))}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
				{filteredProjects.map((project, idx) => (
					<div
						key={idx}
						className="bg-[#181818]/80 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col border border-[#333] hover:scale-[1.025] transform-gpu backdrop-blur"
					>
						{project.isVideo ? (
							<video
								className="h-48 w-full object-cover"
								autoPlay
								controls
								loop
								muted
								playsInline
								preload="metadata"
							>
								<source src={project.image} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
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