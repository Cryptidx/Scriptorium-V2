import React from "react";

interface TemplateInfoProps {
  author: string;
  forked?: string; // Optional forked information
  tags: string[];
  blogs: { title: string; description?: string }[];
}

const TemplateInfo: React.FC<TemplateInfoProps> = ({
  author,
  forked,
  tags,
  blogs,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 overflow-hidden w-full h-full">
      {/* Left Column: Fixed to 40% on larger screens */}
      <div className="flex flex-col space-y-4 lg:w-2/5">
        {/* Author Info */}
        <div>
          <p className="text-base lg:text-lg">
            <strong>Author:</strong> {author || "Unknown Author"}
          </p>
          {forked && (
            <p className="text-base lg:text-lg">
              <strong>Forked From:</strong> {forked}
            </p>
          )}
        </div>

        {/* Tags */}
        <div>
          <strong className="text-base lg:text-lg">Tags:</strong>
          <div className="flex flex-wrap gap-3 mt-2">
            {tags.length > 0
              ? tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm lg:text-base bg-blue-500 text-white rounded-full"
                  >
                    {tag}
                  </span>
                ))
              : "No tags added"}
          </div>
        </div>
      </div>

      {/* Right Column: Fixed to 60% on larger screens */}
      <div className="flex flex-col lg:w-3/5 mt-6 lg:mt-0">
        <strong className="text-base lg:text-lg">Blogs Featured In:</strong>
        <div className="flex overflow-x-auto gap-4 mt-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div
                key={index}
                className="min-w-[200px] max-w-[250px] flex-shrink-0 border border-gray-300 dark:border-gray-700 p-4 rounded-lg"
              >
                <h3 className="font-semibold text-base lg:text-lg">{blog.title}</h3>
                <p className="text-sm lg:text-base text-gray-500">
                  {blog.description || "No description"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm lg:text-base text-gray-500">
              Not featured in any blogs
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateInfo;
