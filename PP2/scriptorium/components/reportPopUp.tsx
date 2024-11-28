import React, { useEffect, useState } from "react";
import { apiCallText } from "@/utils/auth-api-w-refresh-text";

interface BlogApi {
    message: string;
    blog: Blog;
  }

interface ReportPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  blogId: number | null;
}

const ReportPopUp: React.FC<ReportPopUpProps> = ({
  isOpen,
  onClose,
  blogId,
}) => {
  const[reports, setReports] = useState<string[]>([]);

    const callingApi = async () => {
        return await apiCallText(`/api/blog/${blogId}`, {
            method: "GET",
          });
    }

  useEffect(() => {
    if (blogId) {
        
      const output = callingApi();

      output.then((response) => {
            const data = JSON.parse(response);

            setReports(data.blog.reports);
        }
      ).catch((error) => console.error("Error fetching blog reports:", error));
    }
  }, [blogId]);

  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const close = () => {
    onClose;
  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 w-[90%] h-[80vh] shadow-lg px-10 py-6 rounded-lg overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
        >
          ✖️
        </button>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Reports
        </h2>

        {/* Display Reports */}
        <div className="space-y-4">
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm"
              >
                <p className="text-gray-800 dark:text-white">{report}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-300">
              No reports available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPopUp;
