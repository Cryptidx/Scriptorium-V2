// types/types.d.ts
  export type ContentType = "BLOG" | "COMMENT" | "BOTH";

  export interface Report {
    contentType: ContentType;
    id: number | string;
    reportCount: number;
    explanations: string[];
  }

  export interface Pagination {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  }

  export interface ReportResponse {
    message: string;
    data: Report[];
    pagination: Pagination;
  }

  export type ReportPopupProps = {
    onClose: () => void;
    onSubmit: (report: { contentId: string; title: string; explanation: string }) => void;
    contentId: string;
  };