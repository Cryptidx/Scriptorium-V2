import React, { useState } from "react";
import ReportPreview from "./reportPreview";

interface ReportProps {
  title: string;
  description: string;
  author: string;
  tags: string[];
  reportCount: number;
  explanation: string[];
}

interface ReportDropdownProps {
  blogReports: ReportProps[];
  commentReports: ReportProps[];
  wrapped: boolean;
}

const ReportDropdown: React.FC<ReportDropdownProps> = ({ blogReports, commentReports, wrapped }) => {
  const [selectedReportType, setSelectedReportType] = useState<"blogReports" | "commentReports">("blogReports");

  return (
    <div>
      {/* Drop-down for Report Type */}
      <div className="mt-6 flex justify-between items-center">
        <label htmlFor="report-type" className="text-xl font-semibold">Select Report Type:</label>
        <select
          id="report-type"
          value={selectedReportType}
          onChange={(e) => setSelectedReportType(e.target.value as "blogReports" | "commentReports")}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="blogReports">Blog Reports</option>
          <option value="commentReports">Comment Reports</option>
        </select>
      </div>

      {/* Conditional Rendering for Reports */}
      {selectedReportType === "blogReports" && (
        <div>
          <h2 className={`${wrapped ? 'text-2xl' : 'text-3xl'} mt-6 font-bold`}>Blog Reports:</h2>
          {blogReports.length === 0 ? (
            <h2 className={`${wrapped ? 'text-xl' : 'text-2xl'} mt-3 font-normal`}>No Blog Reports available</h2>
          ) : (
            <div className={`mt-6 flex flex-col overflow-y-auto max-h-[300px] min-w-[100px] ${wrapped ? '' : 'flex-col overflow-y-auto max-h-[300px]'} border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-2`}>
              {blogReports.map((report, index) => (
                <ReportPreview
                    key={index}
                    title={report.title}
                    description={report.description}
                    author={report.author}
                    tags={report.tags}
                    reportCount={report.reportCount}
                    explanation={report.explanation}
                />
                ))}
            </div>
          )}
        </div>
      )}

      {selectedReportType === "commentReports" && (
        <div>
          <h2 className={`${wrapped ? 'text-2xl' : 'text-3xl'} mt-6 font-bold`}>Comment Reports:</h2>
          {commentReports.length === 0 ? (
            <h2 className={`${wrapped ? 'text-xl' : 'text-2xl'} mt-3 font-normal`}>No Comment Reports available</h2>
          ) : (
            <div className={`mt-6 flex flex-col overflow-y-auto max-h-[300px] min-w-[100px] ${wrapped ? '' : 'flex-col overflow-y-auto max-h-[300px]'} border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-2`}>
              {commentReports.map((report, index) => (
                <ReportPreview
                    key={index}
                    title={report.title}
                    description={report.description}
                    author={report.author}
                    tags={report.tags}
                    reportCount={report.reportCount}
                    explanation={report.explanation}
                />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportDropdown;