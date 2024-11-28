import React, { useEffect, useState } from "react";
import CodeEditorComponent from "@/components/editor/Coding";
import OutputComponent from "@/components/editor/Output";
import TemplateInfo from "@/components/editor/TemplateInfo";

import { Template, Tag } from "@/types/template";
import { defaultLocalStorage } from "@/utils/default";
import { useRouter } from "next/router";
import { User } from "@/types/user";
import TemplateCreationModal from "@/components/modals/TemplateModal";

interface TempApi {
  message: string;
  template: Template;
}

interface UserApi {
    message: string;
    user: User;
}

const TemplateEditor: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("// Start coding here!"); // Maintain the current code
  const [title, setTitle] = useState("Code Editor")
  const [explanation, setExplanation] = useState("")
  const [language, setLanguage] = useState("javascript");
  const [inputValue, setInputValue] = useState(""); // State for user input
  const [tempId, setTempId] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [fork, setFork] = useState("");
  const [authorId, setAuthorId] = useState(-1);
  const [userId, setUserId] = useState<number | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [forked, setForked] = useState(false);

  useEffect(() => {
    if (id) {
      const numericId = Number(id);
      if (!isNaN(numericId)) {
        setTempId(numericId);
      } else {
        console.error("Invalid ID:", id);
      }
    }
  }, [id]);

  useEffect(() => {
    fetch("/api/users/user-info", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ` + localStorage.getItem("accessToken"), // Ensure this token is valid
        }
    }).then((response) => {
        if (!response.ok){
            return;
        }
        return response.json();
    }).then((data: UserApi) => {
        if (!data || !data.user) {
            return;
        }
        setUserId(data.user.id);
    });
  }, []);

  useEffect(() => {
    if (tempId === null || tempId === -1) return;

    fetch(`/api/template/${tempId}`)
      .then((response) => response.json())
      .then((data: TempApi) => {
        if (!data?.template) return;

        setAuthorId(data.template.ownerId);
        setAuthorName(data.template.name);
        setTitle(data.template.title);
        setExplanation(data.template.explanation);
        setCode(data.template.code);
        setLanguage(data.template.language);
        setTags(data.template.tags?.map((tag: Tag) => tag.name) || []);
        setBlogs(data.template.blogs || []);
      })
      .catch((error) => console.error("Error fetching template:", error));
  }, [tempId]);

  const handleRun = () => {
    let inputs = inputValue;

    if (!inputs.endsWith('\n')) {
      inputs += '\n';
    }

    fetch("/api/template/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language, code, inputs }),
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setOutput(data.output);
      setError(data.error);
    });

    // // Simulate code execution (replace this with actual logic/API call)
    // const simulatedOutput = `Executed ${language} code with input: "${inputValue}"`;
    // setOutput(simulatedOutput); // Set the output
  };
  
  const handleSave = () => {
    setForked(false);
    setModalOpen(true);
  };

  const handleFork = () => {
    setForked(true);
    setModalOpen(true);
  };

  const handleSubmit = (data: {
    id: string;
    language: string;
    title: string;
    code: string;
    explanation: string;
    tags: string[];
    }) => {
        if (forked || tempId === -1) {
            alert("New File Created!");
            router.push(`/template/${data.id}`);
            return;
        }

        router.reload();
        
        setModalOpen(true);
        alert("Code Saved!");
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900">
  
      {/* Main Content */}
      <div className="flex items-center justify-center flex-1">

        <div className="bg-white dark:bg-gray-800 w-[90%] h-[80vh] shadow-lg px-10 py-6 rounded-lg overflow-hidden">
        {  !router.query.id ?
                (<><div className="flex justify-center mb-10">
                <img className="h-10 w-10 item-center" src="loading.gif"></img>
              </div></>)
            : (<>
            {/* Left and Right Columns */}
            <div className="flex flex-col lg:flex-row h-full w-full space-y-6 lg:space-y-0 lg:space-x-6">
            
              {/* Left Side: Code Editor */}
              <div className="flex-[1.2] flex flex-col space-y-4 overflow-auto">
                <CodeEditorComponent
                  language={language}
                  code={code} // Pass the code state
                  setCode={setCode} // Pass the function to update the code state
                  onRun={handleRun}
                  onSave={handleSave}
                  onLanguageChange={handleLanguageChange}
                  showForkButton={tempId !== -1}
                  showSaveButton={tempId === -1 || authorId === userId}
                  editable={tempId === -1 || authorId === userId} // UPDATE TO PROPER AUTHORID AND USERID
                  onFork={handleFork}
                  title={title}
                />
              </div>

              <TemplateCreationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                defaultValues={{
                    forkedFromId: fork,
                    code: code,
                    language: language,
                    title: title,
                    explanation: explanation,
                    tags: tags
                }}
                tempId={tempId}
                forked={forked}
              />
      
              {/* Right Side: Output and Template Info */}
              <div className="flex-[0.8] flex flex-col space-y-6 overflow-auto mt-4 lg:mt-0 lg:ml-4">
              {/* Input Section */}
                 <textarea
                    id="user-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg w-full resize-none overflow-auto h-[150px]"
                    placeholder="Enter your input here"
                  ></textarea>
  
  
                {/* Output Section */}
                <div className="flex-1 flex flex-col border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-2">
                <OutputComponent stdout={output} stderr={error} />
                </div>
      
                {/* Template Info Section */}
                {tempId !== -1 && <div
                  className={`mt-4 lg:mt-0 flex flex-col flex-[0.7] border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-2`}
                >
                  <TemplateInfo
                    author={authorName}
                    forked={fork}
                    tags={tags}
                    blogs={blogs}
                  />
                </div>}
              </div>
            </div>
            </>)

        }
        </div>
      </div>
    </div>
  );
};  

export default TemplateEditor;
