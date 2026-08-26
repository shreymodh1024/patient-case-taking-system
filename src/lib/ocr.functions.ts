import { createServerFn } from "@tanstack/react-start";
import { parseScanReportInput, scanMedicalReport, type OcrReportSummary } from "./ocr.server";

export type ScanReportResult =
  | { ok: true; report: OcrReportSummary }
  | { ok: false; error: string };

export const scanReport = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => parseScanReportInput(input))
  .handler(async ({ data }): Promise<ScanReportResult> => {
    try {
      const report = await scanMedicalReport(
        data.fileName,
        data.mimeType,
        data.base64Data,
        data.language,
      );
      return { ok: true, report };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : "The document could not be scanned.",
      };
    }
  });
