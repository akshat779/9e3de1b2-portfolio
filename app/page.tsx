"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { portfolioConfig } from "@/lib/portfolio.config";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Calculate which sections to show based on data availability
  const hasExperience =
    portfolioConfig.experience && portfolioConfig.experience.length > 0;
  const hasProjects =
    portfolioConfig.projects && portfolioConfig.projects.length > 0;
  const hasEducation =
    portfolioConfig.education && portfolioConfig.education.length > 0;
  const hasGithubStats =
    portfolioConfig.githubStats && portfolioConfig.githubStats.totalRepos > 0;
  const hasLeetcodeStats =
    portfolioConfig.leetcodeStats &&
    portfolioConfig.leetcodeStats.totalSolved > 0;

  // Build navigation sections dynamically
  const navSections = ["intro"];
  if (hasProjects) navSections.push("projects");
  if (hasExperience) navSections.push("experience");
  if (hasEducation) navSections.push("education");
  if (hasGithubStats || hasLeetcodeStats) navSections.push("stats");
  navSections.push("connect");

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {navSections.map((section) => (
            <button
              key={section}
              onClick={() =>
                document
                  .getElementById(section)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section
                  ? "bg-foreground"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Hero Section */}
        <header
          id="intro"
          ref={(el) => {
            sectionsRef.current[0] = el;
          }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">
                  PORTFOLIO / {new Date().getFullYear()}
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  {portfolioConfig.name}
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {portfolioConfig.headline}
                </p>
                {portfolioConfig.bio && (
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {portfolioConfig.bio}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  {portfolioConfig.templateMetadata?.availabilityStatus && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      {portfolioConfig.templateMetadata.availabilityStatus}
                    </div>
                  )}
                  {portfolioConfig.location && (
                    <div>{portfolioConfig.location}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              {/* GitHub Stats Summary */}
              {hasGithubStats && portfolioConfig.githubStats && (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground font-mono">
                    GITHUB
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-light">
                        {portfolioConfig.githubStats.totalRepos}
                      </div>
                      <div className="text-xs text-muted-foreground">Repos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-light">
                        {portfolioConfig.githubStats.totalStars}
                      </div>
                      <div className="text-xs text-muted-foreground">Stars</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-light">
                        {portfolioConfig.githubStats.totalCommits}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Commits
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LeetCode Stats Summary */}
              {hasLeetcodeStats && portfolioConfig.leetcodeStats && (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground font-mono">
                    LEETCODE
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-light">
                        {portfolioConfig.leetcodeStats.totalSolved}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Solved
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-light text-green-400">
                        {portfolioConfig.leetcodeStats.easySolved}
                      </div>
                      <div className="text-xs text-muted-foreground">Easy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-light text-yellow-400">
                        {portfolioConfig.leetcodeStats.mediumSolved}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Medium
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Skills */}
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">
                  SKILLS
                </div>
                <div className="flex flex-wrap gap-2">
                  {portfolioConfig.skills.slice(0, 8).map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Projects Section */}
        {hasProjects && (
          <section
            id="projects"
            ref={(el) => {
              sectionsRef.current[1] = el;
            }}
            className="min-h-screen py-20 sm:py-32 opacity-0"
          >
            <div className="space-y-12 sm:space-y-16">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <h2 className="text-3xl sm:text-4xl font-light">Projects</h2>
                <span className="text-sm text-muted-foreground">
                  {portfolioConfig.projects.length} projects
                </span>
              </div>

              <div className="grid gap-8">
                {portfolioConfig.projects.map((project, index) => (
                  <div
                    key={index}
                    className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                  >
                    <div className="lg:col-span-3">
                      <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                        {project.year || new Date().getFullYear()}
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium">
                          {project.title}
                        </h3>
                        {project.url && (
                          <Link
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            View on GitHub →
                          </Link>
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed max-w-lg">
                        {project.description}
                      </p>
                    </div>

                    <div className="lg:col-span-3 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                      {project.tags?.slice(0, 4).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs text-muted-foreground border border-border/50 rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience Section - Only show if has experience */}
        {hasExperience && (
          <section
            id="experience"
            ref={(el) => {
              sectionsRef.current[2] = el;
            }}
            className="min-h-screen py-20 sm:py-32 opacity-0"
          >
            <div className="space-y-12 sm:space-y-16">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <h2 className="text-3xl sm:text-4xl font-light">Experience</h2>
              </div>

              <div className="space-y-8 sm:space-y-12">
                {portfolioConfig.experience.map((job, index) => (
                  <div
                    key={index}
                    className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                  >
                    <div className="lg:col-span-2">
                      <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                        {job.startDate}
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium">
                          {job.title}
                        </h3>
                        <div className="text-muted-foreground">
                          {job.company}
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed max-w-lg">
                        {job.description}
                      </p>
                    </div>

                    <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                      {job.technologies?.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        {hasEducation && (
          <section
            id="education"
            ref={(el) => {
              sectionsRef.current[3] = el;
            }}
            className="py-20 sm:py-32 opacity-0"
          >
            <div className="space-y-12 sm:space-y-16">
              <h2 className="text-3xl sm:text-4xl font-light">Education</h2>

              <div className="space-y-8">
                {portfolioConfig.education.map((edu, index) => (
                  <div
                    key={index}
                    className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                  >
                    <div className="lg:col-span-3">
                      <div className="text-lg font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                        {edu.startDate} — {edu.endDate || "Present"}
                      </div>
                    </div>

                    <div className="lg:col-span-9 space-y-2">
                      <h3 className="text-lg sm:text-xl font-medium">
                        {edu.degree}
                      </h3>
                      <div className="text-muted-foreground">
                        {edu.institution}
                      </div>
                      {edu.fieldOfStudy && (
                        <div className="text-sm text-muted-foreground">
                          {edu.fieldOfStudy}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        {(hasGithubStats || hasLeetcodeStats) && (
          <section
            id="stats"
            ref={(el) => {
              sectionsRef.current[4] = el;
            }}
            className="py-20 sm:py-32 opacity-0"
          >
            <div className="space-y-12 sm:space-y-16">
              <h2 className="text-3xl sm:text-4xl font-light">Coding Stats</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* GitHub Stats Card */}
                {hasGithubStats && portfolioConfig.githubStats && (
                  <div className="p-6 border border-border rounded-lg space-y-6">
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span className="text-lg font-medium">GitHub</span>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-3xl font-light">
                          {portfolioConfig.githubStats.totalRepos}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Repositories
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl font-light">
                          {portfolioConfig.githubStats.totalStars}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total Stars
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl font-light">
                          {portfolioConfig.githubStats.totalCommits}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Commits
                        </div>
                      </div>
                      {portfolioConfig.githubStats.primaryLanguage && (
                        <div>
                          <div className="text-lg font-light">
                            {portfolioConfig.githubStats.primaryLanguage}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Primary Language
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* LeetCode Stats Card */}
                {hasLeetcodeStats && portfolioConfig.leetcodeStats && (
                  <div className="p-6 border border-border rounded-lg space-y-6">
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                      </svg>
                      <span className="text-lg font-medium">LeetCode</span>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-3xl font-light">
                          {portfolioConfig.leetcodeStats.totalSolved}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Problems Solved
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl font-light">
                          #
                          {portfolioConfig.leetcodeStats.ranking?.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Global Ranking
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1 text-center p-3 bg-green-500/10 rounded">
                        <div className="text-xl font-light text-green-400">
                          {portfolioConfig.leetcodeStats.easySolved}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Easy
                        </div>
                      </div>
                      <div className="flex-1 text-center p-3 bg-yellow-500/10 rounded">
                        <div className="text-xl font-light text-yellow-400">
                          {portfolioConfig.leetcodeStats.mediumSolved}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Medium
                        </div>
                      </div>
                      <div className="flex-1 text-center p-3 bg-red-500/10 rounded">
                        <div className="text-xl font-light text-red-400">
                          {portfolioConfig.leetcodeStats.hardSolved}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Hard
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Connect Section */}
        <section
          id="connect"
          ref={(el) => {
            sectionsRef.current[5] = el;
          }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and
                  conversations about technology and design.
                </p>

                <div className="space-y-4">
                  {portfolioConfig.contact.email && (
                    <Link
                      href={`mailto:${portfolioConfig.contact.email}`}
                      className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                    >
                      <span className="text-base sm:text-lg">
                        {portfolioConfig.contact.email}
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">
                ELSEWHERE
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(portfolioConfig.socialLinks).map(
                  ([platform, url]) => (
                    <Link
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                    >
                      <div className="space-y-2">
                        <div className="text-base font-medium capitalize">
                          {platform}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {url}
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {portfolioConfig.name}. All rights
                reserved.
              </div>
              <div className="text-xs text-muted-foreground">
                Built with LoopIn Portfolio Generator
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
