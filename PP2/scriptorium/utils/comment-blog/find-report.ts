import prisma from "@/utils/db";

// Define the Report type based on your Prisma schema

export async function getReportsForUserContent(
    userId: number,
    contentType: "BLOG" | "COMMENT",
    contentIds: number[]
): Promise<Record<number, string[]>> {
    // Log input parameters to confirm they’re being passed correctly
    console.log("getReportsForUserContent - userId:", userId);
    console.log("getReportsForUserContent - contentType:", contentType);
    console.log("getReportsForUserContent - contentIds:", contentIds);

    if (!userId || !Array.isArray(contentIds) || contentIds.length === 0) {
        console.log("Invalid input: userId or contentIds missing or empty");
        return {};  // Return an empty object if there's no user ID or content IDs
    }

    try {
        const reports = await prisma.report.findMany({
            where: {
                authorId: userId,
                contentType: contentType,
                contentId: { in: contentIds }, // Filter by the provided content IDs
            },
            select: {
                contentId: true,
                explanation: true,
            },
        });

        // Organize report explanations by content ID
        const reportData: Record<number, string[]> = reports.reduce<Record<number, string[]>>(
            (acc, report) => {
                if (!acc[report.contentId]) {
                    acc[report.contentId] = [];
                }
                acc[report.contentId].push(report.explanation); // Push only the explanation
                return acc;
            },
            {} // Initial value for reduce
        );


        return reportData;
    } catch (error) {
        console.error("Error fetching reports:", error);
        return {}; // Return an empty object as needed on error
    }
}
